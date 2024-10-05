---
date: '2024-09-29'
title: '오픈소스 6기 멘토링 : Elasticsearch Contribute'
categories: ['OpenSource', 'ElasticSearch']
summary: 'elasticsearch 오픈소스에 기여하기까지의 과정 회고'
thumbnail: './images/thumbnail-gdg.png'
---

# 지난 오픈소스 기여
2024년 3월달엔 elasticsearch 의 자바 클라이언트인 `elasticsearch-java` 에 기여하였지만, 코드 수정 사항을 제안하는 방식으로 성공하였다. 관리인을 제외한 외부인들은 직접 코드를 수정할 수 있는 권한이 없기 때문이다.  
이번엔 공식 `elasticsearch` 저장소에, 그것도 직접 코드를 수정한 PR이 머지되는 모습을 보고 싶었기 떄문에 다시 한번 오픈소스 스터디에 참여하였다.

# 이슈 선정
오픈소스 기여는 좋은 이슈 선정이 90% 이상이기 때문에, 이번에도 역시 이슈 선정하는데 가장 많은 시간을 투자하였다.

## 1. Kibana에 constant_keyword 타입 값이 하이라이팅 안되는 오류 수정
[Highlighting in Kibana doesn't work for constant_keyword field type](https://github.com/elastic/elasticsearch/issues/85596)   

이미 완성된 PR이 있으며, 관리자분들께서 너무 복잡하다고 피드백을 해주셔서, 해당 PR을 참고하여 좀 더 간결하게 수정하면 새로운 PR을 금방 만들 수 있을 것 같아 선정하였다. 하지만, PR 분석 결과 커밋 사항이 과도하게 많아서 어떤 커밋사항들을 참고해야할지 결정하는데 시간이 오래 걸릴 것 같았다.

## 2. runtime field에 range 데이터 타입 지원하도록 수정

[Expand runtime_field data types to include ranges](https://github.com/elastic/elasticsearch/issues/89707)

참고할 수 있는 테스트 코드가 게시된 PR이 있기도 하며, 해당 PR은 현재 닫혀있는 상태라 활용하기 좋아보여 선택하였다. 하지만, 테스트 코드 작성법에 대한 커밋 사항은 보이지 않아 추가 분석이 필요하였다.

## 최종 이슈 선정
하이리이팅은 es 팀내에서 아직 중요도가 높은 이슈가 아니라고 이슈 댓글에 명시되어 있었다. 그리고, 검색 쿼리에서 날짜의 범위 지정 옵션이 없는 건 매우 불편한 사항이기에, 2번째 이슈를 선택하였다.

# 코드 분석
이미 게시된 PR을 살펴보니, 날짜 runtime field에 대한 테스트 코드를 볼 수 있었다.

```yml
// Test Code
// modules/runtime-fields-common/src/yamlRestTest/resources/rest-api-spec/test/runtime_fields/43_date_calculated_at_index.yml

 mappings:
            properties:
              range:
                type: date
                script:
                  source: |
                    for (def dt : doc['timestamp']){
                      emit(dt.plus(params.days,ChronoUnit.DAYS).toEpochMilli());
                      # range field
                      if(params.days > 1){
                         emit(dt.plus(params.days-1,ChronoUnit.DAYS).toEpochMilli());
                      }
                    }
                    
   search:
        index: sensor
        body:
          query:
            range:
              gte : "{{start_date}}"
              lte : "{{end_date}}"
          sort: timestamp
          fields: [tomorrow, tomorrow_from_source, the_past, all_week, formatted_tomorrow]
          fields: [tomorrow, tomorrow_from_source, the_past, all_week, formatted_tomorrow, range]
  - match: {hits.total.value: 6}
  - match: {hits.hits.0.fields.tomorrow: ["2018-01-19T17:41:34.000Z"] }
  - match: {hits.hits.0.fields.tomorrow_from_source: ["2018-01-19T17:41:34.000Z"] }
@@ -124,6 +139,7 @@ setup:
        - 2018-01-23T17:41:34.000Z
        - 2018-01-24T17:41:34.000Z
  - match: {hits.hits.0.fields.formatted_tomorrow: [2018-01-19] }
  - match: {hits.hits.0.fields.range: [1516729294000, 1516642894000, 1516556494000, 1516470094000, 1516383694000, "2018-01-18T17:41:34.000Z"]}

---
"docvalue_fields":
```

날짜 타입에 대해 `script`와 `format` 속성이 필요하다는 사실을 알게 되었다.  

runtime field 지정 클래스인 `RuntimeField` 클래스 내에서 필드 변수 타입에 따라 특정 코드가 시행되도록 지정할 수 있었으므로, 다음과 같이 클래스를 변경해줬다.

```java
// server/src/main/java/org/elasticsearch/index/mapper/RuntimeField.java
// RuntimeField.java

static Map<String, RuntimeField> parseRuntimeFields(
    Map<String, Object> node,
    MappingParserContext parserContext,
    Function<RuntimeField.Builder, RuntimeField> builder,
    boolean supportsRemoval
) {
    Map<String, RuntimeField> runtimeFields = new HashMap<>();
    Iterator<Map.Entry<String, Object>> iterator = node.entrySet().iterator();

    while (iterator.hasNext()) {
        Map.Entry<String, Object> entry = iterator.next();
        String fieldName = entry.getKey();
        if (entry.getValue() == null) {
            if (supportsRemoval) {
                runtimeFields.put(fieldName, null);
            } else {
                throw new MapperParsingException(
                    "Runtime field [" + fieldName + "] was set to null but its removal is not supported in this context"
                );
            }
        } else if (entry.getValue() instanceof Map) {
            @SuppressWarnings("unchecked")
            Map<String, Object> propNode = new HashMap<>(((Map<String, Object>) entry.getValue()));
            Object typeNode = propNode.get("type");
            String type;
            if (typeNode == null) {
                throw new MapperParsingException("No type specified for runtime field [" + fieldName + "]");
            } else {
                type = typeNode.toString();
            }

            // FIX: Handle script field parsing
            if (propNode.containsKey("script")) {
                Map<String, Object> scriptNode = (Map<String, Object>) propNode.get("script");
                Script script = parseScript(fieldName, parserContext, scriptNode);
                propNode.put("script", script);
            }

            // FIX: Handle format field for date types
            if (type.equals("date") && propNode.containsKey("format")) {
                String format = propNode.get("format").toString();
                // Validate and store format as needed
                propNode.put("format", format);
            }

            Parser typeParser = parserContext.runtimeFieldParser(type);
            if (typeParser == null) {
                throw new MapperParsingException("No handler for type [" + type + "] declared on runtime field [" + fieldName + "]");
            }
            runtimeFields.put(fieldName, builder.apply(typeParser.parse(fieldName, propNode, parserContext)));
            propNode.remove("type");
            MappingParser.checkNoRemainingFields(fieldName, propNode);
            iterator.remove();
        } else {
            throw new MapperParsingException(
                "Expected map for runtime field [" + fieldName + "] definition but got a " + entry.getValue().getClass().getName()
            );
        }
    }
    return Collections.unmodifiableMap(runtimeFields);
}
```

이미 존재하는 테스트코드, 그리고 새롭게 고친 RuntimeField 클래스를 푸쉬한 다음, PR 로 게시하였다.

[Closes: Expand runtime_field data types to include ranges](https://github.com/elastic/elasticsearch/pull/113748)  

이슈 링크를 단 다음, 수정 사항에 대한 설명를 함께 첨부하였다. 이번엔 반드시 PR Merge 에 성공하고 싶다.

# 느낀점
저번 오픈소스 기여때와는 다르게, 실제 존재하는 테스트 코드를 기반으로 역추적하여 커밋 사항을 완성할 수 있었다. 테스트 코드의 중요성을 다시 한 번 느낄 수 있었으며, PR 완성이 힘들다면 테스트 코드라도 게시함으로써 다른 오픈소스 기여자분들의 PR 완성을 돕는 방식도 좋을 것 같다는 생각을 하였다.
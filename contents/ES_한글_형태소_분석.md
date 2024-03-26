---
date: '2023-09-04'
title: 'ElasticSearch - Nori Tokenizer & Pattern 기반 검색 정확도 향상'
categories: ['VISANG', 'ElasticSearch', 'Logstash', 'Kibana']
summary: 'ES의 한글 형태소 기반 검색'
thumbnail: './images/thumbnail-elasticsearch.webp'
---

메타 데이터는 `테이블ID, 테이블 코멘트, 하위 주제` 로 구성되어 있다. 여기서 이 요소들을 기준으로 더 정확한 검색을 위해 다음의 과정을 거쳤다. 테이블 코멘트와 하위 주제는 `의미 있는 한글 형태소 기반`으로, 테이블 ID는 `'_' -> 언더바`를 기준으로 나누어서 검색되도록 하였다.

# ElasticSearch, Logstash, Kibana 설치

ELK Stack 설치. 셋 모두 7.15.2 버전을 설치해줬다.

- ES - https://www.elastic.co/kr/downloads/elasticsearch
- Logstash - https://www.elastic.co/kr/downloads/past-releases#logstash
- Kibana - https://www.elastic.co/kr/downloads/kibana

# PostgreSQL 연동

데이터 포털 사이트 내 메타 데이터 DB는 PostgreSQL이다. PostgreSQL 과 연동하기 위해서는 `JDBC Driver` 가 필요하다.

- PostgreSQL Driver (42.6.0) - https://jdbc.postgresql.org/

# ELK 실행

`Logstash -> ES -> Kibana` 순으로 실행

## Logstash

다운받은 포더 압축 해제 후, bin 폴더에서 다음 명령어로 실행

```bash
# bin 폴더 내에서
./logstash.bat -f logstash-simple.conf
```

위 명령어 실행 시, logstash-simple.conf 파일 내용을 기반으로 실행된다.  
logstash-simple.conf 파일은 PostgreSQL의 DB 데이터를 pull 방식으로 가져와 ES로 보내는 역할을 해준다.

```bash

# Sample Logstash configuration for creating a simple
# Beats -> Logstash -> Elasticsearch pipeline.
input {
  jdbc {
    jdbc_driver_library => "C:/Users/user/projects/logstash-7.15.2/bin/postgresql-42.6.0.jar"
    jdbc_driver_class => "org.postgresql.Driver"
    jdbc_connection_string => "postgres url"
    jdbc_user => "postgres user"
    jdbc_password => "postgres password"
    schedule => "* * * * *"
    statement => "select * from tb_table_meta_info"
  }
}

output {
  elasticsearch {
    hosts => ["http://localhost:9200"]
    index => "nori_test"
    document_id => "%{table_meta_info_id}"
  }
}
```

- input: `PostgreSQL JDBC` Connection 정보 입력
- output: `ElasticSearch` Connection 정보 입력

document_id 설정 이유 : https://blog.naver.com/xomyjoung/221650123319  
바로 `중복 데이터 처리`를 위해서이다. Logstash에서 1분마다 한번씩 input의 statement SQL 구문을 실행해준다. 그렇게 되면 중복되는 데이터가 계속해서 쌓이게 되는데, 이를 document_id 옵션을 통해 해결가능하다.

## ElasticSearch

압축해제 후, bin 폴더 내의 .bat 파일을 실행

```bash
localhost:9200
```

ES의 기본 URL 주소

## Kibana

압축해제 후, bin 폴더 내의 .bat 파일을 실행

```bash
localhost:5601
```

Kibana의 기본 URL 주소

# Nori Tokenizer

## Nori 설치 및 실행

> Nori - 한글 형태소 분석기

- Nori 플러그인 설치 및 실행 : https://dogf.tistory.com/110  
  Nori 설치를 위해 ES 폴더 내에 다음 명령어 실행

```bash
./bin/elasticsearch-plugin install analysis-nori
```

설치 후, ES 실행 시 다음과 같이 나오면 정상적으로 Nori가 구동되고 있다는 것  
![Alt text](image-20.png)  
빨간 부분을 확대해서 보면
```bash
[node -1] loaded plugin [analysis-nori]
```
## Nori 사용
Logstash로 pull 해온 DB 테이블에 해당하는 index의 `settings`를 수정해준다.
```bash
PUT _template/tb_table_meta_info
{
  "index_patterns": [
    "tb_table_meta_info-*"
  ],
  "order": 0,
  "settings": {
    "index": {
      "analysis": {
        "tokenizer": {
          "nori_mixed": {
            "type": "nori_tokenizer",
            "decompound_mode": "mixed"
          }
        },
        "analyzer": {
          "english_underscore" : {
            "type" : "pattern",
            "pattern" : "\\W|_",
            "lowercase": true
          },
          "korean": {
            "type": "custom",
            "tokenizer": "nori_mixed",
            "char_filter": [
              "html_strip"
            ]
          }
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "table_id" : {
        "type": "text",
        "analyzer": "english_underscore"
      },
      "table_comment": {
        "type": "text",
        "analyzer": "korean"
      },
      "small_clsf_name" : {
        "type": "text",
        "analyzer": "korean"
      }
    }
  }
}
```
- `settings` : nori 사용을 위해 `tokenizer` 정의 및 `analyzer` 추가
- `mappings` : nori 적용을 해줄 필드에 `analyzer: korean` 추가  
필요한 값 설정 후, PUT 요청으로 수정 완료  
수정이 제대로 되었는지 확인해주기 위해 Kibana Console에 접속 후, `Management -> Stack Management -> Data -> Index Management` 에 간 다음, 원하는 index 선택 후 Settings 항목을 확인해주면 된다.

## 특정 Index에 template 설정
> Create or Update index template API - https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-templates-v1.html  
  
초기 한번만 template을 설정해두면, 다음 index 생성 시에는 조건에 맞는 index에 settings와 mappings 정보에 자동적용된다.  

## Dev Tools로 Nori 적용 여부 확인
Dev Tools로 접속 후, 다음과 같이 검색해서 Nori 적용 여부를 확인할 수 있다.
```bash
POST tb_table_meta_info-2023.09.11/_search
{
  "query": {
    "bool": {
        "must" : [
            {
                "multi_match" : {
                "query" : "진단",
                "fields" : ["table_id", "table_comment", "small_clsf_name"]
                }
            }
        ]
    }
  }
}
```
table_comment, 그리고 small_clsf_name 속성에 nori 를 적용해준 상태이다.  
결과는 다음과 같다.  
```bash
#! Elasticsearch built-in security features are not enabled. Without authentication, your cluster could be accessible to anyone. See https://www.elastic.co/guide/en/elasticsearch/reference/7.15/security-minimal-setup.html to enable security.
{
  "took" : 890,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 32,
      "relation" : "eq"
    },
    "max_score" : 6.4197645,
    "hits" : [
      {
        "_index" : "tb_table_meta_info-2023.09.11",
        "_type" : "_doc",
        "_id" : "274",
        "_score" : 6.4197645,
        "_source" : {
          "small_clsf_name" : "심리 진단",
          "service_id" : 2,
          "sub_category_id" : 82,
          "@version" : "1",
          "table_comment" : "심리진단",
          "@timestamp" : "2023-09-11T07:01:00.457Z",
          "table_meta_info_id" : 274,
          "table_id" : "tb_psych_diagnosis",
          "main_category_id" : 7
        }
      },
      {
        "_index" : "tb_table_meta_info-2023.09.11",
        "_type" : "_doc",
        "_id" : "308",
        "_score" : 6.4197645,
        "_source" : {
          "small_clsf_name" : "진단 정보",
          "service_id" : 2,
          "sub_category_id" : 136,
          "@version" : "1",
          "table_comment" : "학습진단",
          "@timestamp" : "2023-09-11T07:01:00.458Z",
          "table_meta_info_id" : 308,
          "table_id" : "tb_study_diagnosis",
          "main_category_id" : 7
        }
      },
      {
        "_index" : "tb_table_meta_info-2023.09.11",
        "_type" : "_doc",
        "_id" : "2209",
        "_score" : 6.196665,
        "_source" : {
          "small_clsf_name" : "학력진단",
          "service_id" : 3,
          "sub_category_id" : 82,
          "@version" : "1",
          "table_comment" : "학력진단 진단지정보 테이블",
          "@timestamp" : "2023-09-11T07:01:00.703Z",
          "table_meta_info_id" : 2209,
          "table_id" : "TYPE_CST_BODY",
          "main_category_id" : 13
        }
      },
      {
        "_index" : "tb_table_meta_info-2023.09.11",
        "_type" : "_doc",
        "_id" : "309",
        "_score" : 5.9034023,
        "_source" : {
          "small_clsf_name" : "진단 상세 정보",
          "service_id" : 2,
          "sub_category_id" : 136,
          "@version" : "1",
          "table_comment" : "학습진단상세",
          "@timestamp" : "2023-09-11T07:01:00.458Z",
          "table_meta_info_id" : 309,
          "table_id" : "tb_study_diagnosis_detail",
          "main_category_id" : 7
        }
      },
      {
        "_index" : "tb_table_meta_info-2023.09.11",
        "_type" : "_doc",
        "_id" : "2216",
        "_score" : 5.9034023,
        "_source" : {
          "small_clsf_name" : "진단 정보",
          "service_id" : 3,
          "sub_category_id" : 82,
          "@version" : "1",
          "table_comment" : "진단정보테이블",
          "@timestamp" : "2023-09-11T07:01:00.703Z",
          "table_meta_info_id" : 2216,
          "table_id" : "TYPE_CST_INFO",
          "main_category_id" : 13
        }
      },
      {
        "_index" : "tb_table_meta_info-2023.09.11",
        "_type" : "_doc",
        "_id" : "937",
        "_score" : 5.463922,
        "_source" : {
          "small_clsf_name" : "기록",
          "service_id" : 3,
          "sub_category_id" : 6,
          "@version" : "1",
          "table_comment" : "성격 진단 상담 테이블",
          "@timestamp" : "2023-09-11T07:01:00.531Z",
          "table_meta_info_id" : 937,
          "table_id" : "TYPE_CST_CTR_MEMO",
          "main_category_id" : 1
        }
      },
      {
        "_index" : "tb_table_meta_info-2023.09.11",
        "_type" : "_doc",
        "_id" : "2213",
        "_score" : 5.463922,
        "_source" : {
          "small_clsf_name" : "유형진단",
          "service_id" : 3,
          "sub_category_id" : 82,
          "@version" : "1",
          "table_comment" : "유형진단 문제 정보",
          "@timestamp" : "2023-09-11T07:01:00.703Z",
          "table_meta_info_id" : 2213,
          "table_id" : "TYPE_CST_CTR_PROBLEM",
          "main_category_id" : 13
        }
      },
      {
        "_index" : "tb_table_meta_info-2023.09.11",
        "_type" : "_doc",
        "_id" : "2214",
        "_score" : 5.463922,
        "_source" : {
          "small_clsf_name" : "유형진단",
          "service_id" : 3,
          "sub_category_id" : 82,
          "@version" : "1",
          "table_comment" : "유형진단 결과 마스터",
          "@timestamp" : "2023-09-11T07:01:00.703Z",
          "table_meta_info_id" : 2214,
          "table_id" : "TYPE_CST_CTR_RESULT_MASTER",
          "main_category_id" : 13
        }
      },
      {
        "_index" : "tb_table_meta_info-2023.09.11",
        "_type" : "_doc",
        "_id" : "2215",
        "_score" : 5.463922,
        "_source" : {
          "small_clsf_name" : "유형진단",
          "service_id" : 3,
          "sub_category_id" : 82,
          "@version" : "1",
          "table_comment" : "유형진단 테스트 결과",
          "@timestamp" : "2023-09-11T07:01:00.703Z",
          "table_meta_info_id" : 2215,
          "table_id" : "TYPE_CST_CTR_RESULT_V2",
          "main_category_id" : 13
        }
      },
      {
        "_index" : "tb_table_meta_info-2023.09.11",
        "_type" : "_doc",
        "_id" : "2218",
        "_score" : 5.463922,
        "_source" : {
          "small_clsf_name" : "유형진단",
          "service_id" : 3,
          "sub_category_id" : 82,
          "@version" : "1",
          "table_comment" : "유형진단 월별 전략",
          "@timestamp" : "2023-09-11T07:01:00.703Z",
          "table_meta_info_id" : 2218,
          "table_id" : "TYPE_CST_STRATEGY_INFO",
          "main_category_id" : 13
        }
      }
    ]
  }
}
```
`진단`으로 검색 시, 단순 `진단` 단어 뿐 아니라, `유형진단` 처럼 단어가 서로 붙어있어도 `형태소 단위로 분석`하여 진단과 매칭되는 결과에 포함시켜준다.

## Settings - Analyzer의 Pattern 사용
tb_table_meta_info 의 table_comment와 small_clsf_name 과는 다르게, `table_id` 는 영어 단어가 언더바( _ ) 기준으로 분류된 형태이다.   

한글 형태소 기준으로 나눈 것 처럼, table_id 컬럼도 언더바 기준으로 나눠서 검색이 가능하게 할 수 있다.  
- Pattern analyzer - https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-pattern-analyzer.html  
```bash
PUT _template/tb_table_meta_info
{
  "index_patterns": [
    "tb_table_meta_info-*"
  ],
  "order": 0,
  "settings": {
    "index": {
      "analysis": {
        "tokenizer": {
          "nori_mixed": {
            "type": "nori_tokenizer",
            "decompound_mode": "mixed"
          }
        },
        "analyzer": {
          "english_underscore" : {
            "type" : "pattern",
            "pattern" : "\\W|_",
            "lowercase": true
          },
          "korean": {
            "type": "custom",
            "tokenizer": "nori_mixed",
            "char_filter": [
              "html_strip"
            ]
          }
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "table_id" : {
        "type": "text",
        "analyzer": "english_underscore"
      },
      "table_comment": {
        "type": "text",
        "analyzer": "korean"
      },
      "small_clsf_name" : {
        "type": "text",
        "analyzer": "korean"
      }
    }
  }
}
```
analyzer에 `english_underscore` 이름으로 `pattern`을 정의해줬다.  
pattern의 문자열들을 기준으로 table_id 의 컬럼 값을 split 해준다.  
```bash
POST tb_table_meta_info-2023.09.11/_search
{
  "query": {
    "bool": {
        "must" : [
            {
                "multi_match" : {
                "query" : "code",
                "fields" : ["table_id", "table_comment", "small_clsf_name"]
                }
            }
        ]
    }
  }
}
```  
다음 요청으로 검색 시, 아래와 같은 결과가 나온다.  

![Alt text](image-21.png)  
  
언더바 기준으로 table_id 값이 나뉘어져서, 나뉘어진 값 중 code 가 포함되어 있으면 이를 검색 결과로 반환해준다.
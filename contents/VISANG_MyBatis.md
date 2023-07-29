---
date: '2023-07-26'
title: '비상교육 현장실습 - MyBatis'
categories: ['VISANG']
summary: '현장실습 프로젝트 때 사용하는 MyBatis 내용 정리'
thumbnail: './images/thumbnail-visang.png'
---

데이터 포털 웹 서비스 프로젝트에서 MyBatis를 사용하기로 하였다. 데이터 맵의 중분류 정보까지 가져오는 API와 메타 데이터 정보 조회 API의 결과 갯수가 많을 것으로 예상하여 성능 향상을 하기 위해 다음과 같은 방법을 사용했다.

# fetchSize

fetchSize를 넣은 것과 안 넣은 것의 성능 차이는 약 15배 정도라고한다.  
visualVM 으로 구간별 속도를 측정을 해봤을때 MyBatis의 DefaultResultSetHandler.shouldProcessMoreRows() 가 거의 대부분의 시간을 차지하고 있었다. 메소드명에서 유추할수 있듯이 다음 row를 찾는 작업들이 오래걸리는 것이다.  
fetchSize의 기본값은 10이므로, 이걸 1000으로 늘리면 WAS와 DB의 트래픽을 줄여줘서 큰 성능향상을 가져올 수 있다.

```XML
<select id="selectDataMap" parameterType="map" resultType="map" fetchSize="1000">
	SELECT * FROM SAMPLE_LARGEDATA
</select>
```

# mapUnderscoreToCamelCase

보통 SQL을 정의할때는 snake_case를 사용한다. 하지만 Java에서는 camelCase를 사용한다.  
이런 경우에는 mapUnderscoreToCamelCase를 true로 설정하면, 자동으로 snake_case를 camelCase로 변환해준다. 하지만 이 변환작업 떄문에 많은 리소스가 들어간다고 한다. 성능 개선이 중요하다면 이 옵션 대신 alias를 이용해 직접 매핑을 해준다면 큰 성능 향상을 가져올 수 있다. 기본 설정은 false 값이다.

# 참고 링크

- [MyBatis 성능 향상시키는 방법 (with fetchSize, mapUnderscoreToCamelCase)](https://oingdaddy.tistory.com/64)

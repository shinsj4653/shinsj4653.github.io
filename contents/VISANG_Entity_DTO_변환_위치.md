---
date: '2023-08-11'
title: '비상교육 현장실습 - Entity -> DTO 변환 위치'
categories: ['VISANG', 'Spring']
summary: 'Entity를 DTO로 변환해주는 작업을 어디서 해주는 게 좋을지에 대해 정리'
thumbnail: './images/thumbnail-visang.png'
---

데이터 포탈 웹 서비스를 만들 때, Entity를 DTO로 변환해주는 작업을 주로 Controller 단에서 하였지만, Service 단에서 하는 것이 더 좋다는 의견을 들어서 이에 대한 이점이 뭐가 있을지 궁금하여 정리해보았다.

# Domain 객체

DB에 데이터를 넣거나 가져올 때 사용하는 객체이다.

# Domain으로 직접 응답

DB에 Domain 객체의 형태로 삽입되고 가져오기 때문에 굳이 Dto로 변환해야 하나라는 의문을 가질 순 있지만, Domain을 직접 응답하면 2가지의 문제점이 있다.

1. Domain 구조가 클라이언트에게 노출된다.
2. 실제 프로젝트를 구현하면 API는 필요한 데이터만을 요청하는데 불필요한 데이터까지 넘어온다.

위와 같은 이유로 Domain을 직접 반환하지는 않고 Dto로 필요한 데이터만 담아서 변환해준다.

# Domain 객체의 변환위치

그렇다면 Controller, Service, Repository 3위치 중 한 곳에서 Domain을 Dto로 변환해야한다면, 어디서 변환하는 게 좋을까??

# Service

Service 레이어는 비즈니스 로직을 처리하는 곳이고 Dto 변환도 비즈니스 로직의 일부라 생각한다. 또한 Domain 객체의 노출을 최소화 하기 때문에 뭔가 문제가 있다면 Service 레이어에서 찾으면 된다.

# 장점, 단점

Service레이어에 Dto가 안들어 온다면 여러 종류의 컨트롤러에서 해당 서비스를 사용할 수 있는 장점이 있고 Dto가 Service계층까지 들어올 수 있다면 도메인으로 변환을 초기에 하지 않는다면 Repository까지도 들어올 수 있다는 단점이 있다. 라는 생각으로 컨트롤러에서 Dto로 변환한다고 하셨다.

# 참고자료

- [[Spring] DTO의 변환위치](https://velog.io/@dbtlwns/Spring-DTO%EC%9D%98-%EB%B3%80%ED%99%98%EC%9C%84%EC%B9%98)

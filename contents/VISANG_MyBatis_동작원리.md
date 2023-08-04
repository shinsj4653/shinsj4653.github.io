---
date: '2023-08-03'
title: '비상교육 현장실습 - MyBatis 동작원리'
categories: ['VISANG', 'Spring']
summary: 'MyBatis 쿼리의 결과와 객체가 매핑 되는 과정 정리'
thumbnail: './images/thumbnail-visang.png'
---

MyBatis를 사용하다가 문득 select 쿼리의 결과와 객체(DTO)가 어떤 작업을 통해 매핑이 되는지 정확하게 파악하기 위해 정리해보았다.

# 기본 생성자(NoArgs)만 존재할 경우

쿼리 결과와 객체의 매핑이 정상적으로 진행되지 않는다. 정확하게는 null로 매핑이 된다.

# 기본 생성자(NoArgs)와 컬럼 별칭(Alias)가 존재할 경우

매핑이 정상적으로 이루어진다.

# 모든 필드에 대한 생성사(AllArgs) 가 존재할 경우

별칭이 없더라도 매핑이 정상적으로 이뤄진다. 단, 객체의 필드와 컬럼의 데이터 순서가 일치해야 한다.

# 참고링크

- [Spring + MyBatis에서 쿼리의 결과와 객체가 매핑되는 과정](https://zzang9ha.tistory.com/420#google_vignette)

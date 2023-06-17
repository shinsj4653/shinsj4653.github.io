---
date: '2023-06-17'
title: '@Configuration을 적용하지 않고, @Bean만 적용하였을 때의 상황 정리'
categories: ['Spring']
summary: '스프링 입문 강의 중, @Configuartion 에서 @Bean만 적용하였을 때의 상황 정리'
thumbnail: './images/thumbnail-spring.png'
---

AppConfig 파일내에서, @Configuration을 적용하지 않고, @Bean만 적용하였을 때에 대한 설명이 한 번에 와닿지 않아서 정리하면서 복습을 해보기로 하였다.

# @Configuration을 적용하지 않고, @Bean만 적용하였을 때의 상황 정리

@Configuration을 붙이면 바이트코드를 조작하는 CGLIB 기술을 사용해서 `싱글톤`을 보장하지만, 만약 @Bean만 적용할 경우, 순수한 자바 코드로만 동작하게 된다. 따라서, @Bean만 적용할 경우, 싱글톤을 보장하지 않는다.

```java
memberService -> memberRepository =
hello.core.member.MemoryMemberRepository@6239aba6
hello.core.member.MemoryMemberRepository@3e6104fc
memberRepository = hello.core.member.MemoryMemberRepository@12359a82
```

모두 다른 객체이므로, 싱글톤을 보장하지 않는다.

## 정리

@Bean만 사용해도 스프링 빈으로는 등록이 되지만, `싱글톤을 보장하지 않는다`. 강의에서 @Configuration을 등록해도 테스트가 통과된다는 말을 잘못들어서 더 헷갈렸던 것 같다. 크게 고민할 거 없이, 스프링 설정 정보는 항상 @Configuration을 사용하면 될 것 같다.

---
date: '2023-07-07'
title: '스프링 JPA - 프록시'
categories: ['Spring']
summary: '스프링 JPA 강의 중, 프록시에 대해 정리'
thumbnail: './images/thumbnail-spring.png'
---

# 프록시의 특징

프록시 객체가 실제 엔티티로 바뀌는 것은 아니다.

```java
Member m1 = em.find(Member.class, member1.getId());
            System.out.println("m1 = " + m1.getClass());

            Member reference = em.getReference(Member.class, member1.getId());
            System.out.println("reference = " + reference.getClass());
```

만약 이미 영속성 컨텍스트(1차 캐시)에 엔티티가 있다면, em.getReference() 호출해도 실제 엔티티를 반환해준다 그리고 이미 프록시로 초기화하고 나면, find해도 프록시로 조회된다.

```java
Member m1 = em.find(Member.class, member1.getId());
            System.out.println("m1 = " + m1.getClass());

            Member reference = em.getReference(Member.class, member1.getId());
            System.out.println("reference = " + reference.getClass());
						// 둘다 프록시로 나옴
```

영속성 컨텍스트의 도움을 받을 수 없는 준영속 상태일 때, 프록시를 초기화(프록시 객체 처음 사용할 때를 초기화한다고 표현)하면 문제가 발생한다. 하이버네이트에서는 org.hibernate.LazyInitializationException 예외를 터트린다.

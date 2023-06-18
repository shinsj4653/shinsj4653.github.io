---
date: '2023-06-18'
title: 'Java - Stream'
categories: ['Java']
summary: 'Java의 Stream 개념 정리'
thumbnail: './images/thumbnail-java.png'
---

스프링 강의 중, 자바의 stream을 사용하는데, 정확히 stream에 대한 개념이 잡혀있지 않은 상태여서 한 번 정리해보기로 하였다.

# 스트림이란?

> 데이터 처리연산을 지원하도록 소스에서 추출된 연속된 요소

복잡한 루프문을 사용하지 않아도 되며, `병렬 처리`를 별도의 멀티스레드 구현없이도 쉽게 구현할 수 있는 장점을 지니고 있다.

# 스트림 사용한 코드와 그렇지 않은 코드 비교

- 스트림 사용 X

```java
// 빨간색 사과 필터링
List<Apple> redApples = forEach(appleList, (Apple apple) -> apple.getColor().equals("RED"));

// 무게 순서대로 정렬
redApples.sort(Comparator.comparing(Apple::getWeight));

// 사과 고유번호 출력
List<Integer> redHeavyAppleUid = new ArrayList<>();
for (Apple apple : redApples)
    redHeavyAppleUid.add(apple.getUidNum());
```

- 스트림 사용 O

```java
List<Integer> redHeavyAppleUid = appleList.stream()
        .filter(apple -> apple.getColor().equals("RED"))        // 빨간색 사과 필터링
        .sorted(Comparator.comparing(Apple::getWeight))         // 무게 순서대로 정렬
        .map(Apple::getUidNum).collect(Collectors.toList());    // 사과 고유번호 출력
```

위의 코드를 단 한줄로 표현이 가능하다. 또한, `parallelStream` 메서드를 통해 별도의 멀티스레드 구현 없이도 병렬처리가 가능하다.

```java
List<Integer> redHeavyAppleUid = appleList.parallelStream()     // 병렬 처리
        .filter(apple -> apple.getColor().equals("RED"))        // 빨간색 사과 필터링
        .sorted(Comparator.comparing(Apple::getWeight))         // 무게 순서대로 정렬
        .map(Apple::getUidNum).collect(Collectors.toList());    // 사과 고유번호 출력
```

# 스트림의 특징

스트림에는 `파이프라이닝, 내부 반복`이라는 중요한 특징이 있다.

## 파이프라이닝

스트림 연산들은 서로 연결하여 큰 파이프라인을 구성할 수 있도록 스트림 자신을 반환한다. 데이터 소스에 적용하는 데이터베이스 질의문과 비슷하다.

## 내부 반복

반복자를 이용하여 명시적으로 반복하는 컬렉션과 다르게, 스트림은 내부 반복 기능을 제공한다.

# 예제 코드

```java
List<String> highCaloriesFoodName = foodList.stream()
        .filter(food -> food.getCalories() > 400)
        .map(Food::getName)
        .limit(3)
        .collect(Collectors.toList());

System.out.println(highCaloriesFoodName);
```

stream() 함수를 통해 foodList라는 소스로부터 `연속된 요소`를 얻어 스트림을 만들고, 해당 스트림에 Stream API 함수인 filter, map, limit, collect로 이어지는 `데이터 처리연산`을 적용한다.

# 스트림 vs 컬렉션

## 1. 데이터 계산 지점

컬렉션은 요소들이 컬렉션에 추가되기전에 계산되어야 하지만, 스트림은 요청할 때만 요소를 계산하는 고정된 자료구조이다.  
즉, 사용자가 요청하는 값만 추출할 수 있는 특성때문에 컬렉션보다 스트림이 더 유연하다.

## 2. 반복의 일회성

컬렉션은 같은 소스에 대해서 여러번 반복 처리할 수 있지만, 스트림은 한 번만 반복할 수 있다.

```java
Stream<Food> s = foodList.stream();
s.forEach(System.out::println); // 정상
s.forEach(System.out::println); // IllegalStateException 발생
```

위 코드를 실행하면 `stream has already been operated upon or closed` 라는 에러와 함께 프로그램이 중단된다.

## 3. 외부반복, 내부반복

컬렉션의 경우 foreach 문법을 사용하여 사용자가 반복문을 직접 명시해야하는데, 이를 `외부반복`이라 하고, 스트림은 라이브러리를 사용하는 `내부반복` 방식을 사용한다.  
별도의 반복자 없이도 반복문을 처리할 수 있다.

# 참고링크

- [스트림이란? 스트림과 컬렉션의 차이점](https://ksr930.tistory.com/237)

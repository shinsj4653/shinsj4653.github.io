---
date: '2023-07-21'
title: '비상교육 현장실습 - 자바 Optional 타입'
categories: ['VISANG']
summary: '현장실습 때 배운 자바 Optional 타입에 대한 정리'
thumbnail: './images/thumbnail-visang.png'
---

자바 코드로 API 응답 DTO 클래스를 만든 상태이다. 여기서 문득, 상황에 따라서 클래스의 `필드 값`을 NULL 값이 아니라 아예 생성이 안되도록 할 수는 있는지 고민하다가 Optional 타입이 있다는 것을 알게 되었다. 이번 기회에 Optional 타입에 대해 정리해보고자 한다.

# Optional 이란?

Java 8 에서는 Optional<T> 클래스를 사용하여 NullPointerException을 방지할 수 있도록 도와준다. Optional 클래스는 `Null이 될 수 있는 객체를 감싸는 Wrapper 클래스`이다. 참조하더라도 NullPointerException이 발생하지 않도록 도와준다.

# Optional 사용법 예시

예를 들어 아래와 같은 우편번호를 꺼내는 null 검사 코드가 있다. null 검사 때문에 상당히 복잡하다.

```java
public String findPostCode() {
    UserVO userVO = getUser();
    if (userVO != null) {
        Address address = user.getAddress();
        if (address != null) {
            String postCode = address.getPostCode();
            if (postCode != null) {
                return postCode;
            }
        }
    }
    return "우편번호 없음";
}
```

하지만 Optional을 사용하면 이러한 코드를 아래와 같이 표현 가능하다.

```java
public String findPostCode() {
    // 위의 코드를 Optional로 펼쳐놓으면 아래와 같다.
    Optional<UserVO> userVO = Optional.ofNullable(getUser());
    Optional<Address> address = userVO.map(UserVO::getAddress);
    Optional<String> postCode = address.map(Address::getPostCode);
    String result = postCode.orElse("우편번호 없음");

    // 그리고 위의 코드를 다음과 같이 축약해서 쓸 수 있다.
    String result = user.map(UserVO::getAddress)
        .map(Address::getPostCode)
        .orElse("우편번호 없음");
}
```

# Optional 주의사항

## 1. 필드나 메소드 파라미터에 사용하지 말아라.

Optional은 메소드 반환 타입으로만 사용되도록 만들어진 기능이므로, 필드나 메소드 파라미터에 사용하면 안된다. 필드나 메소드 파라미터에 사용하면, Optional을 사용하는 의미가 없어진다.

```java

// Bad!
class SomeClass {
    private Optional<String> sth;

    String someMethod(Optional<String> param) {
        ...
    }
}

// Good!
class OtherClass {
    private String oth;

    Optional<String> otherMethod(String param) {
        ...
    }
}
```

## 2. 검증하지 않고 get() 하지 마라.

객체가 있는지 확인하지 않고 get()을 호출하지 말자.

```java
// Bad
Optional<String> optText = getText();
String text = optText.get();

// Good
Optional<String> optText = getText();
String text = optText.orElseThrow(() -> new NullPointerException(""));
String text2 = optText.orElse("");
... 등등등 다양한 Optional api를 활용하자
```

확인하지 않는다면 애초에 Optional을 사용하지 않는 것이 낫다. Brian Goetz는 get() 메소드 이름을 지은 것을 후회한다며 다음과 같이 말했다.

> NEVER call Optional.get unless you can prove it will never be null; instead use one of the safe methods like orElse or ifPresent. In retrospect, we should have called get something like getOrElseThrowNoSuchElementException or something that made it far clearer that this was a highly dangerous method that undermined the whole purpose of Optional in the first place.

## 3. 단순 Null 체크를 위해 사용하지 마라

다음과 같이 Optional을 단순 null 체크를 위해 사용하는 코드가 있다.

```java
// Bad
public void someMethod(SomeObject object) {
    Optional.ofNullable(object).orElseThrow(() -> new NullPointerException());
    ...
}
```

위 코드는 Optional의 의도와 다르게 사용하고 있을 뿐만 아니라, null 이 아닌 경우 객체를 반환함에도 이를 사용하지 않고 있다. 위 같은 상황에서는 명시적으로 null 체크를 하는 게 더 낫다.

```java
public void someMethod(SomeObject object) {
    if (object == null) {
        throw new NullPointerException();
    }
    ...
}
```

아니면 Lombok의 @NonNull 어노테이션을 사용하는 것도 좋다.

```java
public void someMethod(@NonNull SomeObject object) {
    ...
}
```

# 결론

아무래도 Optional은 내가 해결하려고 하는 문제의 해결법과는 다른 방식으로 사용되어야 하는 것 같다. 다른 형식의 DTO를 만들어서 사용을 하는 것으로 일단 해결을 해봐야겠다.

# 참고링크

- [Optional이란? Optional 개념 및 사용법](https://mangkyu.tistory.com/70)

- [Java Optional 제대로 사용하기](https://velog.io/@sangmin7648/Java-Optional-%EC%A0%9C%EB%8C%80%EB%A1%9C-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)

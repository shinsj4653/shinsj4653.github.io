---
date: '2023-07-28'
title: '비상교육 현장실습 - java.lang.ClassException'
categories: ['VISANG']
summary: '현장실습 프로젝트 때 발생한 java.lang.ClassException 에 대한 정리'
thumbnail: './images/thumbnail-visang.png'
---

데이터 맵 API 의 Dto는 다음과 같다.

```java
public class DataMapDto {
	private String name;
	private String color;
	private String id;
	private Integer loc;
	private List<DataMapDto> children;
}
```

그리고, 데이터 조직도 API 의 Dto는 다음과 같다.

```java

public class DataOrgDto {
	private String name;
	private String color;
	private String id;
	private List<DataOrgDto> children;
}
```

너무 비슷한 두 클래스여서 name, color, id를 가지는 TreeMapDto 부모 클래스를 만들고, DataMapDto와 DataOrgDto는 이를 상속받도록 하였다. 하지만, 여기서 TreeMapDto cannot be cast into DataMapDto 문제가 발생하여, 그 이유를 찾아보기로 하였다.

# java.lang.classException

사실 조금만 생각해보면 정말 당연한 내용인데, 막상 코드를 작성할 때는 이 생각을 못하고 있었다.

```java
class A {
	// some code
}

class B extends A {
	private int i;
	public void setI(int i) {
		this.i = i;
	}
}
```

A는 B일 수 있다. 왜냐하면 B는 A의 특징들을 모두 포함하고 있기 때문이다. 하지만, B는 A일수도 아닐수도 있다. 왜냐하면 B는 A의 특징들을 모두 포함하고 있지만, A는 B의 특징들을 포함하고 있지 않기 때문이다. 따라서, A는 B로 캐스팅할 수 있지만, B는 A로 캐스팅할 수 없다.

```java
A a1 = (B) new A();
```

즉 위의 코드는 성립하지 않는다. A dog can be an animal, but an animal cannot be a dog. It can also be a cat, or a horse, etc. B를 A로 casting 하는 거는 가능하지만, A를 B로 casting 할 수는 없다.

# 참고 링크

- [java.lang.ClassException: A cannot be cast into B](https://stackoverflow.com/questions/17217965/java-lang-classexception-a-cannot-be-cast-into-b)

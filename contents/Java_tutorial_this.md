---
date: '2023-06-02'
title: 'Java - this'
categories: ['Java']
summary: 'Java Tutorial for Beginners 2023 - this'
thumbnail: './images/thumbnail-java.png'
---

강의 영상에서 자바에서의 this에 대해 설명하는 부분이 있었다. 이를 정리해보았다.

# setter에서의 문제점 발견!

다음과 같은 코드가 있다고 가정해보자.

```java
class Human
{
	private int age;

	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		age = age;
	}
}
```

위의 코드처럼, setter를 사용할 때 파라미터로 받아오는 변수값을 object의 인스턴스 변수와 이름을 동일하게 하고 싶다고 해보자. 만약 저런식으로 작성하면 setAge 함수에 해당하는 stack 공간내에서, local 변수 age가 자기자신한테 할당을 하는 셈이된다. 이렇게되면, object의 age는 setter에 넘겨준 값으로 적용되지 않는다. 초기값 0으로 남게 된다.

# 해결방법 1

```java
class Human
{
	private int age;

	public int getAge() {
		return age;
	}
	public void setAge(int age, Human obj) {
		Human obj1 = obj;
		obj1.age = age;
	}


}


public class Demo
{

	public static void main(String args[])
	{
		Human obj = new Human();
		obj.setAge(25, obj);

		System.out.println(obj.getAge());
	}
}

```

이런식으로 setter에 타켓 object를 넣어준다면, obj1이 obj를 가리키고 있기 때문에 obj1.age = age; 라고 적어주면 obj의 age에 값이 적용이 된다. 하지만, 이런식으로 작성하면 너무 번거롭다. main 함수에서 obj.setAge(25, obj) 처럼, obj를 두번 작성해야하기 때문이다.

# 해결방법 2 - this

main에서 생성한 obj를 파라미터로 또 전달하는 것이 아니라, 자바에서 이 obj를 제공해줄 수 있다. 바로 this라는 키워드이다. this는 current object를 가리키는 키워드이다. 그러므로, this.age = age; 라고 작성하면 obj의 age에 값이 적용이 된다.  
current object는 함수를 호출하고 있는 obj를 보면된다.

```java
class Human
{
	private int age;

	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}


}


public class Demo
{

	public static void main(String args[])
	{
		Human obj = new Human();
		obj.setAge(25); // obj가 setAge 호출 -> this는 obj를 가리킨다.

		System.out.println(obj.getAge());
	}
}
```

obj가 setAge를 call 하고 있기 때문에, this는 setAge를 호출하고 있는 obj를 나타내게 된다.

# 참고링크

- [Java tutorial for Beginners](https://www.youtube.com/watch?v=BGTx91t8q5)

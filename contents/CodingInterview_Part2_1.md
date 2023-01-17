---
date: '2023-01-09'
title: 'Python Coding Interview - 2부 3장 | 파이썬'
categories: ['Coding Test']
summary: '파이썬 알고리즘 인터뷰 책에서 2부의 내용을 읽고 요약정리'
thumbnail: './images/thumbnail-coding-test.png'
---

파이썬 알고리즘 인터뷰 책의 2부 3장을 읽으면서 배운 내용을 정리해보았다.
대학교 1,2 학년때 처음 코딩 테스트를 준비할 때 시작으로 배운 언어가 파이썬인데, 이 책에선 파이썬의 개념을 보다 깊게 설명을 해준다.  
새로 배운 내용들 위주로 정리해보았다.

# 제너레이터
루프의 반복 동작을 제어할 수 있는 루틴 형태이다.  
예를 들어, 임의의 조건으로 숫자 1억 개를 만들어내 계산하는 프로그램이 있다고 가정해보자. 제너레이터 없이는 메모리 어딘가에 만들어낸 숫자 1억개를 보관하고 있어야 한다.  
그러나 제너레이터를 이용한다면, 단순히 제너레이터만 생성해두고 필요할 때 언제든 숫자를 만들어낼 수 있는 장점을 가지고 있다.
`yield` 구문을 사용하면 제너레이터를 리턴할 수 있다.
```python
def get_natural_number() :
	n = 0
	while True:
		n += 1
		yield n
```
이 경우 함수의 리턴 값은 다음과 같이 제너레이터가 된다. yield는 제너레이터가 여기까지 실행 중이던 값을 내보낸다는 의미로, 중간값을 리턴한 다음 함수는 종료되지 않고 계속해서 맨 끝에 도달할 때까지 실행된다.
```python
>>> get_natural_number()
<generator object get_natural_number at 0x10d3139d0>
```

# range
제너레이터 방식을 활용하는 대표적인 함수이다.
```python
>>> range(5)
range(0, 5)

>>> type(range(5))
<class 'range'>
```
range()는 range 클래스를 리턴하며, for 문에서 사용할 경우 내부적으로는 제너레이터의 next() 를 호출하듯 매번 다음 숫자를 생성해내게 된다.
다음 예시를 보면 range의 장점을 더욱 잘 이해할 수 있다.

```python
>>> a = [n for n in range(1000000)]
>>> b = range(1000000)

>>> len(a)
1000000
>> len(b)
1000000

>>> b
range(0, 1000000)
>>> type(b)
<class 'range'>

>>> sys.getsizeof(a)
8697464
>>> sys.getsizeof(b)
48
```

a와 b는 똑같이 숫자 100만개를 가지고 있으나 range 클래스를 이용하는 b 변수의 메모리 점유율이 훨씬 적다. 인덱스로 바로 접근도 가능하다.
```python
>>> b[999]
999
```

# enumerate
인덱스와 값 모두 한꺼번에 출력을 하고 싶을 때 사용하는 함수이다.
```py
for i, v in enumerate(a) :
	print(i, v)
```

# divmod
몫과 나머지를 동시에 구할 수 있는 함수이다. 
```py
>>> divmod(5, 3)
(1, 2)
```

# pass
널 연산으로 아무것도 하지 않는 기능이다. 함수 안에서 아직 기능들이 구현되지 않았을 때, 아무것도 수행하지 않게끔 해주는 구문이다.
```py
class MyClass(object):
	def method_a(self) :
		# 여기에 pass 추가
		pass

	def method_b(self):
		print("Method B")

c = MyClass()
```
다음과 같이 pass를 써주면 오류가 발생하지 않고 코드 실행이 된다.





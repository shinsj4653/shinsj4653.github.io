---
date: '2023-01-15'
title: 'Python Coding Interview - 2부 5장 | 리스트, 딕셔너리'
categories: ['Coding Test', 'Python']
summary: '파이썬 알고리즘 인터뷰 책에서 2부 5장의 내용을 읽고 요약정리'
thumbnail: './images/thumbnail-coding-test.png'
---

파이썬 알고리즘 인터뷰 책의 2부 5장을 읽으면서 세롭게 배운 내용을 정리해보았다.
리스트와 딕셔너리를 마스터하자는 마음으로 책을 읽었다.

# 리스트의 주요 연산 시간 복잡도
# 리스트
## a.pop(0) : O(n)
리스트 첫번째 요소를 추출한다. 큐의 연산이다. 이 경우 전체 복사를 해야하므로 O(n)이다.
큐의 연산을 주로 사용한다면 리스트보다는 O(1)에 가능한 `데크(deque)`를 권장한다.

## a.sort() : O(n log n)
팀소트(Timsort) 기반 정렬. 최선의 경우, O(n)에도 실행될 수 있다.

# 딕셔너리
len(a), a[key], a[key] = value, key in a(딕셔너리에 키가 존재하는지 확인) -> 모두 O(1) 이다.

파이썬 3.7 부터는 내부적으로 인덱스를 이용해 딕셔너리 입력 순서가 유지되도록 하였지만, 여전히 3.6이하 버전을 사용하는 곳이 많아서, 무조건 입력 순서가 유지될 거라고 가정하고 진행하는 것은 위험하다.

## defaultdict 객체
존재하지 않는 키를 조회할 경우, 에러 메시지를 출력하는 대신 디폴트 값을 기준으로 해당 키에 대한 딕셔너리 아이템을 생성해준다.
```py
>>> a = collections.defaultdict(int)
>>> a['A'] = 5
>>> a['B'] = 4
>>> a
defaultdict(<class 'int'>, {'A': 5, 'B': 4})

>>> a['C'] += 1
>>> a
defaultdict(<class 'int'>, {'A': 5, 'B': 4, 'C': 1})
```
디폴트인 0 값에 1을 더해 최종적으로 1이란 값을 'C' 키에 매핑해준다.

## Counter 객체
아이템에 대한 갯수를 계산하여 딕셔너리로 리턴한다.

```py
>>> a = [1, 2, 3, 4, 5, 5, 5, 6, 6]
>>> b = collections.Counter(a)
>>> b
Counter({5: 3, 6: 2, 1: 1, 2: 1, 3: 1, 4: 1})
```
키에는 아이템 값이, 값에는 해당 아이템의 갯수가 들어간 딕셔너리를 생성해준다.
Counter 객체에서 가장 빈도수가 높은 요소는 `most_common()` 을 사용하면 된다.

```py
>>> b.most_common(2)
[(5, 3), (6, 2)]
```
가장 빈도가 높은 2개의 요소를 추출해준다.

## OrderedDict 객체
다음과 같이 입력값을 부여할 경우 OrderedDict는 입력 그대로 순서가 유지된다.
```py
>>> collections.defaultDict({'banana': 3, 'apple': 4, 'pear': 1, 'orange': 2})
OrderedDict([('banana', 3), ('apple', 4), ('pear', 1), ('orange', 2)])
```

# 타입 선언
기호를 사용하여 바로 타입 선언이 가능하다.
```py
>>> type([])
<class 'list'>

>>> type(())
<class 'tuple'>

>>> type({})
<class 'dict'>

>>> type({1})
<class 'set'>
```
딕셔너리와 집합은 같은 중괄호 {} 를 사용하지만 `키의 존재 유무` 로 서로 다른 자료형으로 선언된다.
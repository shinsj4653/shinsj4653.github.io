---
date: '2022-02-06'
title: 'JS Data'
categories: ['JavaScript', 'FastCampus']
summary: '패스트캠퍼스 JS 강의 중, JS-데이터 부분을 정리'
thumbnail: './images/thumbnail-javascript.png'
---

# 문자(String)

## length

- 속성(property)
- 길이 측정할때 띄어쓰기도 포함시킴

```js
const str = '01 23'
str.length // 5
```

## indexOf()

- 일치하는 부분의 **첫 인덱스**를 반환
- 없으면 -1 반환

```js
const str = 'Hello World!'
str.indexOf('World') // 6
```

## slice()

- index a부터 b **직전**까지 슬라이스

```js
const str = 'Hello World!'
str.slice(0, 5) // Hello
```

## replace()

- 문자열 대체
- 원본 문자열은 그대로 보존됨!

```js
const str = 'Hello World!'
const newStr = str.replace('World!', '')
console.log(str) // Hello World!
console.log(newStr) // Hello
```

## match()

- **정규표현식**과 사용됨
- 결과 배열 반환

```js
const email = 'shinsj4653@gmail.com'
console.log(email.match(/.+(?=@)/)[0])
// shinsj4653
// -> 배열 중에서 첫번째 요소
```

## trim()

- **양옆 공백** 없애기
- 역시 원본 문자열은 그대로 유지됨

```js
const pw = '    pass word   '
console.log(pw.trim()) // 'pass word'
console.log(pw) //'     pass word   '
```

# 숫자와 수학

## Math: 수학적인 상수와 함수를 위한 속성과 메소드를 가진 **내장 객체(함수 객체 X)**

- toFixed()
- parseInt(), parseFloat()
- ceil(), floor(), round(), random()

```js
const pi = 3.1415926

const piStr = pi.toFixed(2)
// 2번째 짜리까지 유지하고 나머지는 '버리기'
// toFixed() : string 리턴함

console.log(typeof piStr) // string

const integer = parseInt(piStr) // 전역함수 : string을 int로 바꿈
const float = parseFloat(piStr) // 전역함수 : string을 float로 바꿈

console.log(typeof integer, typeof float) // number number

console.log('ceil: ', Math.ceil(3.14)) // 소수점 첫째자리에서 무조건 올림처리
console.log('floor: ', Math.floor(3.14)) // 소수점 첫째자리에서 무조건 내림처리
console.log('round: ', Math.round(3.14)) // 보통 반올림
console.log('random: ', Math.random()) // 0 ~ 0.9xx 사이
```

- 1부터 10중 랜덤한 **정수** 얻고 싶을때

```js
Math.floor(Math.random() * 10) + 1
```

<br>

# 배열

## .length

- 배열 길이 반환

```js
const numbers = [1, 2, 3, 4]
console.log(numbers.length) // 4
console.log([].length) // 0
```

## .concat()

- 배열 이어 붙이기
- 원본 배열이 수정되지 않음!

```js
const numbers = [1, 2, 3, 4]
const fruits = ['Apple', 'Banana', 'Cherry']

console.log(numbers.concat(fruits))
// [1, 2, 3, 4, 'Apple', 'Banana', 'Cherry']
// numbers 원본배열이 수정되지않음!
```

## .forEach()

- `원소의 개수`만큼 callback함수를 반복적으로 실행시킴
- 따로 값을 return하지 않음

```js
fruits.forEach(function (elements, index, array) {
  console.log(elements, index, array)
  // elements : 배열의 각 요소들
  // index : 요소의 인덱스
  // array : 원본 fruits 배열
})

const returnForEach = fruits.forEach(function (fruit, i) {
  // fruit, i처럼 elements, index를 다른 이름으로 지정가능
  console.log(fruit, i)
})

console.log(returnForEach)
// undefined -> forEach는 따로 값을 return안함
```

## .map()

- 원본 배열 수정 x
- .forEach()할때 나오는 결과들을 하나하나씩 담은 **새로운 배열**을 return
- .forEach()의 결과들이 객체데이터일때 : **소괄호 ( )** 활용!

```js
// 화살표 함수 활용
const mapEx = fruits.map((fruits, index) => `${fruit}-${index}`)

console.log(mapEx)
// Array(3)
// 0: 'Apple-0'
// 1: 'Banana-1'
// 2: 'Cherry-2'
```

```js
const mapEx2 = fruits.map((fruit, index) => ({
  id: index,
  name: fruit,
})) // 객체데이터 return -> 소괄호 필요!
console.log(mapEx2)
// Array(3)
// 0: {id: 0, name: 'Apple'}
// 1: {id: 1, name: 'Banana'}
// 2: {id: 2, name: 'Cherry'}
```

## .filter()

- 원본 배열 수정 x
- 조건에 true인 요소들만 모아진 새로운 배열을 return

```js
const numbers = [1, 2, 3, 4]

const map = numbers.map(number => number < 3)
console.log(map) // [true, true, false, false]

const fil = numbers.filter(number => number < 3)
// true에 해당하는 요소만 들어감
console.log(fil) // [1, 2]
```

## .find(), .findIndex()

- find() : **주어진 판별 함수**를 만족하는 순간의 요소, 즉 만족하는 첫번째 요소를 return
- findIndex() : **주어진 판별 함수**를 만족하는 순간 그 요소의 **인덱스**를 return

```js
const fruits = ['Apple', 'Banana', 'Cherry']

const findEx = fruits.find(fruit => /^C/.test(fruit))
// 정규표현식 -> 'C'로 시작하는 요소 찾으면 find가 stop됨
//.test() -> 주어진 문자열이 정규 표현식을 만족하는지 판별 -> true 또는 false return
// 주어진 판별함수가 true일때 요소 return함
console.log(findEx) // Cherry

const findIndexEx = fruits.findIndex(fruit => /^C/.test(fruit))
console.log(findIndexEx) // 2
```

## .includes()

- 요소가 포함되어 있는지 없는지의 여부(true, false)를 return함

```js
console.log(numbers.includes(2)) // true
```

## .push(), .unshift(), .reverse(),. splice()

> [주의] 원본 배열이 수정됨!

```js
numbers.push(5)
console.log(numbers) // 1,2,3,4,5

numbers.unshift(0)
console.log(numbers) // 0,1,2,3,4,5

numbers.reverse()
console.log(numbers) // 5,4,3,2,1,0
```

```js
const numbers = [0, 1, 2, 3, 4, 5]

numbers.splice(2, 1) // 인덱스 2번 부터 총 1개를 삭제
console.log(numbers) // 0,1,3,4,5

numbers.splice(0, 1, 99) // 인덱스 0번 부터 1개를 삭제하고 99를 추가
console.log(numbers) // 99,1,3,4,5

fruits.splice(2, 0, 'Orange') // 인덱스 2번부터 아무것도 삭제 안할거면 0적으면 됨!
// 아무것도 삭제안하고 삽입만 하게됨!
// 원래 Apple, Orange, Cherry -> Cherry는 다음 인덱스인 3으로 밀려나감
console.log(fruits) // Apple, Banana, Orange, Cherry
```

<br>
# Object(객체)

## .assign()

- Object라는 전역객체에만 사용가능한 정적(static)메소드

```js
const userAge = {
  // key: value
  name: 'Heropy',
  age: 85,
}
const userEmail = {
  name: 'Heropy',
  email: 'shinsj4653@gmail.com',
}

const target = Object.assign(userAge, userEmail) // target, userAge -> 둘다 같은 메모리 주소값 가짐
// userAge는 변하게됨
console.log(target)
// Object
// age: 85
// email: 'shinsj4653@gmail.com'
// name: 'Heropy'
console.log(userAge)
// Object
// age: 85
// email: 'shinsj4653@gmail.com'
// name: 'Heropy'
console.log(target === userAge) // true -> 같은 내용과 주소값을 공유하기 때문
```

- 객체 데이터는 같은 내용이여도, **주소값**이 다르면 서로 다르다고 취급함

```js
const a1 = { k: 123 }
const b1 = { k: 123 }
console.log(a1 === b1) // false -> a1 과 b1은 같은 값이여도, 다른 메모리 주소를 가짐
```

```js
const target = Object.assign({}, userAge, userEmail) // {} 가 target이 됨! userAge와 userEmail 2개를 가져와서 {} 에 assing함
console.log(target)
// 이렇게 되면 userAge는 가만히 유지됨

const target3 = Object.assign({}, userAge)
console.log(target3 === userAge) // false -> target3는 userAge와는 다른 주소값 가짐
```

## .keys()

- 객체 데이터의 key값들을 모아둔 배열 return
- key값들을 모아둔 배열에 **key값을 활용한 인덱싱** & **map함수**를 활용하면 **value값들을 모아둔 배열** 새로 생성가능

```js
const userShin = {
  name: 'shin',
  age: 85,
  email: 'shinsj4653@naver.com',
}

const keys = Object.keys(userShin)
console.log(keys) // ['name', 'age', 'email']

// 객체데이터의 인덱싱
console.log(userShin['name']) // 'shin'

const values = keys.map(key => userShin[key])
console.log(values) // ['shin', 85, 'shinsj4653@naver.com']
```

<br>

# 구조 분해 할당 (Destructing assignment)

<div class="notice--success">
  <ul>
    <li>비구조화 할당</li>
    <li>속성들이 많을 때 사용하면 편리 -> 필요한 것만 뽑아서 사용가능</li>
  </ul>
</div>

## Object

```js
const user = {
  name: 'user',
  age: 50,
  email: 'ddd@gmail.com',
  country: 'USA',
}

const { name: userName, age, email, address, country = 'Korea' } = user
// E.g user.address
// : -> key의 이름바꾸기, = : 키에 아예 새로운 값 할당
// name의 값을 userName이라는 변수에 새로 할당 -> name은 이제 존재 X

console.log(`사용자의 이름은 ${userName}입니다.`) // 그냥 name이라 하면 오류남!
console.log(`${userName}의 나이는 ${age}세입니다.`)
console.log(`${userName}의 이메일 주소는 ${email}입니다.`)
console.log(address) // undefined -> 비구조화 안에서 기본값 할당하면 그 값이 나옴
console.log(country) // USA -> 이미 값이 있는 상태면 비구조화 안에서기본값 할당된 상태(Korea)여도 무시됨
```

> **[주의!] 이미 키의 값이 존재하는 상태이면 비구조화 안에서 새로 값을 할당해도 그 값은 무시됨**

## Array

```js
const fruits = ['Apple', 'Banana', 'Orange', 'Cherry']

const [a, b, c, d, e] = fruits // { } 랑  [ ] 잘 구분하기!
console.log(a, b, c, d, e) // 객체 데이터는 key로 가져옴 -> 배열은 순서대로 가져와야함
// e -> undefined

const [, y] = fruits // ','를 통해 특정 순서의 요소만 뽑아오기 가능!!
// , 하나쓸때 마다 하나씩 넘어감
console.log(y) // Banana 만 추출
```

<br>

# 전개 연산자(Spread)

```js
console.log(fruits) // [Apple, Banana, Orange, Cherry]
console.log(...fruits) // Apple, Banana, Orange, Cherry -> 배열에서 전개된 요소들이 출력됨
```

```js
const fruits = ['Apple', 'Banana', 'Orange', 'Cherry']
const toObject = (a, b, ...c) => ({ a, b, c })
// a, b는 각각 첫번째, 두번째 요소를 가짐
// 나머지는 모두 c로 들어감(c === rest parameter)
// c에는 ...c 가 배열형태로 들어감

console.log(toObject(...fruits))
// a: 'Apple'
// b: 'Banana'
// c: ['Orange', 'Cherry']

// 쉼표로 구분된 '전개된' 문자요소들이 toObject함수의 인수로 들어감
// toObject(fruits[0], fruits[1], fruits[2]) 보다 간단!
```

> 객체 데이터의 `key(속성) 의 변수명과 value의 변수명(인수)`이 같으면 위처럼 축약가능!!

<br>

# 데이터 불변성(Immutability)

## 원시데이터(String, Number, Boolean, undefined, null)

```js
let nA = 1
let nB = 4

console.log(nA, nB, nA === nB) // 두개의 메모리 주소가 다름! false
nB = nA // nA가 바라보는 메모리 주소를 nB에게 할당
console.log(nA, nB, nA === nB) // true
nA = 7 // 1, 4와는 또 다른 값 -> nA는 또 다른 메모리 주소를 가리킴
console.log(nA, nB, nA === nB) // false
let nC = 1 // nB와 같은 숫자 데이터 -> nB와 같은 메모리 주소
// 새로운 원시데이터 -> 한번 메모리에 만들어지면 다시 새로 생성안됨!
// -> 데이터 불변성
// 이미 있는 값이면 그 값에 해당하는 주소를 가리킴
console.log(nB, nC, nB === nC) // true
```

## 참조형 데이터(Object, Array, Function)

```js
let rA = { k: 1 }
let rB = { k: 1 }
// 같은 값이여도 메모리에 계속해서 할당됨
// -> 데이터 가변성
console.log(rA, rB, rA === rB) // false
rA.k = 7
rB = rA
console.log(rA, rB, rA === rB) // true
rA.k = 2 // rB도 덩달아 바뀜! 주의!
console.log(rA, rB, rA === rB) // true
let rC = rB // rB는 rA가리킴, 즉 rC도 덩달아 rA가리키게 됨
console.log(rA, rB, rC, rA === rC) // true
rA.k = 9
console.log(rA, rB, rC, rA === rC) // 모두 k의 값이 9로 됨
```

<br>

# 얕은복사(Shallow Copy) & 깊은복사(Deep Copy)

## 객체데이터 복사

- 객체안에 원시데이터가 아닌, **참조데이터**가 있을때

```js
const player = {
  name: 'Heropy',
  age: 85,
  emails: ['shinsj4653@gmail.com'],
}
```

## 얕은 복사

- =

```js
const copyPlayer = player
player.age = 22
//copyPlayer.age도 수정되어버림..
```

- Object.assign()

```js
const copyPlayer = Object.assign({}, player)
// 이렇게 하면 새로운 객체데이터가 생성됨

// 전개식 활용한다면?
const copyPlayer = { ...player }

player.age = 22 // copyPlayer.age는 영향 안 받음
player.emails.push('neo@zillinks.com') // 배열 : 참조형 데이터
//-> player와 copyPlayer는 같은 emails 주소를 지님! 즉, 둘 다 추가되어 버림..
console.log(player.emails === copyPlayer.emails) // true
// -> false가 되려면 깊은 복사 필요
```

## 깊은 복사

- lodash 패키지의 .cloneDeep() 활용(재귀적으로 복사)

```js
import _ from 'lodash'

const copyPlayer = _.cloneDeep(player)
console.log(copyPlayer === player) //false

player.age = 22
console.log('player', player)
console.log('copyPlayer', copyPlayer)
// player랑 age값 다름

player.emails.push('neo@zillinks.com')
console.log(player.emails === copyPlayer.emails) // false
console.log('player', player)
console.log('copyPlayer', copyPlayer)
// emails 배열도 player랑 다름!
```

> 참조형 데이터 안에 또 다른 참조형 데이터가 있을땐 -> `lodash 의 cloneDeep`사용해서 깊은 복사하기!

# 가져오기, 내보내기 (import, export)

## js 파일들: 통로 2개 존재

1. 함수 이름 지정안해도 되는 **"default export"**
1. 함수 이름 지정해야하는 **"named export"**

## default export

- 함수 이름 지정 안해도 됨
- 다른 js에서 import 할때 **원하는 이름**으로 불러오기 가능!

```js
//getType.js;

export default function (data) {
  return Object.prototype.toString.call(data).slice(8, -1)
}
```

```js
import _ from 'lodash'
// node_modules 폴더에서 가지고옴

import checkType from './getType'
// getType.js -> 상대경로 활용
// 기본통로 : default export
// default export는 한파일당 한번만 사용가능
// './getType.js'에서 js 생략 가능
```

## named export

- 함수 이름 지정 해야됨
- import 할때 { } 안에 명시해야됨
- 한 파일에 여러번 사용 가능

```js
//getRandom.js;

export function random() {
  return Math.floor(Math.random() * 10) // 0 ~ 9.xx
}

export const user = {
  name: 'Heropy',
  age: 85,
}

export default 123
// named export와 export default 한파일에 둘다 사용가능
// 단, default export는 딱 하나만 가능
```

```js
import { random, user as heropy } from './getRandom'
// import할때는 이름 그대로, 사용할 때는 user as heropy해서 다른 이름으로 사용가능
```

- '\*' : wildcard character
- 한꺼번에 다 가져오기도 가능

```js
import * as R from './getRandom'
console.log(R)
// { default: 123, user: {…}, __esModule: true, random: ƒ }
```

<br>

# lodash 사용법 (MDN 읽기 권장)

[Lodash Documentation](https://lodash.com/docs/3.10.1)

- import \_ from 'lodash' -> { } 중괄호 사용 x === default export
- \_ 언더바는 통상적인 이름, 바꿔서 사용가능함

## _.uniqBy(), _.unionBy()

```js
const usersA = [
  { userId: '1', name: 'HEROPY' },
  { userId: '2', name: 'Neo' },
]
const usersB = [
  { userId: '1', name: 'HEROPY' },
  { userId: '3', name: 'Amy' },
]

const usersC = usersA.concat(usersB) // 병합
console.log('concat', usersC)
// 0: {userId: '1', name: 'HEROPY'}
// 1: {userId: '2', name: 'Neo'}
// 2: {userId: '1', name: 'HEROPY'}
// 3: {userId: '3', name: 'Amy'}

console.log('uniqBy', _.uniqBy(usersC, 'userId'))
// 'userId' 속성의 값 중, 중복된게 들어가 있으면 그 중복된 데이터를 포함하고 있는 요소를 하나 없애줌

// uniqBy(판별받을 데이터 '한 개', 속성값)
// 0: {userId: '1', name: 'HEROPY'}
// 1: {userId: '2', name: 'Neo'}
// 2: {userId: '3', name: 'Amy'}

const usersD = _.unionBy(usersA, usersB, 'userId')
// unionBy(합칠 데이터들 '여러개', 속성값)
console.log('unionBy', usersD)
// 0: {userId: '1', name: 'HEROPY'}
// 1: {userId: '2', name: 'Neo'}
// 2: {userId: '3', name: 'Amy'}
```

> 데이터 하나일땐 uniqBy, 여러개일땐 unionBy 사용

<br>

## _.find(), _.findIndex(), \_.remove()

```js
const users = [
  { userId: '1', name: 'HEROPY' },
  { userId: '2', name: 'Neo' },
  { userId: '3', name: 'Amy' },
  { userId: '4', name: 'Evan' },
  { userId: '5', name: 'Lewis' },
]

const foundUser = _.find(users, { name: 'Amy' })
const foundUserIndex = _.findIndex(users, { name: 'Amy' })
console.log(foundUser) // {userId: '3', name: 'Amy'}
console.log(foundUserIndex) // 2

_.remove(users, { name: 'HEROPY' }) // 이 데이터를 가지고 있는 요소 삭제
console.log(users)
// 0: {userId: '2', name: 'Neo'}
// 1: {userId: '3', name: 'Amy'}
// 2: {userId: '4', name: 'Evan'}
// 3: {userId: '5', name: 'Lewis'}
```

<br>

# JSON(JavaScript Object Notation)

## 자바스크립트 객체 표기법

```json
//myData.json

{
  "string": "HEROPY",
  "number": 123,
  "boolean": true,
  "null": null,
  "object": {},
  "array": []
}
```

```js
import myData from './myData.json'
// .js만 생략 가능! 나머지는 붙여야함
// 즉, .json은 붙여야함

console.log(myData)
// 객체처럼 보여지게 출력되지만,
// 실제로는 하나의 문자데이터임!!
```

## JSON.stringify(), JSON.parse()

```js
const jsonUser = {
  name: 'HEROPY',
  age: 85,
  emails: ['thesecon@gmail.com', 'neo@zillinks.com'],
}

const jsonStr = JSON.stringify(jsonUser)
// JSON: 전역객체 -> stringify() 로 경량화시킴
console.log('str', jsonStr)
// str {"name":"HEROPY","age":85,"emails":["thesecon@gmail.com","neo@zillinks.com"]}
console.log(typeof jsonStr)
// string

const obj = JSON.parse(jsonStr)
// 다시 자바스크립트의 실제 데이터로 변환
console.log('obj', obj)
// obj {name: 'HEROPY', age: 85, emails: Array(2)}
```

<br>

# Storage

- 브라우저 F12 -> Application -> Storage
- Lowdb : Small JSON database for Node -> 기본적으로 Lodash를 기반으로 작동함
- localStorage는 브라우저 닫아도 만료 안됨
- sessionStorage의 데이터는 브라우저 닫으면 만료됨

```js
const jsonUser = {
  name: 'HEROPY',
  age: 85,
  emails: ['thesecon@gmail.com', 'neo@zillinks.com'],
}

localStorage.setItem('user', JSON.stringify(jsonUser))
// setItem -> 반드시 JSON.stringify()로 문자 데이터로 변환시켜야함!
console.log(JSON.parse(localStorage.getItem('user')))
// {name: 'HEROPY', age: 85, emails: Array(2)}
```

- localStorage의 데이터의 **수정**이 필요할때

```js
const strStorage = localStorage.getItem('user')
const objStorage = JSON.parse(strStorage)
//JSON.parse()한 후에, 데이터 수정
objStorage.age = 22
console.log(objStorage)
//{name: 'HEROPY', age: 22, emails: Array(2)}
localStorage.setItem('user', JSON.stringify(objStorage))
// 다시 setItem() 할때는 JSON.stringify() 필수!
```

<br>

# OMDb API

## Query String

- 주소?속성=값&속성=값&속성=값
  => 주소 다음에 '?' 뒤의 속성=값, 그리고 & 로 구분되어 이루어진 문자열

## axios

- omdb api에서 얻은 정보 해석가능하게 해줌
- 또한, http 요청을 처리할 수 있게 해줌

```js
import axios from 'axios'

function fecthMovies() {
  axios // 데이터 요청하고 처리하는 걸 가능하게 해주는 패키지 -> axios
    .get('https://www.omdbapi.com/?apikey=7035c60c&s=frozen') // 데이터 요청
    .then(res => {
      // res: 통상 result, response
      console.log(res)
      const h1El = document.querySelector('h1')
      const imgEl = document.querySelector('img')
      h1El.textContent = res.data.Search[0].Title
      // search배열에 영화 데이터들 존재!
      imgEl.src = res.data.Search[0].Poster
    })
}
fecthMovies()
```

---
date: '2022-08-11'
title: 'TypeScript 개념정리'
categories: ['TypeScript', 'Velopert']
summary: '드림코딩 TypeScript 강의복습겸, 개념을 다시 정리해보기 위해 코딩애플/Velopert 강의를 정리해보았다.'
thumbnail: './images/thumbnail-typescript.png'
---

코딩애플 및 Velopert 님께서 작성한 TypeScript 내용을 정리해보았다.

# TypeScript 사용이유

## 1. IDE를 더욱 더 적극적으로 활용 (자동완성, 타입확인)

TypeScript에서는 `자동완성`의 기능을 잘 활용할 수 있다. 해당 함수가 어떤 파라미터를 필요로 하는지, 그리고 어떤 값을 반환하는지 코드를 따로 열어보지 않아도 알 수 있다.  
리액트 컴포넌트의 경우 props에는 무엇을 전달해주어야 하는지 쉽게 알 수 있고, 컴포넌트 내부에는 props와 state에 어떤 값이 있는지 확인이 가능하다.  
또한, 리덕스를 사용할 경우에도 스토어 안에 어떤 상태가 들어있는지 바로 조회가 가능하다.

## 2. 실수방지

코드를 실행하지 않고도 IDE 상에서 바로 알 수 있다. null 혹은 undefined 일 수도 있는 값의 내부 값 혹은 함수를 호출한다면, 사전에 null 체킹을 하지 않으면 오류가 뜨므로 null 체킹도 확실하게 할 수 있게 된다.

# TypeScript 설치

1. nodejs 설치
2. VScode 에디터 준비
3. Terminal 오픈 후,

```terminal
npm install -g typescript
```

yarn을 사용한다면,

```md
yarn global add typescript
```

위 코드 입력하기  
<br /> 4. 에디터에 프로젝트 폴더 open  
5. 어쩌구.ts 파일 생성 후 코드작성  
6. tsconfig.json 생성

`tsc --init` 명령어를 입력하면 `tsconfig.json`파일이 자동생성된다.

```js
{
  "compilerOptions" : {
    "target": "es5",
    "module": "commonjs",
  }
}
```

위 코드 입력하기  
<br/>
ts 파일은 브라우저에서 인식을 못함!  
-> 그래서 js 파일로 변환하는 작업이 필요하다.  
터미널을 연다음,

```termninal
tsc -w
```

위 코드 입력하면 ts파일을 js파일로 변환해준다.
그리고, compilerOptions에서 js 버전 등을 세팅가능하다.  
tsconfig.json에서의 용어정리를 몇 개 해보았다.

- target: 컴파일된 코드가 `어떤 환경`에서 실행될지 정의한다. es5에서는 화살표 함수를 사용하면, 일반 function 키워드를 사용하는 함수로 변환을 해주지만, es6에서는 화살표 함수를 그대로 유지해준다.

- module: 컴파일된 코드가 `어떤 모듈 시스템`을 사용할지 정의한다. common으로 세팅으로 하면 `export default Sample`을 하게 됐을때 컴파일 된 코드에서는 `exports.default = helloWorld`로 변환해주지만 이 값을 es2015로 하면 `export default Sample`구문을 그대로 유지해준다.

- strict: 모든 타입 체킹 옵션을 활성화한다는 의미이다.

- esModuleInterop: commonjs 모듈 형태로 이루어진 파일을 es2015 모듈 형태로 불러올 수 있게 해준다.

`outDir` 속성을 설정해주면 `컴파일된 파일들이 저장되는 경로`를 지정할 수 있다.

```ts
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "./dist"
  }
}
```

# 문법정리

## 변수에 타입지정

```ts
let name: string = 'kim'
name = 123 // error
```

## array 타입지정

```ts
let arr: string[] = ['kim', 'park'] // arr에는 string타입 변수만 들어올 수 있다.

let obj: { name: string } = { name: 'kim' }
let obj2: { name?: string } = { name: 'kim' } // name이라는 속성이 들어올 수도 안 들어올 수 있다라고 의미
```

## Union type: 다양한 타입이 들어올 수 있게 하는 타입

```ts
let name: string | number = 'kim'
let name: string | number = 123

// 둘다 가능
```

## Type alias: 타입은 변수에 담아쓸 수 있다.

```ts
type MyType = string | number

let name: MyType = 123 // string 혹은 number가 name에 올 수 있다.

type Person = {
  name: string
  age?: number // 물음표가 들어갔다는 것은, 설정을 해도 되고 안해도 되는 값이라는 것을 의미
}

// & 는 Intersection 으로서 두개 이상의 타입들을 합쳐준다.
// 참고: https://www.typescriptlang.org/docs/handbook/advanced-types.html#intersection-types
type Developer = Person & {
  skills: string[]
}

const person: Person = {
  name: '김사람',
}

const expert: Developer = {
  name: '김개발',
  skills: ['javascript', 'react'],
}

type People = Person[] // Person[] 를 이제 앞으로 People 이라는 타입으로 사용 할 수 있다.
const people: People = [person, expert]

type Color = 'red' | 'orange' | 'yellow'
const color: Color = 'red'
const colors: Color[] = ['red', 'orange']
```

## 함수에 타입 지정가능

```ts
function fn(x: number): number {
  return x * 2
}
```

매개변수 및 return 값에 타입 지정 가능하다.

## array에 쓸 수 있는 tuple 타입

```ts
type Member = [number, boolean]
let john: Member = [123, true]
let lee: Member = ['123', true] // error
```

## object에 타입 지정해야할 속성이 너무 많을 경우

```ts
type Member = {
  [key: string]: string // 글자로 된 모든 object 키는 string 값을 가져야 한다
}
let john: Member = { name: 'john', age: '20' }
```

일일이 name, age 키의 타입을 지정할 필요가 없다

## class 타입지정 가능

```ts
class User {
  name: string
  constructor(name: string) {
    this.name = name
  }
}
```

# interface 사용해보기

interface는 클래스 또는 객체를 위한 타입을 지정할 때 사용되는 문법이다.

## 클래스에서 interface를 implements 하기

```ts
// Shape 라는 interface 를 선언
interface Shape {
  getArea(): number // Shape interface 에는 getArea 라는 함수가 꼭 있어야 하며 해당 함수의 반환값은 숫자이다.
}

class Circle implements Shape {
  // `implements` 키워드를 사용하여 해당 클래스가 Shape interface 의 조건을 충족하겠다는 것을 명시
  constructor(public radius: number) {
    this.radius = radius
  }

  // 너비를 가져오는 함수를 구현
  getArea() {
    return this.radius * this.radius * Math.PI
  }
}

class Rectangle implements Shape {
  constructor(private width: number, private height: number) {
    this.width = width
    this.height = height
  }
  getArea() {
    return this.width * this.height
  }
}

const circle = new Circle(5)
const rectangle = new Rectangle(10, 5)

console.log(circle.radius)
console.log(rectangle.width)

const shapes: Shape[] = [new Circle(5), new Rectangle(10, 5)]

shapes.forEach(shape => {
  console.log(shape.getArea())
})
```

타입스크립트에서는 constructor의 파라미터 쪽에 public 또는 private 접근자를 사용하면 직접 하나하나 설정해주는 작업을 생략해줄 수 있다. 다시말해, 밑 코드와 같은 부분을 윗 코드처럼 대신 작성이 가능하다는 것 이다.

```ts
  width: number;
  height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
```

## 일반 객체를 interface 로 타입 설정하기

```ts
interface Person {
  name: string
  age?: number // 물음표가 들어갔다는 것은, 설정을 해도 되고 안해도 되는 값이라는 것을 의미
}
interface Developer {
  name: string
  age?: number
  skills: string[]
}

const person: Person = {
  name: '김사람',
  age: 20,
}

const expert: Developer = {
  name: '김개발',
  skills: ['javascript', 'react'],
}
```

윗 코드를 보면 Person과 Developer가 형태가 유사한데 이럴 땐 interface가 다른 interface를 상속할 수 있도록 extends 키워드를 사용 가능하다.

```ts
interface Person {
  name: string
  age?: number // 물음표가 들어갔다는 것은, 설정을 해도 되고 안해도 되는 값이라는 것을 의미
}
interface Developer extends Person {
  skills: string[]
}
const person: Person = {
  name: '김사람',
  age: 20,
}

const expert: Developer = {
  name: '김개발',
  skills: ['javascript', 'react'],
}
const people: Person[] = [person, expert]
```

클래스와 관련된 타입의 경우엔 `interface` 를 사용하는게 좋고, 일반 객체의 타입의 경우엔 그냥 `type` 을 사용해도 무방하다고 한다.

# Generics

제네릭은 타입스크립트에서 함수, 클래스, interface, type alias를 사용하게 될 때 여러 종류의 타입에 대하여 호환을 맞춰야 하는 상황에서 사용하는 문법이다.

## 함수에 Generics 사용하기

객체 A와 객체 B를 합쳐주는 merge 함수를 구현한다고 가정하자.

```ts
function merge(a: any, b: any): any {
  return {
    ...a,
    ...b,
  }
}

const merged = merge({ foo: 1 }, { bar: 1 })
```

A와 B가 어떤 타입이 올 지 모르기 때문에 이런 상황에서는 any라는 타입을 윗 코드처럼 작성해도 되지만, 그렇게되면 merged 역시 any 타입이 되어버리기 때문에 안에 무엇이 있는지 알 수 없다.  
이런 상황일 때 Generics 를 사용하면 된다.

```ts
function merge<A, B>(a: A, b: B): A & B {
  return {
    ...a,
    ...b,
  }
}

const merged = merge({ foo: 1 }, { bar: 1 })
```

또 다른 예시 코드로 다음을 들 수 있다.

```ts
function wrap<T>(param: T) {
  return {
    param,
  }
}

const wrapped = wrap(10)
```

## interface에서 Generics 사용하기

이번엔 interface에서 Generics를 사용하는 방법을 알아보았다.

```ts
interface Items<T> {
  list: T[]
}

const items: Items<string> = {
  list: ['a', 'b', 'c'],
}
```

## type 에서 Generics 사용하기

interface 에서 Generics를 사용한 것과 매우 유사하다.

```ts
type Items<T> = {
  list: T[]
}

const items: Items<string> = {
  list: ['a', 'b', 'c'],
}
```

## 클래스에서 Generics 사용하기

`Queue` 라는 자료구조를 구현한 클래스이다. 밑 코드를 통해 클래스에서는 어떻게 Generics를 적용할 수 있는지 확인할 수 있다.

```ts
class Queue<T> {
  list: T[] = []
  get length() {
    return this.list.length
  }
  enqueue(item: T) {
    this.list.push(item)
  }
  dequeue() {
    return this.list.shift()
  }
}

const queue = new Queue<number>()
```

# 참고링크

- [코딩애플 강의영상](https://www.youtube.com/watch?v=xkpcNolC270)
- [Velopert - TypeScript](https://react.vlpt.us/using-typescript/)

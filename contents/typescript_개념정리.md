---
date: '2022-08-11'
title: 'TypeScript 개념정리'
categories: ['TypeScript', 'Velopert']
summary: '드림코딩 TypeScript 공부 했던 거 복습겸, 개념을 다시 정리해보기 위해 코딩애플 TypeScript 강의를 정리해보았다.'
thumbnail: './images/thumbnail-typescript.png'
---

# TypeScript 설치

1. nodejs 설치
2. VScode 에디터 준비
3. Terminal 오픈 후,

```terminal
npm install -g typescript
```

위 코드 입력하기  
<br /> 4. 에디터에 프로젝트 폴더 open  
5. 어쩌구.ts 파일 생성 후 코드작성  
6. tsconfig.json 생성 후,

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

[참고링크](https://www.youtube.com/watch?v=xkpcNolC270)

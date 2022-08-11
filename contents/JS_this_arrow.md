---
date: '2022-08-09'
title: 'JS this : Normal vs Arrow'
categories: ['JavaScript']
summary: '일반 함수와 화살표 함수간의 this가 잘 이해가 되지 않아 보충정리'
thumbnail: './images/thumbnail-javascript.png'
---

# 일반 함수의 this

```js
function Prefixer(prefix) {
  this.prefix = prefix
}

Prefixer.prototype.prefixArray = function (arr) {
  // (A)
  return arr.map(function (x) {
    return this.prefix + ' ' + x // (B)
  })
}

let pre = new Prefixer('Hi')
console.log(pre.prefixArray(['Lee', 'Kim']))
```

(A) 지점에서의 this는 생성자 함수 Prefixer가 생성한 객체, 즉 `생성자 함수의 인스턴스(pre)`이다.

(B) 지점에서 사용한 this는 아마도 생성자 함수 Prefixer가 생성한 객체(pre)일 것으로 기대하였겠지만, 이곳에서 this는 `전역객체 window`를 가리킨다.  
-> 생성자 함수와 객체의 메소드를 제외한 모든 함수(내부 함수, 콜백 함수 포함) 내부의 this는 `전역 객체(window)`를 가리키기 때문
<br />
<br />
**Q. 콜백 함수 내부의 this가 메소드를 호출한 객체(생성자 함수의 인스턴스)를 가리키게 하고 싶으면?**

### Solution 1

```js
// Solution 1: that = this
function Prefixer(prefix) {
  this.prefix = prefix
}

Prefixer.prototype.prefixArray = function (arr) {
  let that = this // this: Prefixer 생성자 함수의 인스턴스
  return arr.map(function (x) {
    return that.prefix + ' ' + x
  })
}

let pre = new Prefixer('Hi')
console.log(pre.prefixArray(['Lee', 'Kim']))
```

### Solution 2

```js
// Solution 2: map(func, this)
function Prefixer(prefix) {
  this.prefix = prefix
}

Prefixer.prototype.prefixArray = function (arr) {
  return arr.map(function (x) {
    return this.prefix + ' ' + x
  }, this) // this: Prefixer 생성자 함수의 인스턴스
}

let pre = new Prefixer('Hi')
console.log(pre.prefixArray(['Lee', 'Kim']))
```

### Solution 3: ES5에 추가된 function.prototype.bind()로 this를 바인딩한다.

```js
// Solution 3: bind(this)
function Prefixer(prefix) {
  this.prefix = prefix
}

Prefixer.prototype.prefixArray = function (arr) {
  return arr.map(
    function (x) {
      return this.prefix + ' ' + x
    }.bind(this),
  ) // this: Prefixer 생성자 함수의 인스턴스
}

let pre = new Prefixer('Hi')
console.log(pre.prefixArray(['Lee', 'Kim']))
```

# 화살표 함수의 this

일반 함수는 함수가 어떻게 호출되었는지에 따라 this에 바인딩할 객체가 동적으로 결정된다.  
반면, 화살표 함수는 this에 바인딩할 객체가 정적으로 결정된다. **화살표 함수의 this는 언제나 상위 스코프의 this를 가리킨다.** 이를 `Lexical this`라 한다.

```js
function Prefixer(prefix) {
  this.prefix = prefix
}

Prefixer.prototype.prefixArray = function (arr) {
  // this는 상위 스코프인 prefixArray 메소드 내의 this를 가리킨다.
  return arr.map(x => `${this.prefix}  ${x}`)
}

const pre = new Prefixer('Hi')
console.log(pre.prefixArray(['Lee', 'Kim']))
```

화살표 함수는 call, apply, bind 메소드를 사용하여 this를 변경할 수 없다.

```js
window.x = 1
const normal = function () {
  return this.x
}
const arrow = () => this.x

console.log(normal.call({ x: 10 })) // 10
console.log(arrow.call({ x: 10 })) // 1
```

# 화살표 함수를 사용해서는 안되는 경우

화살표 함수는 Lexical this를 지원하므로 콜백 함수로 사용하기 편리하다. 하지만 화살표 함수를 사용하는 것이 오히려 해가 될 경우도 있다.

## 4.1 메소드

```js
// Bad
const person = {
  name: 'Lee',
  sayHi: () => console.log(`Hi ${this.name}`),
}

person.sayHi() // Hi undefined
```

메소드로 정의한 화살표 함수 내부의 this는 메소드를 소유한 객체, 즉 메소드를 호출한 객체를 가리키지 않고 상위 요소인 전역 객체 window를 가리킨다.  
이와 같은 경우는 ES6의 축약 메소드 표현을 사용하는 것이 좋다.

```JS
// Good
const person = {
  name: 'Lee',
  sayHi() { // === sayHi: function() {
    console.log(`Hi ${this.name}`);
  }
};

person.sayHi(); // Hi Lee
```

## 4.2 prototype

```js
// Bad
const person = {
  name: 'Lee',
}

Object.prototype.sayHi = () => console.log(`Hi ${this.name}`)

person.sayHi() // Hi undefined
```

prototype에 메소드를 할당하는 경우, 일반 함수를 할당해줘야한다.

```js
// Good
const person = {
  name: 'Lee',
}

Object.prototype.sayHi = function () {
  console.log(`Hi ${this.name}`)
}

person.sayHi() // Hi Lee
```

## 4.3 생성자 함수

화살표 함수는 생성자 함수로 사용할 수 없다. 화살표 함수는 prototype 프로퍼티가 없다.

```js
const Foo = () => {}

// 화살표 함수는 prototype 프로퍼티가 없다
console.log(Foo.hasOwnProperty('prototype')) // false

const foo = new Foo() // TypeError: Foo is not a constructor
```

# 4.4 addEventListener 함수의 콜백 함수

addEventListener 함수의 콜백 함수를 화살표 함수로 정의하면 this가 상위 컨택스트인 전역객체 window를 가리킨다.

```js
// Bad
let button = document.getElementById('myButton')

button.addEventListener('click', () => {
  console.log(this === window) // => true
  this.innerHTML = 'Clicked button'
})
```

따라서 addEventListener 함수의 콜백 함수 내에서 this를 사용하는 경우엔 function 키워드로 정의한 **일반 함수**를 사용해야 한다. 일반 함수로 정의된 콜백함수 내부의 this는 이벤트 리스너에 바인딩된 요소(currentTarget)를 가리킨다.

```js
// Good
let button = document.getElementById('myButton')

button.addEventListener('click', function () {
  console.log(this === button) // => true
  this.innerHTML = 'Clicked button'
})
```

[참고 사이트](https://poiemaweb.com/es6-arrow-function)

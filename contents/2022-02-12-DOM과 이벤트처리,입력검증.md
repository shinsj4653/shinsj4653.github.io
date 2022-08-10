---
date: '2022-02-12'
title: 'DOM, 이벤트처리, 입력검증'
categories: ['KU', 'WebProgramming']
summary: '학교 웹 프로그래밍 수업 중, 10주차 수업 내용정리'
thumbnail: './images/thumbnail-konkuk.png'
---

<div class="notice--success">
  <h4>10주차</h4>
  <ul>
    <li>HTML 변경</li>
    <li>브라우저 객체 모델</li>
    <li>이벤트 처리</li>
  </ul>
</div>

# 문서 객체 모델(DOM)

## DOM : Document Object Model

- HTML 문서 객체 모델
- HTML 문서의 계층적인 구조를 트리로 표현
- DOM에서의 **노드(node)**  
  => 문서 안에 들어있는 요소나 텍스트

## 사용이유 => 동적으로 웹피이지의 내용과 스타일 변경 가능!!

# HTML 요소 찾기

- 두 가지 방법이 존재!

1. id로 찾기
1. 태그로 찾기

## getElementById

- 요소의 내용이 아니라 **요소 자체**가 반환된다.
- **요소의 내용**을 가져오려면 **innerHTML** 속성을 활용해야한다

```js
document.getElementById('main').innerHTML
```

- 만약, **input태그의 요소**를 가지고 오고 싶다? => **value 속성**을 활용해야한다

```html
<input type="text" id="target" name="text1" />
<input type="submit" value="제출" onclick="process()" />
```

```js
function process() {
  const obj = document.getElementById('target')
  console.log(obj.value)
}
```

# **HTML 변경하기**

- JS를 이용하여 HTML문서의 DOM를 변경
- HTML 문서가 직접 변경되는 것은 아니고, **DOM만 변경된다**

1. 요소의 내용 변경
1. 요소의 속성 변경
1. 요소의 스타일 변경

## 요소의 내용 변경

- 가장 쉬운 방법: **innerHTML 속성**

```js
document.getElementById('main').innerHTML = '웹 페이지가 작성되었습니다.'
```

## 요소의 속성 변경

```js
document.getElementById('image').src = 'poodle.png'
```

## 요소의 스타일 변경

```js
document.getElementById('p2').style.color = 'blue'
```

<br>

# DOM 노드 삭제와 추가

<br>

# **브라우저 객체 모델**

## BOM : Browser Object Model

- 웹 브라우저를 객체로 표현한 것

![bom](./images/bom.png)

- BOM이 DOM(Document)를 포함하고 있음

## window 객체

- BOM의 최상위 객체

### open() 과 close()

- 새로운 브라우저 윈도우를 오픈

```js
window.open(URL, name, specs, replace)
```

- replace : 히스토리 목록에 새 항목을 만들지, 아니면 현재 항목을 대체할지 지정

  - true: 현재 히스토리를 대체
  - false: 히스토리에 새 항목을 만든다

- 예시

```html
<input type="button" value="구글창 열기"
onclick="window.open("http://www.google.com", "_blank", "width=300, height=300",
true)" />
```

### moveTo(), moveBy()

- 윈도우 창을 이동시킴
  - moveTo() : 절대적인 위치로 이동
  - moveBy() : 상대적으로 이동

```html
<head>
  <script>
    const w;
    function openWindow() {
      w = window.open('','','width=200, height=100');
      w.document.write('<p>오늘 다음과 같은 상품을 싸게 팝니다.</p>');
      w.moveTo(0,0);
    }
    function moveWidow() {
      w.moveBy(10,10);
      w.focus();
    }
  </script>
</head>

<body>
  <input type="button" value="윈도우 생성" onclick="openWindow()" />
  <input type="button" value="윈도우 이동" onclick="moveWindow()" />
</body>
```

## screen 객체

### availHeight, availWidth

- JS를 이용해 윈도우의 태스크바를 가리지 않으면서 **최대 크기로 윈도우를 오픈**할 때 사용됨

```js
function maxopen(url, winattributes) {
  const maxwindow = window.open(url, '', winattributes)
  maxwindow.moveTo(0, 0)
  maxwindow.resizeTo(screen.availWidth, screen.availHeight)
}
```

## location 객체

- 현재 URL에 대한 정보를 가지고 있다.

### location 객체의 메서드

- assign() : 새로운 문서를 로드
- reload() : 현재 문서를 다시 로드
- replace() : 현재 문서를 새로운 문서로 대체한다.

```js
function replace() {
  location.replace('http://google/com')
}
```

## navigator 객체

- 브라우저에 대한 정보를 가지고 있다.

# **이벤트 처리**

## onclick 이벤트

```html
<h1 onclick="change()">이것은 클릭 가능한 헤딩입니다.</h1>
```

- h1 요소를 클릭하였을때, change()함수가 호출됨

## onload, onunload 이벤트

- 웹 페이지에 진입하거나, 웹 페이지를 떠나면 이벤트 발생
- 쿠키를 처리하는데도 사용가능

```html
<head>
  <script>
    function onLoadDoc() {
      alert('문서가 로드되었습니다.')
      document.body.style.backgroundColor = 'red'
    }
  </script>
</head>
<body onload="onLoadDoc()"></body>
```

- **문서가 로드**되면 body 요소의 배경색을 빨간색으로 변경

## onChange 이벤트

- 입력 필드를 검증할 때 주로 사용

```html
<head>
  <script>
    function sub() {
      let x = document.getElementById('name')
      x.value = x.value.toLowerCase()
    }
  </script>
</head>
<body>
  영어단어: <input type="text" id="name" onchange="sub()" />
  <p>입력필드를 벗어나면 소문자로 변경됩니다.</p>
</body>
```

- 키보드 포커스가 입력필드를 벗어나면 sub()함수 호출

## onmouseover 이벤트

- HTML 요소 위에 마우스를 올리거나 떠날때 발생

```html
<head>
  <script>
    function OnMouseIn(elem) {
      elem.style.border = "2px solid red";
    }
    function OnMouseOut(elem) {
      elem.style.border = "";
    }
  </script>
</head>
<body>
  <div onmouseover="OnMouseIn(this)" onmouseout="OnMouseOut(this)">
</body>
```

- 마우스가 들어오면 경계선을 두껍게 칠함
- 마우삭 나가면 경계션을 없앤다

## onmousedown, onmouseup, onclick 이벤트

- 마우스 버튼 누르고 있을때, 버튼 땔때, 마지막으로 클릭이 완료되면서 onclick발생

```html
<head>
  <script>
    function OnButtonDown(button) {
      button.style.color = "#ff0000";
    }
    function OnButtonUp(button) {
      button.style.color = "#000";
    }
  </script>
</head>
<body>
  <button onmousedown="OnButtonDown(this) onmouseup="OnButtonUp(this)">눌러보세요!!
  </button>
</body>
```

- 마우스 버튼이 눌러지면 버튼의 색상을 빨간색으로 변경한다.
- 마우스 버튼이 떼어지면 버튼의 색상을 검정색으로 변경한다.

# 폼의 유효성 검증

<br>

# 연습문제

## 7번

- isNaN(value)
  - 주어진 value값이 NaN(Not a Number)인지 판별

## 9번

- input태그의 요소의 내용 => **value속성** 활용해야함

---
date: '2022-02-09'
title: 'CSS 개념정리'
categories: ['CSS', 'FastCampus']
summary: '패스트캠퍼스 CSS강의에 나온 CSS의 개념 및 속성 정리'
thumbnail: './images/thumbnail-css.png'
---

# css 연결

- link: 병렬
- @import: 직렬

```css
main.css

@import url("./box.css");
```

- 직렬연결의 문제점: main.css가 다 해석되기전까진 box.css파일은 index.html에 연결이 안될수도 있음!  
  -> 병렬(link)연결을 더 선호!

# 선택자

## + vs ~

- '+' : 다음 형제 요소 **"한 개"**
- '~' : 다음 형제 요소 **"모두"**

# 선택자\_가상 클래스

- 가상 선택자 -> ':' 콜론이 붙음!
- div태그는 원래 :focus 속성을 못 적용시킴
- 해결방법: tabindex = "-1" 로 가능하게 함!

```html
<div class="box" tabindex="-1"></div>
```

## :active

- 계속 클릭을 누른 상태일 때 적용됨

## :first-child, :last-child

- **"형제 요소들"** 중에서 "첫 번째 순서"일 경우에만 적용됨
- 즉, `"순서 자체"`가 첫번째여야함
- :last-child도 마찬가지! `"순서 자체"`가 마지막이여야함

```html
<div class="fruits">
  <span>딸기</span>
  <span>수박</span>
  <div>오렌지</div>
  <p>망고</p>
  <h3>사과</h3>
</div>
```

```css
.fruits div:first-child {
  color: red;
}
```

> .fruits의 자식들 중, div는 순서자체가 첫번째가 아니기 때문에 적용이 안됨!

## :nth-child(n)

- 선택자들의 형제요소 중, n번째면 선택

```html
<div class="fruits">
  <span>딸기</span>
  <span>수박</span>
  <div>오렌지</div>
  <p>망고</p>
  <h3>사과</h3>
</div>
```

```css
.fruits *:nth-child(2) {
  color: red;
}
/* span수박span
p망고p 가 선택됨 */
```

- .fruits:nth-child(2) -> 이렇게 사용하면 x
- .fruits \*:nth-child -> .fruits의 **자손들 중**, 2번째인 것 선택

## :nth-child(2n)

- JS에선 n은 **"0부터 시작"**(Zero-Based Numbering)
- 단, HTML과 CSS에선 **"1부터 시작!"** (Zero-Based가 아님!)

```html
<div class="fruits">
  <span>딸기</span>
  <span>수박</span>
  <div>오렌지</div>
  <p>망고</p>
  <h3>사과</h3>
</div>
```

```css
.fruits *:nth-child(2n) {
  color: red;
}
/* <span>수박</span>, <p>망고</p> 가 선택됨 */
```

## 부정선택자

- :not()

```html
<div class="fruits">
  <span>딸기</span>
  <span>수박</span>
  <div>오렌지</div>
  <p>망고</p>
  <h3>사과</h3>
</div>
```

```css
.fruits *:not(span) {
  color: red;
}
/* <div>오렌지</div>, <p>망고</p>, <h3>사과</h3>이 선택됨*/
```

# 선택자\_가상요소

- 가상요소선택자 -> :: 콜론 2개 사용됨

```html
<div class="box">Content!</div>
```

```css
.box::before {
  content: '앞!';
}
```

- .box요소의 `"내부 앞"`에 내용(Content)을 삽입
- **내용**을 삽입하는 선택자이므로, **content 속성**이 반드시필요!
- 추가하는 content는 inline요소임 -> block요소로 취급하고 싶으면?

```css
.box::before {
  display: block;
  content: '앞!';
}
```

- display: block; 속성을 추가하면 됨

# 속성 선택자

- 원하는 속성을 가진 태그를 선택함
- '[ ]' 대괄호를 활용!

```html
<input type="password" />
```

```css
[type='password'] {
  background-color: orange;
}
```

# 스타일 상속

- 상속되는 css속성들  
 => 글자/문자 관련 속성들 **(100% 항상 모든 글자/문자 속성은 아님 주의!)**
<div class="notice--success">
  <ul>
    <li>font-style: 글자 기울기</li>
    <li>font-weight: 글자 두께</li>
    <li>font-size: 글자 크기</li>
    <li>line-height: 줄 높이</li>
    <li>font-family: 폰트(서체)</li>
    <li>color: 글자 색상</li>
    <li>text-align: 정렬</li>
    <li>...</li>
  </ul>
</div>

## 강제상속 -> 부모의 설정값을 그대로 자식이 갖게하고 싶으면 : **inherit** 사용

```css
.parent {
  width: 200px;
  height: 200px;
  background-color: orange;
}

.child {
  width: 100px;
  height: inherit; /*부모의 height값 강제로 상속됨*/
  background-color: orange;
}
```

# 선택자 우선순위

- '\*' : 0점
- 일반태그, 가상요소 선택자 : 1점
- 클래스/가상 클래스 선택자 : 10점 ex) div.hello -> 일반 + 클래스 === 11점
- 아이디 : 100점
- 인라인으로 속성명시 : 1000점

```html
<div style="color: orange"></div>
```

- !important: 99999999999점

```css
 {
  color: red !important;
}
```

- 점수 높은 css요소가 우선순위가 높게 적용됨
- 동일한 점수면? => 더 나중에 작성한걸로 적용됨

# width, height

- width, height의 기본값: auto

# max-width/height, min-width/height

- max-width의 기본값: none
- min-width의 기본값: 0
- max-width/height : none -> 최대크기 제한x
- min-width/height : 0 -> 최소크기 0까지 가능

# em

- 1em: 기본은 16px
- 요소의 글꼴 크기 또는 조상에 따라 달라짐!

> 만약, 요소 자체의 글꼴크기랑 조상의 글꼴크기 다를때는? => 요소 자체의 글꼴 크기를 따름

# rem

- **"루트요소"의 font크기**를 따름
- html: 16px이면 이걸 따르게됨

# vw, vh

- viewport width, viewport height
- viewport(브라우저에서 보이는 화면)를 기준으로 길이가 적용됨

```css
.child {
  width: 50vw; /*viewport의 너비의 50% 만큼을 적용*/
}
```

# margin

- 기본값: 0 -> 외부여백 없음!
- margin: auto -> 브라우저가 여백을 계산

**가로(세로)너비가 있는 요소**의 `"가운데정렬"`에 용이함

- margin: 1px -> 모든방향에 적용(하나만 입력해도 적용된다 === **"단축속성"**)
- margin: 1px 2px -> 상하, 좌우
- margin: 1px 2px 3px -> 상, 중(좌,우), 하
- margin: 1px 2px 3px 4px -> 상에서부터 **시계방향** 순서

# padding

- 내부여백
- 커질수록, 요소의 크기도 커짐

# border

- border: border-width border-style border-color;
- 역시 커질수록, 요소의 크기도 덩달아 커짐
- 기본값: medium none black; -> 화면에 안보임!!
- ex) border: 10px solid black;

```css
-----------: 이런모양의 선 -> dotted(x), dashed(o);
```

# box-sizing

```css
div {
  box-sizing: border-box;
}
```

- 원래 width/height는 padding과 border과 포함된 상태에서 계산되어짐
- box-sizing: border-box; 적용하면?  
  => width/height가 padding이나 border에 영향을 받지 않음!

# overflow

- 요소의 크기 이상으로 내용이 넘쳤을 때, 보여짐을 제어하는 단축 속성

- 기본값=> overflow: visible;  
  => 넘친 내용 그대로 보여줌

- 만약 넘친부분 잘라내고 싶다?  
  => overflow: hidden;

# opacity

- 투명도를 조정
- 수치는 `"불투명도"`로 이해하면 편함!

```css
.container {
  opacity: 1;
}
```

- 불투명도가 100% => 기본값이자 아예 투명하지 않은 상태

```css
.container {
  opacity: 0.5;
}
```

- 불투명도가 50%
- 0.5 === .5 -> 앞의 0은 생략가능

# line-height

- 한줄에 대한 높이값
- line-height: 2 -> font-size의 2배수만큼 line-height가 적용됨
- line-height 적용시에, 글자는 그 line-height의 가운데 부분으로 정렬됨

# font-family

- font-family: 글꼴1, "글꼴2", ..., 글꼴계열;
- 만약에 글꼴이름에 **띄어쓰기 등 특수문자**가 포함되어 있으면?  
  => `"큰따옴표"`로 묶어줘야함!
- 글꼴계열 중, 고딕체 계열 : **sans-serif**

# font-weight

- 글자를 두껍게 지정하고 싶을땐?  
  => font-weight: 700; 또는 font-weight: bold;

# background(배경)

- 배경에 이미지 넣을때

```css
.container {
  background-image: url('경로');
}
```

> url("경로") 형식 지켜야함!

- background-size: 70px;  
  => 70크기 만큼 `"바둑판식 배열"`이 이루어짐
- background-size:
  - cover: 가로 세로 중, **큰거**에 맞춰서
  - contain: 가로 세로 중, **작은거**에 맞춰서
- background-repeat: no-repeat;  
  => 바둑판식 배열이 없어지고 딱 하나만 배치됨
- background-position: center;  
  => 그 하나가 가운데로 정렬됨
- background-attachment: fixed;  
  => 스크롤 올려도 이미지 고정되어 있음  
  => 기본값은 scroll: 스크롤과 함께 이미지도 올라감

# position

## 요소의 위치 지정 기준

- relative: 자기 자신을 기준으로
- absolute: 위치 상 부모요소를 기준으로
  => 위치상의 부모요소는 `position: relative;`가 되어있는 부분을 찾으면 됨  
  => 위로 올라가면서 결국 못찾으면 viewport를 기준으로 배치됨

- fixed: 뷰포트(브라우저)를 기준으로
  => 부모요소들이 position: relative여도 다 무시함

- static: 기준으로 지정하지 않는다!

## 요소들의 쌓임순서

1. position의 여부  
   -> position: static은 position 속성 없는거랑 마찬가지!
1. z-index의 값
1. html상에서의 순서: 나중일수록 더 높게 쌓임

## display: block; 자동부여

position: absolute; 혹은 fixed;가 지정되면, 그 요소에 `display: block;`이 자동적으로 부여됨

# flex 정렬-Container

## flex-wrap

- flex-wrap: wrap  
  => 줄바꿈이 가능해지도록 처리
- flex-wrap: no-wrap  
  => 기본값

## justify-content

- `"주 축"`의 정렬방법
- flex-start: 시작점으로 정렬
- flex-end: 끝점으로 정렬
- center: 가운데로 정렬

## align-content

- `"교차 축"`의 `"여러 줄"` 정렬 방법
- 기본값: stretch

## align-items

- `"교차 축"`의 `"한 줄"`정렬 방법
- 만약, 여러줄 있으면 각각 한줄한줄마다 적용됨
- 한줄만 있을떈 align-items가 더 효과적
- 기본값: stretch
- container안의 item요소들이 height값이 **없으면** 기본값인 auto가 적용됨  
  => 부모요소의 height에 자동적으로 맞춰짐

# flex 정렬-Items

## flex-grow

- flex-item의 **"증가"** 너비 비율
- 기본값: 0

## flex-shrink

- 기본값: 1
- flex-shrink: 0 -> 감소비율을 0으로  
  => 즉, container의 길이가 줄어듦에 따라 요소들이 찌그러지는걸 방지!

## flex-basis

- flex-item의 공간 배분전 요소안의 content들의 **기본너비**
- 기본값: auto
- 0으로 다 맞추면 요소안 content들의 너비들이 일정해짐!  
  => flex-grow있으면 그 비율에 따라서만 길이가 정해짐

# transition(전환)

```css
transition: 속성명(기본값: all) 지속시간 타이밍함수 대기시간;
```

- 지속시간 => `필수포함속성`
- 타이밍함수 === easing function  
  => cheat sheet로 종류 검색가능  
  [cheat sheet링크](https://easings.net/ko)
- 여러속성에 transition 적용하고싶다?
  => ',' 로 구분!

# transform(변환)

- transition(서서히 적용)과는 다르게, transform은 바로적용됨
- 여러 변환함수 -> 띄어쓰기로 구분!

```css
transform: perspective(500px) rotateX(45deg);
```

> perspective 원근법 함수는 **제일 앞에 작성**해야함

- perspective() : 길이가 적을수록 더 가까이서 보는 효과가 나타남

- skewX() -> 단위 : deg

## perspective 속성과 함수 차이점

```css
perspective: 600px; vs transform: perspective(600px);
```

- 속성은 `"관찰 대상의 부모"`에게 적용됨
- 속성을 관찰 대상 자체한테 하면 적용안됨..  
  -> 적용하고 싶으면 변환함수 사용해야함
- 변환함수는 `"관찰 대상 자체"`한테 적용됨

> 부모한테 적용하는게 더 선호됨

# backface-visibility

- backface-visibility: hidden  
  => **요소의 뒷면**을 보여주지 **않는다**!!

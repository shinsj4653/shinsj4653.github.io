---
date: '2022-02-15'
title: 'jQuery, Ajax, JSON'
categories: ['KU', 'WebProgramming']
summary: '학교 웹 프로그래밍 수업 중, 12주차 수업 내용정리'
thumbnail: './images/thumbnail-konkuk.png'
---

<div class="notice--success">
  <h4>12주차</h4>
  <ul>
    <li>JQuery를 이용한 이벤트 처리</li>
    <li>DOM 변경</li>
    <li>CSS조작</li>
  </ul>
</div>

# jQuery 다운로드 하지 않고 사용하는 방법

- 공개 서버로부터 네트워크를 통하여 웹 페이지를 실행할 때마다 다운로드 받을 수 있다

```html
<head>
  <script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
</head>
```

# jQuery 문장의 구조

```js
$(selector).action()
```

- $ : jQuery 라는 의미
- $대신에 jQuery라 적어도 가능함

## 일반적인 jQuery 구조

```js
$(document).ready(function () {
  // DOM이 로딩되어서 준비가 되면 작업을 시작한다.
  // 구체적으로 jQuery 메서드를 호출한다.
})
```

- 문서가 완전히 준비되었을 때, jQuery 작업을 시작해야한다.
- 생성되지도 않은 요소에 대한 처리를 하면 오류 발생
  <br>

# jQuery를 이용한 이벤트 처리

1. 요소를 마우스로 클릭 -> click 이벤트
1. 키보드의 키를 누른다 -> keypress 이벤트
1. 사용자가 입력필드에 값을 입력 -> change 이벤트

[jQuery 이벤트문서](http://api.jquery.com/category/events/)

## 이벤트 등록 방법

- 정석방법: 동적으로 추가되는 요소는 이런식으로 처리

```js
$('#div1').bind('click', function () {
  // function() 내용
})
```

- 단축 메서드 방법 : 이미 DOM트리 안에 요소가 생성되어 있을때만 가능!

```js
$('#div1').click(function () {
  // function() 내용
})
```

## 마우스 이벤트

- mouseenter: 요소 안으로 마우스 진입
- mouseleave: 요소 밖으로 마우스 빠져나감
- mousedown: 왼쪽 마우스 버튼이 눌러지면 발생
- mouseup: 왼쪽 마우스 버튼이 떼어지면 발생
- mouseover: 마우스가 특정 요소 위에 있으면 발생

## foucs, blur

- focus: 입력필드가 키보드 포커스를 얻으면 발생
- blur: 입력필드가 키보드 포커스를 잃으면 발생
  <br>

## 하나의 요소에 여러개의 이벤트 적용

```js
$('div').on({
  mouseenter: function () {
    console.log('hovered over a div')
  },
  mouseleave: function () {
    console.log('mouse left a div')
  },
  click: function () {
    console.log('clicked on a div')
  },
})
```

<br>

# jQuery를 이용한 애니메이션 효과

## show(), hide()

```js
$(selector).show(duration, complete)
// duration: slow, fast, 또는 밀리초 단위 지정 가능
// complete: 콜백함수, show()가 완료된 후에 호출되는 메서드 지정
```

```js
$(document).ready(function () {
  $('button').click(function () {
    $('#dog').show('slow')
  })
})
```

- 버튼이 클릭되면 이미지가 **느리게** 나타난다.

## toggle()

- 요소가 감추어져 있으면 표시하고, 표시되어 있으면 감춘다.

```js
$(document).ready(function () {
  $('button').click(function () {
    $('#dog').toggle()
  })
})
```

## animate()

- 어디로나 **위치 이동**가능 & 어떤 **효과**도 가능
- css 속성을 변경해서 애니메이션을 만듬

```js
$(selector).animate(properties, duration, easing, complete)
```

- duration -> speed는 'slow', 'fast', 또는 밀리초 단위로 지정가능

- 예시

```js
$('#dog').animate({
  left: '100px',
  opacity: '0.5',
  width: '150px',
})
```

- **여러가지의 속성** 부여 가능

## stop()

- 모든 애니메이션을 중간에 중단하기 위한 함수

## fadeIn(), fadeOut()

- 천천히 등장하게 하거나, 빠르게 등장하게 할 수 있다.

```js
$(selector).fadeIn(duration, complete)
// duration -> slow, fast, 또는 밀리초 단위로 지정가능
// complete -> fadeIn이 완료된 후에 호출되는 콜백함수 지정
```

## slideUp(), slideDown()

- 요소를 밀어올리거나, 밀어내린다.

```js
$(selector).slideUp(duration, complete)
// duration -> slow, fast, 또는 밀리초 단위로 지정가능
// complete -> fadeIn이 완료된 후에 호출되는 콜백함수 지정
```

## 메서드 체이닝

- 동일한 요소에 대한 여러 개의 메서드를 하나로 연결해서 실행가능
- 여러 애니메이션을 한번에 적용가능

```js
$(document).ready(function () {
  $('button').click(function () {
    $('div').show().fadeOut('slow').slideDown('slow')
  })
})
```

# jQuery를 이용한 DOM 변경

## 요소의 콘텐츠 **가져오기**

### text() vs html()

- text()는 단순히 텍스트만을 가져옴
- html()은 포함된 태그까지 다 가져옴

## 요소의 콘텐츠 **변경하기**

- 원하는 컨텐츠를 **인수로 전달**

```js
$('#target').text('안녕하세요?')
```

- id가 target인 요소의 text를 안녕하세요?로 바꿔준다.
- 만약 html 태그가 들어가 있는 문장을 인수로 활용한다면?

```js
$('#target').html('<b>안녕하세요?<b>')
```

## 입력 필드의 값 읽어오기

### val()

> value()가 아니라 val()임!

- 가져오기 및 입력 필드 값 직접 변경도 가능

```js
$('#target').val('다시 입력하세요!')
```

## 요소의 속성 가져오기

- img 태그의 src속성 가져오려면?

```js
$('#target').attr('src')
// 'dog.png'
```

=> 즉 이미지의 **파일 이름**을 가져온다.

- 만약 속성의 값 변경하고 싶으면?

```js
$('#dog').attr('alt', 'Best Dog')
```

- #dog 요소의 alt속성의 값을 Best Dog으로 바꿔줌

## DOM 요소 추가하기

### append()

- 선택된 노드의 **마지막 자식 노드**로 새로운 노드 추가

### after()

- 선택된 노드의 **형제 노드**로 새로운 노드 추가

```js
$(document).ready(function () {
  $('#append').click(function () {
    $('#target').append('<p>newAppend</p>')
  })
  $('#after').click(function () {
    $('#target').after('<p>newAfter</p>')
  })
})
```

- append()는 #target요소의 **마지막 자식 위치**에 새로 노드 추가
- after()는 #target요소 **그 다음 위치**에 새로 노드 추가(형제 위치)

> 주의! HTML내의 선택된 요소에 모두 적용됨!

## 콘텐츠 삭제하기

### remove()

- 선택된 요소와 그 자식 요소를 모두 삭제

### empty()

- 선택의 요소의 자식 요소만 삭제

# jQuery를 이용한 CSS조작

## css()

- 선택된 요소의 css속성의 **값**을 가져오려면?

```js
$('#target').css('color')
```

- 선택된 요소의 css속성을 지정하거나 변경하려면?

```js
$('#target').css('color', 'blue')
```

## addClass(), removeClass()

- 특정 클래스를 추가 혹은 삭제 가능
- 그 클래스에 대한 내용은 css에 미리 정의되어 있어야함

## 요소의 크기 알기

- width(), height()
- 가로, 세로 크기는 padding, border, margin을 제외한 값이 return된다.
- 값을 변경하고 싶으면 파라미터에 값 넣으면 됨

```js
$('div').click(function () {
  $(this).width(modWidth).addClass('next')
  modWidth -= 8
})
```

- 버튼이 눌릴때마다 요소의 너비를 줄인다.

# jQuery에 대한 참고 문헌

[참고문헌 링크](http://api.jquery.com/)

# JSON

- [JS] JS 데이터 실습 - JSON 부분 참고

# Ajax

```js
$.ajax()
```

- 클라이언트와 서버가 페이지 새로고침 없이 데이터를 주고받도록 구현하는 방식

## 기본구문

```js
$.ajax({
  type: 'get', // 메소드(get, post, put 등) -> http 타입
  url: './news_2020.txt', // request보낼 서버 경로 -> 호출 url
  data: { id: 'admin' }, // url 호출시 보낼 파라미터 데이터
  dataType: 'json', // http 통신 후 응답 데이터 타입
  success: function (data) {
    // 서버로부터 정상적으로 응답이 왔을때
    // json의 경우는 data는 "파싱된 결과"
    $.each(data, function (index, item) {
      // jQuery의 반복문
    })
  },
  error: function (err) {
    // 서버로부터 응답이 정상적으로 처리되지 못했을 때 실행
  },
})
```

## $.each(data, function(index, item))

- jQuery의 반복문
- 첫번째 인자로 index를 주고, 두번째 인자로 item(콜백함수)를 준다.
- index를 기준으로 반복함
- 키값을 활용하여 `item.키값` 형태로 value를 가져온다.

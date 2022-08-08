---
date: '2022-02-05'
title: 'MarkDown 문법정리'
categories: ['MarkDown']
summary: '자주 사용할 마크다운 문법들 정리 및 참고사이트 링크 첨부'
thumbnail: './images/thumbnail_md.svg'
---

**[MarkDown 사용법 총정리 링크](https://heropy.blog/2017/09/30/markdown/)**

# 제목(Header)

# 제목 1

## 제목 2

### 제목 3

# 문장(Paragraph)

동해물과 백두산이 마르고 닳도록
하느님이 보우하사 우리나라 만세

# 줄바꿈(Line Breaks)

동해물과 백두산이 마르고 닳도록 <br/>
하느님이 보우하사 우리나라 만세

# 강조(Emphasis)

_이텔릭_<br/>
**두껍게**  
**_이텔릭 + 두껍게_**  
~~취소선~~  
<u>밑줄</u>

# 목록(List)

1. 순서가 필요한 목록
1. 순서가 필요한 목록
1. 순서가 필요한 목록
   1. 순서가 필요한 목록
   1. 순서가 필요한 목록
1. 순서가 필요한 목록
1. 순서가 필요한 목록

- 순서가 필요하지 않은 목록
- 순서가 필요하지 않은 목록
- 순서가 필요하지 않은 목록
  - 순서가 필요하지 않은 목록
  - 순서가 필요하지 않은 목록
- 순서가 필요하지 않은 목록

# 링크(Links)

<a href="https://google.com">Google</a>

[Google](https://google.com)

<a href="https://naver.com" title="NAVER로 이동!">Naver</a>

[Naver](https://naver.com 'NAVER로 이동!')

<a href="https://naver.com" title="NAVER로 이동!" target="_blank">Naver</a>

# 이미지(Images)

![]()

![HEROPY](https://heropy.blog/css/images/logo.png)

[![HEROPY](https://heropy.blog/css/images/logo.png)](https://heropy.blog/)

# 인용문(BlockQuote)

> 남의 말이나 글에서 직접 또는 간접으로 따온 문장  
> (네이버 국어사전)

> 인용문을 작성하세요!
>
> > 중첩된 인용문
> >
> > > 중중첩된 인용문 1
> > > 중중첩된 인용문 2
> > > 중중첩된 인용문 3

# 인라인 (inline) 코드 강조

CSS 에서 `background` 혹은 `background-image` 속성으로 요소에 배경 이미지를 삽입할 수 있습니다.

# 블럭(block) 코드 강조

```html
<a href="https://google.com" target="_blank">Google</a>
```

```css
.list > li {
  position: absolute;
}
```

```javascript
function func() {
  var a = 'AAA'
  return a
}
```

```bash
$ git commit -m 'Study Markdown'
```

```plaintext
동해물과 백두산이 마르고 닳도록
하느님이 보우하사 우리나라 만세
```

# 표(Table)

position 속성

| 값       |       의미        | 기본값 |
| -------- | :---------------: | -----: |
| static   |     기준 없음     |      O |
| relative |     요소 자신     |      X |
| absolute | 위치 상 부모 요소 |      X |
| fixed    |      뷰포트       |      X |

# 원시 HTML(Raw HTML)

동해물과 <span style="text-decoration: underline;">백두산이</span> 마르고 닳도록<br/>
하느님이 보우하사 우리나람 만세

<a href="https://google.com" target="_blank">Google</a>

---

<img width="70" src="https://heropy.blog/css/images/logo.png" alt="HEROPY" /></img>

# 수평션(Horizontal Rule)

---

---

---

---
date: '2022-08-12'
title: '블로그 기능 추가 1 - toTop 버튼, 다크모드'
categories: ['Gatsby', 'JavaScript']
summary: '블로그에 toTop 버튼과 다크모드 기능을 어떻게 적용했는지 정리'
thumbnail: './images/thumbnail-gatsby.png'
---

# 상단 이미지 안뜨는 문제

다크모드를 적용한 결과, PostHead 부분의 BackgroundImage가 안보이는 오류가 발생하였다. 처음에는 render가 안되는 오류인줄 알았지만, 알고보니 `z-index값이 -1`이여서 생긴 오류였다. 이미지의 z-index값을 올리고, 뒤로가기 버튼 및 PostHeadInfo 부분의 내용들의 z-index값을 더 높이 올려서 문제를 해결할 수 있었다.

# toTop 버튼 구현 중 생긴 문제

FastCampus 프론트엔드 강의를 들으면서 starbucks 사이트를 클론코딩하면서 공부를 했었던 적이 있었다. 거기서 배운 toTop 버튼 개념을 여기서도 활용해보려 했지만, 문제는 클론코딩하면서 썼던 gsap과 ScrollToPlugin를 가져오지 못하여서 구현하는데 어려움이 있었다.
<br/><br/>
여러 사이트들을 돌아다니면서 찾았던 해결방법은 바로 `window.pageYOffset`속성을 활용하는 것이었다. TopBtn 컴포넌트에 showBelow값을 props로 줌으로써, 그 값보다 더 아래의 좌표값까지 스크롤을 한 상태면 toTop 버튼이 보이게 끔 구현을 하였다.

# 참고사이트

- [다크모드 참고링크 1](https://javascript.plainenglish.io/how-to-add-dark-mode-to-a-gatsby-site-2638fc841038)

- [다크모드 참고링크 2](https://www.gatsbyjs.com/plugins/gatsby-plugin-dark-mode/)

- [toTop버튼 참고링크](https://juliapottinger.com/react-gatsby-scroll-to-top/)

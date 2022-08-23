---
date: '2022-08-24'
title: 'React - Voca 단어장 만들기 & TS 적용'
categories: ['React', 'TypeScript', 'CodingAngma']
summary: '코딩앙마님의 React 강의를 들으면서 배운 내용을 정리해보았다.'
thumbnail: './images/thumbnail-react.jpeg'
---

React의 라우터 개념, 커스텀 Hooks, Rest API에 대한 개념을 복습하고, React 프로젝트에 TypeScript를 어떤 방식으로 적용하는지 배우기 위해 강의를 들었고 들으면서 도움이 되거나 어려웠던 내용을 정리해보았다.

# REST API

`URI 정보` 를 이용하여 서버에 요청을 보내는 것이라 이해를 하였다.  
총 4가지의 요청이 있는데 다음과 같다.

- Create: POST
- Read: GET
- Update: PUT
- DeletE: DELETE

# 다이나믹한 URL에 대한 path 설정

이번 프로젝트의 단어장은 어느 Day인지에 따라 다른 결과를 보여줘야 한다. 각 Day를 누르면 그 Day에 해당하는 단어들을 보여주는 페이지로 넘어가게 처리를 해야하므로, `":"` 콜론을 이용하면 된다.

```js
<Route path="/day/:day" element={<Day />} />
```

이렇게 설정하면 Day 컴포넌트에서 day 라는 변수로 날짜 값을 읽는 것이 가능해진다. 또한, react-router-dom 라이브러리의 `useParams()` 라는 Hooks를 활용하여 day 값을 읽는 것도 가능하다.

```js
import { useParams } from 'react-router-dom'

const { day } = useParams()
const wordList = dummy.words.filter(word => word.day === day)
```

이런식으로 url에 들어있는 파라미터 정보를 활용할 수 있다.

# JS -> TS

useRef() 와 같은 Hooks를 이용할 때, `Generics` 를 통해 타입을 지정해주면 된다.

```ts
const engRef = useRef<HTMLInputElement>(null)
```

props의 타입 역시 지정해주는 것을 잊으면 안된다. 그리고 객체에 대한 타입은 인터페이스, 혹은 type으로 지정을 해주면 된다.

```ts
export interface IDay {
  id: number
  day: number
}

interface IProps {
  word: IWord
}

export interface IWord {
  day: string
  eng: string
  kor: string
  isDone: boolean
  id: number
}
```

# 첫 번째 오류

react router를 사용하여 여러 페이지를 만들면서 오류가 발생하였다.

> (property) exact: true '{ children: Element; exact: true; path: string; }' 형식은 'IntrinsicAttributes & (PathRouteProps | LayoutRouteProps | IndexRouteProps)' 형식에 할당할 수 없습니다.
> property 'exact' does not exist on type 'intrinsicattributes & (pathrouteprops | layoutrouteprops | indexrouteprops)’

밑 코드와 같이 Route에 exact 속성을 넣어주니까 위와 같은 오류가 발생을 하였다. 검색을 해보니, react router v6 로 업데이트 된 후로 exact 속성을 넣어줄 필요가 없어졌다고 한다.

# 두 번째 오류

잘못된 URL에 접속을 하게 되면 404 페이지를 띄어주기로 했다. 하지만 404 페이지에 대한 경로 설정을 어떻게 해야할지 고민이었다. 따로 지정된 path가 아닌, 잘못된 url에 대한 path를 설정해주려면 다음과 같이 작성해주면 된다.

```js
<Route path="/*" element={<EmptyPage />} />
```

# 참고링크

- [코딩앙마 - React JS 강좌](https://www.youtube.com/watch?v=05uFo_-SGXU&list=PLZKTXPmaJk8J_fHAzPLH8CJ_HO_M33e7-&index=1)
- [react router - exact 속성오류](https://stackoverflow.com/questions/69866581/property-exact-does-not-exist-on-type)
- [404 페이지에 대한 path 설정](https://yoogomja.github.io/2020/04/29/reactjs-nested-route-404/)

---
date: '2022-08-11'
title: 'Redux 개념정리'
categories: ['Redux']
summary: 'Redux 개념을 공부하기 위해 코딩애플 Redux 강의를 정리해보았다.'
thumbnail: './images/thumbnail-redux.jpg'
---

# Redux 쓰는 이유

## 1. 모든 component가 props 없이 state를 직접 꺼낼 수 있다.

하나의 **store.js**에서 state를 정의하고 나머지 component에서 그 store.js에 있는 state를 가져오는 방식이여서, props를 사용할 필요가 없다.

```js
// index.js
import { Provider } from 'react-redux'
import { createStore } from 'redux'

function reducer(state = 체중, action) {
  return state
}

let store = createStore(reducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
```

위와 같은 코드처럼 초기 세팅을 한다음,

```js
// App.js

import { useSelector } from 'react-redux'

function App() {
  const 꺼내온거 = useSelector(state => state)

  return (
    <div className="App">
      <p>몸무게: {꺼내온거}</p>
    </div>
  )
}
```

위 코드처럼 useSelector를 이용하여 state를 꺼내와서 쓸 수 있다.

## 2. 상태관리가 용이하다.

만약, 여러 component에서 state를 사용하다가 store.js에서 state값이 오류가 나는 경우가 있을 수 있다.  
예를 들어, store.js에 `몸무게`라는 변수가 있었는데 갑자기 number 타입에서 string 타입으로 바뀌는 오류가 발생하면, 어느 component에서 오류를 냈는지 확인해야하는데, component가 너무 많으면 시간이 오래걸린다.

```js
// index.js

function reducer(state = 체즁, action) {
  if (action.type === '증가') {
    state++
    return state
  } else if (action.type === '감소') {
    state--
    return state
  } else {
    return state
  }
}
```

위 문제점을 해결하기 위해, state를 수정할 수 있는 방법을 미리 정의한다. 그러면 state가 잘못된 type으로 되는 등의 문제가 발생하면, 범인은 무조건 그 reducer를 정의한 곳이 되어서 일일히 component를 뒤질 필요가 없어진다.

```js
// App.js

import { useDispatch, useSelector } from 'react-redux'

function App() {
  const 꺼내온거 = useSelector(state => state)
  const dispatch = useDispatch()

  return (
    <div className="App">
      <p>몸무게: {꺼내온거}</p>
      <button
        onClick={() => {
          dispatch({ type: '증가' })
        }}
      >
        +
      </button>
    </div>
  )
}
```

미리 수정할 수 있는 방법들을 정의를 해둔다면, 컴포넌트에서는 그 state를 수정해달라고 `요청`만 하면 된다.

[참고영상](https://www.youtube.com/watch?v=QZcYz2NrDIs&t=71s)

---
date: '2022-08-20'
title: 'Redux 내용정리 - Velopert'
categories: ['Redux', 'Velopert']
summary: 'Velopert님께서 작성하신 Redux글을 정리해보았다.'
thumbnail: './images/thumbnail-redux.jpg'
---

# Redux Keywords

## 액션 (Action)

상태에 변화가 필요할 때 `액션`을 발생시켜야 한다.  
액션은 하나의 `객체`로 표현이 된다.

```js
{
  type: 'TOGGLE_VALUE'
}
```

액션 객체는 `type` 필드를 필수적으로 가지고 있어야하고, 그 외의 값들은 따로 지정해주면 된다.

```js
{
  type: "ADD_TODO",
  data: {
    id: 0,
    text: "리덕스 배우기"
  }
}
```

## 액션 생성함수 (Action Creator)

액션을 만드는 함수이다. 파라미터를 받아와서 액션 객체 형태로 만들어준다.

```js
export function addTodo(data) {
  return {
    type: 'ADD_TODO',
    data,
  }
}
```

화살표 함수로도 표현이 가능하다.

```js
export const changeInput = text => ({
  type: 'CHANGE_INPUT',
  text,
})
```

액션 생성함수를 사용하는 이유는 나중에 컴포넌트에서 액션을 쉽게 발생시키기 위함이다.

## 리듀서 (Reducer)

변화를 일으키는 함수이다. `현재의 상태`와 `전달 받은 액션`을 파라미터로 받아서, `새로운 상태`를 만들어서 반환한다.

```js
function counter(state, action) {
  switch (action.type) {
    case 'INCREASE':
      return state + 1
    case 'DECREASE':
      return state - 1
    default:
      return state
  }
}
```

## 스토어 (Store)

리덕스에서는 한 어플리케이션당 하나의 스토어를 만들게 된다. 스토어 안에는 현재의 앱 상태와 리듀서가 들어가있고, 추가적으로 몇가지 내장 함수들이 있다.

## 디스패치 (Dispatch)

스토어의 내장 함수중 하나이다. 액션을 발생시키는 것이라고 할 수 있다. dispatch 함수에는 액션을 파라미터로 전달한다.  
호출을 하게되면, 스토어는 리듀서 함수를 실행시켜서 해당 액션을 처리하는 로직이 있다면 액션을 참고하여 새로운 상태를 만들어준다.

## 구독 (subscribe)

디스패치와 마찬가지로 스토어의 내장 함수 중 하나이다. subscribe 함수에 특정 함수를 파라미터로 전달해주면, 액션이 디스패치 될 때마다 그 전달해준 함수가 호출이 된다.
리액트에서 리덕스를 사용할 때는 subscribe 보다는 react-redux 라이브러리에서 제공하는 `connect`함수 또는 `useSelector`라는 Hook을 더 많이 사용한다.

# 리덕스의 3가지 규칙

## 하나의 어플리케이션 안에는 하나의 스토어가 존재한다.

여러개의 스토어를 사용하는 것은 권장되지 않는다.  
특정 업데이트가 너무 빈번하게 일어날때는 여러개의 스토어를 만들 순 있긴 하지만, 이렇게 되면 개발 도구를 활용하지 못하게 된다.

## 상태는 읽기전용이다.

리덕스에서 불변성을 유지해야하는 이유는 내부적으로 데이터가 변경 되는 것을 감지하기 위하여 `shallow comparison(얕은 비교)`를 하기 때문이다. 이를 통해 객체의 변화를 감지할 때 객체의 깊숙한 안쪽까지 비교하는 것이 아니라 겉핥기 식으로 비교를 하여 `좋은 성능을 유지`할 수 있다.

[참고링크: React의 불변성](https://velopert.com/3486)

## 변화를 일으키는 함수, 즉 리듀서는 순수한 함수여야 한다.

- 리듀서 함수는 이전 상태와 액션 객체를 파라미터로 받는다.

- 이전의 상태는 절대 건들이지 않고 변화를 일으킨 새로운 상태 객체를 만들어서 반환해야 한다.

- 톡같은 파라미터로 호출된 리듀서 함수는 `언제나` 똑같은 결과를 반환해야 한다.  
  동일한 인풋이라면 언제나 동일한 아웃풋이 있어야 한다.

# 리덕스 사용하는 법

우선 본인의 프로젝트에 redux 라이브러리르 설치한다.

```bash
yarn add redux
```

전체적인 코드 구성은 다음과 같다. 상세 설명은 주석을 참고하면 된다.

```js
import { createStore } from 'redux'

// createStore는 스토어를 만들어주는 함수이다.
// 리액트 프로젝트에서는 단 하나의 스토어를 만든다.

/* 리덕스에서 관리 할 상태 정의 */
const initialState = {
  counter: 0,
  text: '',
  list: [],
}

/* 액션 타입 정의 */
// 액션 타입은 주로 대문자로 작성한다.
const INCREASE = 'INCREASE'
const DECREASE = 'DECREASE'
const CHANGE_TEXT = 'CHANGE_TEXT'
const ADD_TO_LIST = 'ADD_TO_LIST'

/* 액션 생성함수 정의 */
// 액션 생성함수는 주로 camelCase 로 작성한다.
function increase() {
  return {
    type: INCREASE, // 액션 객체에는 type 값이 필수
  }
}

// 화살표 함수로 작성하는 것이 더욱 코드가 간단하기에,
// 이렇게 쓰는 것을 추천
const decrease = () => ({
  type: DECREASE,
})

const changeText = text => ({
  type: CHANGE_TEXT,
  text, // 액션안에는 type 외에 추가적인 필드도 작성가능
})

const addToList = item => ({
  type: ADD_TO_LIST,
  item,
})

/* 리듀서 만들기 */
// 위 액션 생성함수들을 통해 만들어진 객체들을 참조하여
// 새로운 상태를 만드는 함수를 만들어야 한다.
// 주의: 리듀서에서는 불변성을 꼭 지켜줘야 한다.

function reducer(state = initialState, action) {
  // state 의 초깃값을 initialState 로 지정
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        counter: state.counter + 1,
      }
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      }
    case CHANGE_TEXT:
      return {
        ...state,
        text: action.text,
      }
    case ADD_TO_LIST:
      return {
        ...state,
        list: state.list.concat(action.item),
      }
    default:
      return state
  }
}

/* 스토어 만들기 */
const store = createStore(reducer)

console.log(store.getState()) // 현재 store 안에 들어있는 상태를 조회합니다.

// 스토어안에 들어있는 상태가 바뀔 때 마다 호출되는 listener 함수
const listener = () => {
  const state = store.getState()
  console.log(state)
}

const unsubscribe = store.subscribe(listener)
// 구독을 해제하고 싶을 때는 unsubscribe() 를 호출하면 된다.

// 액션들을 디스패치
store.dispatch(increase())
store.dispatch(decrease())
store.dispatch(changeText('안녕하세요'))
store.dispatch(addToList({ id: 1, text: '와우' }))
```

# 리덕스 모듈 만들기

리액트 프로젝트에 리덕스를 적용하기 위한 리덕스 모듈을 만드는 방법을 작성해보았다.  
리덕스 모듈에는 다음 항목들이 모두 들어가있는 js 파일을 의미한다.

- 액션 타입
- 액션 생성함수
- 리듀서

리듀서와 액션 관련 코드들을 하나의 파일에 몰아서 작성하는 방식을 연습해보았다. 이를 `Ducks 패턴`이라고 부른다.  
보통 src 디렉터리에 modules 폴더를 생성하고, 그 안에 js 파일을 만들어준다.

## todos 모듈 만들기

todoList를 위한 todos 모듈을 작성해보았다.

```js
// modules/todos.js

/* 액션 타입 선언 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사 넣기
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지할 수 있다.

const ADD_TODO = 'todos/ADD_TODO'
const TOGGLE_TODO = 'todos/TOGGLE_TODO'

/* 액션 생성함수 선언 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내기
let nextId = 1 // todo 데이터에서 사용 할 고유 id
export const addTodo = text => ({
  type: ADD_TODO,
  todo: {
    id: nextId++, // 새 항목을 추가하고 nextId 값에 1을 더해준다.
    text,
  },
})
export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id,
})

/* 초기 상태 선언 */
// 리듀서의 초기 상태는 꼭 객체타입일 필요는 없다.
// 배열이여도 되고, 원시 타입 (숫자, 문자열, boolean) 이여도 상관 없다.
const initialState = [
  /* 다음과 같이 구성된 객체를 이 배열 안에 넣을 것이다.
  {
    id: 1,
    text: '예시',
    done: false
  } 
  */
]

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내기
export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat(action.todo)
    case TOGGLE_TODO:
      return state.map(
        todo =>
          todo.id === action.id // id 가 일치하면
            ? { ...todo, done: !todo.done } // done 값을 반전시키고
            : todo, // 아니라면 그대로 둠
      )
    default:
      return state
  }
}
```

## 루트 리듀서

만약 한 프로젝트에 여러개의 리덕스가 있을 때는 이를 한 리듀서로 합쳐서 사용을 해주면 된다.  
합쳐진 리듀서를 `루트 리듀서`라 한다.  
리덕스 라이브러리의 `combineReducers`를 사용해주면 된다. 보통 modules 폴더안에 index.js를 만들어서 사용한다.

```js
// modules/index.js

import { combineReducers } from 'redux'
import counter from './counter'
import todos from './todos'

const rootReducer = combineReducers({
  counter,
  todos,
})

export default rootReducer
```

# 리액트 프로젝트에 리덕스 적용하기

리액트 프로젝트에 리덕스를 적용하려면, `react-redux` 라이브러리를 설치해주어야 한다.

```bash
yarn add react-redux
```

그 다음에, index.js에서 Provider라는 컴포넌트를 불러와서 App 컴포넌트를 감싸주면 된다. 그리고 props에 store를 넣어주면 된다.

```js
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './modules'

const store = createStore(rootReducer) // 스토어를 만든다.

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
```

위 코드처럼 세팅하면 그 어떤 컴포넌트여도 리덕스 스토어에 접근이 가능해진다.

# 프레젠테이셔널 & 컨테이너 컴포넌트

리액트에서 리덕스를 사용할 때 리덕스 모듈, 프레젠테이셔널 컴포넌트, 그리고 컨테이너 컴포넌트, 총 3개의 부분으로 나누어서 구현을 해준다. 이러한 패턴은 리덕스의 창시자 Dan Abramov에 의해 만들어졌다.

## 프레젠테이셔널 컴포넌트

리덕스 스토에 직접적으로 접근하지 않고 필요한 값 또는 함수를 props로만 받아와서 사용하는 컴포넌트이다.  
예시로 TodoList의 TodoItem, TodoList, Todos 총 3가지의 컴포넌트를 작성해보았다.

```js
// components/Todos.js

import React, { useState } from 'react'

// 컴포넌트 최적화를 위하여 React.memo를 사용
const TodoItem = React.memo(function TodoItem({ todo, onToggle }) {
  return (
    <li
      style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
      onClick={() => onToggle(todo.id)}
    >
      {todo.text}
    </li>
  )
})

// 컴포넌트 최적화를 위하여 React.memo를 사용
const TodoList = React.memo(function TodoList({ todos, onToggle }) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ul>
  )
})

function Todos({ todos, onCreate, onToggle }) {
  // 리덕스를 사용한다고 해서 모든 상태를 리덕스에서 관리해야하는 것은 아니다.
  const [text, setText] = useState('')
  const onChange = e => setText(e.target.value)
  const onSubmit = e => {
    e.preventDefault() // Submit 이벤트 발생했을 때 새로고침 방지
    onCreate(text)
    setText('') // 인풋 초기화
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={text}
          placeholder="할 일을 입력하세요.."
          onChange={onChange}
        />
        <button type="submit">등록</button>
      </form>
      <TodoList todos={todos} onToggle={onToggle} />
    </div>
  )
}

export default Todos
```

## 컨테이너 컴포넌트

리덕스 스토어의 상태를 조회하거나, 액션을 디스패치 할 수 있는 컴포넌트를 의미한다. 또한 HTML 태그를 사용하지 않고 다른 프레젠테이셔널 컴포넌트들을 불러와서 사용하는 곳이다.  
예시로 TodoList의 TodosContainer.js를 만들어보았다.

```js
// container/TodosContainer.js

import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Todos from '../components/Todos'
import { addTodo, toggleTodo } from '../modules/todos'

function TodosContainer() {
  // useSelector 에서 꼭 객체를 반환 할 필요는 x
  // 한 종류의 값만 조회하고 싶으면 그냥 원하는 값만 바로 반환하면 됨.
  const todos = useSelector(state => state.todos)
  const dispatch = useDispatch()

  const onCreate = text => dispatch(addTodo(text))
  const onToggle = useCallback(id => dispatch(toggleTodo(id)), [dispatch]) // 최적화를 위해 useCallback 사용

  return <Todos todos={todos} onCreate={onCreate} onToggle={onToggle} />
}

export default TodosContainer
```

# 리덕스 개발자도구

개발자 도구를 사용하면 현재 스토어의 상태를 개발자 도구에서 조회할 수 있고 지금까지 어떤 액션들이 디스패치 되었는지, 그리고 액션에 따라 상태가 어떻게 변화했는지 확인 가능하다.

개발자 도구를 사용하기 위해서는 먼저 [크롬 웹 스토어](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)에서 확장 프로그램을 설치해준다.  
그 다음엔 프로젝트에 `redux-devtools-extension`을 설치해준다.

```bash
yarn add @redux-devtools/extension
```

설치한 후, index.js를 다음과 같이 수정해주면 된다.

```js
// index.js

import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './modules'
import { composeWithDevTools } from 'redux-devtools-extension' // 리덕스 개발자 도구

const store = createStore(rootReducer, composeWithDevTools()) // 스토어를 만든다.
// composeWithDevTools 를 사용하여 리덕스 개발자 도구 활성화

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
```

# useSelector 최적화

TodoList를 만들때 프레젠테이션 컴포넌트에 있는 TodoItem과 TodoList 컴포넌트는 React.memo를 사용하여 리렌더링 최적화를 헤주었다. 컨테이너 컴포넌트에서는 어떤 것들을 검토해야 하는지 공부해보았다.  
기본적으로, useSelector를 사용하여 리덕스 스토어의 상태를 조회할 땐 만약 상태가 바뀌지 않으면 리렌더링 하지 않는다.

```js
// TodosContainer.js

const todos = useSelector(state => state.todos)
```

TodosContainer에 있는 위 코드의 경우, todos의 값이 바뀌지 않으니까 리렌더링 되지 않는다.

```js
// CounterContainer.js

const { number, diff } = useSelector(state => ({
  number: state.counter.number,
  diff: state.counter.diff,
}))
```

만약 CounterContainer의 위 코드처럼, useSelector를 사용할 때마다 매번 새로운 객체를 만들기 때문에 상태가 변한다고 인식하여 매번 리랜더링이 발생한다.  
이를 최적화 하기 위해서는 두가지의 방법이 존재한다.

## 1. useSelector를 여러번 사용하는 것이다.

```js
const number = useSelector(state => state.counter.number)
const diff = useSelector(state => state.counter.diff)
```

이렇게 작성하면 해당 값 중 확실하게 변하는 값이 있을 때에만 컴포넌트가 리렌더링 된다.

## 2. react-redux의 shallowEqual 함수를 useSelector의 두번째 인자로 전달해준다.

```js
import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease, setDiff } from '../modules/counter';

function CounterContainer() {
  // useSelector는 리덕스 스토어의 상태를 조회하는 Hook이다.
  // state의 값은 store.getState() 함수를 호출했을 때 나타나는 결과물과 동일함
  const { number, diff } = useSelector(
    state => ({
      number: state.counter.number,
      diff: state.counter.diff
    }),
    shallowEqual
  );

  (...)
```

useSelector의 두번째 파라미터는 `eqaulityFn`이다.

```ts
equalityFn?: (left: any, right: any) => boolean
```

이전 값과 다음 값을 비교하여 true가 나오면 리렌더링을 하지 않고 false가 나오면 리렌더링을 해준다.  
`shallowEqual`은 react-redux에 내장되어있는 함수로서, 객체 안의 `가장 겉에 있는 값들`을 모두 비교해준다.

```js
const object = {
  a: {
    x: 3,
    y: 2,
    z: 1,
  },
  b: 1,
  c: [{ id: 1 }],
}
```

위 코드에서 가장 겉에 있는 값은 `object.a, object.b, object.c`이다.  
object.a.x 또는 object.c[0]의 값은 비교하지 않는다.

# 참고링크

- [Velopert - Redux](https://react.vlpt.us/redux/)

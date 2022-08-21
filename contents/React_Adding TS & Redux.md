---
date: '2022-08-22'
title: 'React - Applying TS & Redux'
categories: ['React', 'TypeScript', 'Redux', 'Velopert']
summary: 'React에 TS 및 Redux 적용하는 방법 정리'
thumbnail: './images/thumbnail-react.jpeg'
---

Velopert 님의 글 중, 리액트 프로젝트에 타입스크립트를 사용하는 방법과 타입스크립트에서 리덕스를 사용하는 방법을 정리해보았다.

# 리액트 프로젝트에 타입스크립트 사용하기

## 프로젝트 생성

타입스크립트를 사용하는 리액트 프로젝트를 만들때는 다음과 같은 명령어를 사용해야 한다.

```bash
npx create-react-app project_name --template typescript
```

`typescript`라는 옵션이 있으면 타입스크립트 설정이 적용된 프로젝트가 생성된다.  
생성된 후, `App.tsx`파일을 열어보면 다음과 같다.

```ts
import React from 'react'
import logo from './logo.svg'
import './App.css'

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
```

위 코드처럼 `화살표 함수` 를 사용하여 컴포넌트를 선언하여도 무방하다. 리액트 공식문서나 해외의 유명 개발자들은 보통 `function` 키워드를 사용하여 함수형 컴포넌트를 사용하는 추세이긴 하다.

## 새로운 컴포넌트 만들기

Greetings 라는 새로운 컴포넌트를 만들어보았다.

```ts
// src/Greetings.tsx
import React from 'react'

type GreetingsProps = {
  name: string
}

const Greetings: React.FC<GreetingsProps> = ({ name }) => (
  <div>Hello, {name}</div>
)

export default Greetings
```

`React.FC` 를 사용할 때는 `props의 타입을 Generics` 로 넣어서 사용을 한다. 이렇게 React.FC 를 사용해서 얻을 수 있는 장점은 두가지가 있다.  
첫번째는 props에 기본적으로 `children` 이 들어가 있다는 것이다. props가 들어가는 중괄호 부분 안에서 Ctrl + Space 를 눌러보면 확인가능하다.  
두번째는 컴포넌트의 defaultProps, propTypes, contextTypes를 설정할 때 자동완성이 될 수 있다는 것이다.  
다만, children 이 optional 형태로 들어가 있기 때문에 컴포넌트의 props의 타입이 명확하지 않다. 어떤 컴포넌트는 children 이 무조건 있어야 하는 경우도 있을 것이고, 어떤 컴포넌트는 children이 들어가면 안되는 경우도 있을 것 이다. React.FC 를 사용하면 기본적으로는 이에 대한 처리를 못하게 된다. 만약에 하고 싶다면 props 타입안에 children을 설정해야한다.

```ts
type GreetingsProps = {
  name: string
  children: React.ReactNode
}
```

그리고, React.FC는 아직까지는 `defaultProps` 가 제대로 작동하지 않는다.

```ts
// src/Greetings.tsx

import React from 'react'

type GreetingsProps = {
  name: string
  mark: string
}

const Greetings: React.FC<GreetingsProps> = ({ name, mark }) => (
  <div>
    Hello, {name} {mark}
  </div>
)

Greetings.defaultProps = {
  mark: '!',
}

export default Greetings
```

위 코드처럼 Greetings.tsx를 작성하고 App에서 렌더링을 하면,

```ts
// src/App.tsx

import React from 'react'
import Greetings from './Greetings'

const App: React.FC = () => {
  return <Greetings name="Hello" />
}

export default App
```

mark를 defaultProps로 넣었음에도 불구하고 mark 값이 없다면서 제대로 작동하지 않는다.  
반면 React.FC를 생략하면 정상적으로 잘 작동하는 것을 확인할 수 있다.

```TS
import React from 'react';

type GreetingsProps = {
  name: string;
  mark: string;
};

const Greetings = ({ name, mark }: GreetingsProps) => (
  <div>
    Hello, {name} {mark}
  </div>
);

Greetings.defaultProps = {
  mark: '!'
};

export default Greetings;
```

그래서 보통 React.FC를 사용하지 않는 것을 권장한다. 만약 위의 코드를 화살표 함수가 아닌 일반 function으로 구현을 하고 싶다면 밑 코드처럼 작성을 해주면 된다.

```ts
import React from 'react'

type GreetingsProps = {
  name: string
  mark: string
}

function Greetings({ name, mark }: GreetingsProps) {
  return (
    <div>
      Hello, {name} {mark}
    </div>
  )
}

Greetings.defaultProps = {
  mark: '!',
}

export default Greetings
```

컴포넌트에 만약 있어도 되고 없어도 되는 props 가 있다면 `?` 문자를 사용하면 된다. 그리고, 특정 함수를 props로 받아와야 한다면 밑 코드처럼 타입을 지정할 수 있다.

```ts
import React from 'react'

type GreetingsProps = {
  name: string
  mark: string
  optional?: string
  onClick: (name: string) => void // 아무것도 리턴하지 않는다는 함수를 의미한다.
}

function Greetings({ name, mark, optional, onClick }: GreetingsProps) {
  const handleClick = () => onClick(name)
  return (
    <div>
      Hello, {name} {mark}
      {optional && <p>{optional}</p>}
      <div>
        <button onClick={handleClick}>Click Me</button>
      </div>
    </div>
  )
}

Greetings.defaultProps = {
  mark: '!',
}

export default Greetings
```

이렇게 되면 App에서 해당 컴포넌트를 사용할 때 다음과 같이 작성을 해줘야 한다.

```ts
import React from 'react'
import Greetings from './Greetings'

const App: React.FC = () => {
  const onClick = (name: string) => {
    console.log(`${name} says hello`)
  }
  return <Greetings name="Hello" onClick={onClick} />
}

export default App
```

만약 컴포넌트를 사용하는 과정에서 이 컴포넌트에서 무엇이 필요했더라? props로 어떤 값을 설정해줘야 하나? 같은 물음이 생길 때는 props를 설정해주는 부분에서 `Ctrl + Space` 를 눌러보면 된다.

# TypeScript 에서 리덕스 사용하기

## 프로젝트 준비하기

```bash
npx create-react-app project_name --template typescript
cd project_name
yarn add redux react-redux @types/react-redux
```

redux의 경우에는 자체적으로 타입스크립트 지원이 되지만, react-redux는 그렇지 않다. 이럴땐 `@types/`를 앞에 붙여서 설치를 해주면 된다.
@types 는 라이브러리에 타입스크립트 지원을 할 수 있도록 추가된 써드파티 라이브러리이다. 라이브러리에 써드파티 타입스크립트 지원이 되는지 확인해보려면 [TypeSearch](https://www.typescriptlang.org/dt/search?search=) 에서 라이브러리명을 검색해보면 된다.

## 카운터 리덕스 모듈 작성하기

버튼을 클릭하면 숫자 값을 증가 혹은 감소시켜주는 카운터를 구현해보았다.  
리덕스 관련 코드를 작성할 때 `Ducks 패턴` 을 사용하였다. 액션타입, 액션생성함수, 리듀서를 모두 한 파일에 작성하였다는 의미이다. 코드 주석에 추가적인 설명을 덧붙였다.

```ts
// src/modules/counter.ts

// 액션 타입을 선언
// 뒤에 as const 를 붙여줌으로써 나중에 액션 객체를 만들게 action.type 의 값을 추론하는 과정에서
// action.type 이 string 으로 추론되지 않고 'counter/INCREASE' 와 같이 실제 문자열 값으로 추론 되도록 해준다.
const INCREASE = 'counter/INCREASE' as const
const DECREASE = 'counter/DECREASE' as const
const INCREASE_BY = 'counter/INCREASE_BY' as const

// 액션 생성함수를 선언
export const increase = () => ({
  type: INCREASE,
})

export const decrease = () => ({
  type: DECREASE,
})

export const increaseBy = (diff: number) => ({
  type: INCREASE_BY,
  // 액션에 부가적으로 필요한 값을 payload 라는 이름으로 통일한다.
  // 이는 FSA (https://github.com/redux-utilities/flux-standard-action) 라는 규칙인데
  // 이 규칙을 적용하면 액션들이 모두 비슷한 구조로 이루어져있게 되어 추후 다룰 때도 편하고
  // 읽기 쉽고, 액션 구조를 일반화함으로써 액션에 관련돤 라이브러리를 사용 할 수 있게 해준다.
  // 다만, 무조건 꼭 따를 필요는 없다.
  payload: diff,
})

// 모든 액션 겍체들에 대한 타입을 준비
// ReturnType<typeof _____> 는 특정 함수의 반환값을 추론
// 상단부에서 액션타입을 선언 할 떄 as const 를 하지 않으면 이 부분이 제대로 작동하지 않는다.
type CounterAction =
  | ReturnType<typeof increase>
  | ReturnType<typeof decrease>
  | ReturnType<typeof increaseBy>

// 이 리덕스 모듈에서 관리 할 상태의 타입을 선언
type CounterState = {
  count: number
}

// 초기상태를 선언
const initialState: CounterState = {
  count: 0,
}

// 리듀서를 작성
// 리듀서에서는 state 와 함수의 반환값이 일치하도록 작성해야한다.
// 액션에서는 방금 만든 CounterAction 을 타입으로 설정한다.
function counter(
  state: CounterState = initialState,
  action: CounterAction,
): CounterState {
  switch (action.type) {
    case INCREASE: // case 라고 입력하고 Ctrl + Space 를 누르면 어떤 종류의 action.type들이 있는지 확인 할 수 있다.
      return { count: state.count + 1 }
    case DECREASE:
      return { count: state.count - 1 }
    case INCREASE_BY:
      return { count: state.count + action.payload }
    default:
      return state
  }
}

export default counter
```

## 프로젝트에 리덕스 적용하기

모듈이 여러개가 될 것을 대비하여 `루트 리듀서`를 만들어준다.  
modules 디렉터리에 index.ts 파일을 만든다음, 다음과 같이 작성해주면 된다.

```ts
// modules/index.ts

import { combineReducers } from 'redux'
import counter from './counter'

const rootReducer = combineReducers({
  counter,
})

// 루트 리듀서를 내보내준다.
export default rootReducer

// 루트 리듀서의 반환값를 유추해준다.
// 추후 이 타입을 컨테이너 컴포넌트에서 불러와서 사용해야 하므로 내보내준다.
export type RootState = ReturnType<typeof rootReducer>
```

그 다음에는 index.tsx 에서 스토어를 만들고, Provider 컴포넌트를 사용하여 스토어를 프로젝트에 적용하면 된다.

```ts
// index.tsx

import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './modules'

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
```

## 카운터 프레젠테이셔널 컴포넌트 만들기

src 디렉터리에 components 디렉터리를 만들고, 그 안에 Counter.tsx 파일을 만들어준다. 리액트 컴포넌트를 작성할 때는 `.tsx` 확장자를 사용해야한다.

```ts
// src/components/Counter.tsx

import React from 'react';

type CounterProps {
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onIncreaseBy: (diff: number) => void;
}

function Counter({
  count,
  onIncrease,
  onDecrease,
  onIncreaseBy
}: CounterProps) {
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
      <button onClick={() => onIncreaseBy(5)}>+5</button>
    </div>
  );
}

export default Counter;
```

컴포넌트에서 필요한 값과 함수들은 모두 props로 받아오게 하면 된다.

## 카운터 컨테이너 컴포넌트 만들기

이제는 리덕스의 값을 불러와서 사용하고, 액션도 디스패치를 하는 `컨테이너 컴포넌트`를 만들어주면 된다.  
src 디렉터리에 containers 디렉터리를 만들어서 그 안에 CounterContainer.tsx 파일을 작성해준다.

```ts
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { increase, decrease, increaseBy } from '../modules/counter';
import Counter from '../components/Counter';

function CounterContainer () => {
  // 상태를 조회합니다. 상태를 조회 할 때에는 state 의 타입을 RootState 로 지정해야한다.
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch(); // 디스패치 함수를 가져온다.

  // 각 액션들을 디스패치하는 함수들을 만들어준다.
  const onIncrease = () => {
    dispatch(increase());
  };

  const onDecrease = () => {
    dispatch(decrease());
  };

  const onIncreaseBy = (diff: number) => {
    dispatch(increaseBy(diff));
  };

  return (
    <Counter
      count={count}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onIncreaseBy={onIncreaseBy}
    />
  );
};

export default CounterContainer;
```

count 값의 타입은 useSelector 가 알아서 유추해주므로 굳이 :number 라고 타입을 명시해 줄 필요가 없다.

## 투두리스트 리덕스 모듈 만들기

이번에는 할 일을 작성하는 투두리스트를 위한 모듈을 구현해보았다.

```ts
// src/modules/todos.ts

// 액션 타입 선언
const ADD_TODO = 'todos/ADD_TODO' as const
const TOGGLE_TODO = 'todos/TOGGLE_TODO' as const
const REMOVE_TODO = 'todos/REMOVE_TODO' as const

let nextId = 1 // 새로운 항목을 추가 할 때 사용 할 고유 ID 값

// 액션 생성 함수
export const addTodo = (text: string) => ({
  type: ADD_TODO,
  payload: {
    id: nextId++,
    text,
  },
})

export const toggleTodo = (id: number) => ({
  type: TOGGLE_TODO,
  payload: id,
})

export const removeTodo = (id: number) => ({
  type: REMOVE_TODO,
  payload: id,
})

// 모든 액션 객체들에 대한 타입 준비
type TodosAction =
  | ReturnType<typeof addTodo>
  | ReturnType<typeof toggleTodo>
  | ReturnType<typeof removeTodo>

// 상태에서 사용 할 할 일 항목 데이터 타입 정의
export type Todo = {
  id: number
  text: string
  done: boolean
}

// 이 모듈에서 관리할 상태는 Todo 객체로 이루어진 배열
export type TodosState = Todo[]

// 초기 상태 선언
const initialState: TodosState = []

// 리듀서 작성
function todos(
  state: TodosState = initialState,
  action: TodosAction,
): TodosState {
  switch (action.type) {
    case ADD_TODO:
      return state.concat({
        // action.payload 객체 안의 값이 모두 유추된다.
        id: action.payload.id,
        text: action.payload.text,
        done: false,
      })
    case TOGGLE_TODO:
      return state.map(todo =>
        // payload 가 number 인 것이 유추된다.
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo,
      )
    case REMOVE_TODO:
      // payload 가 number 인 것이 유추된다.
      return state.filter(todo => todo.id !== action.payload)
    default:
      return state
  }
}

export default todos
```

모듈을 다 만들었으면, 루트 리듀서에 todos 리듀서를 등록해준다.

```ts
// modules/index.ts

import { combineReducers } from 'redux'
import counter from './counter'
import todos from './todos'

const rootReducer = combineReducers({
  counter,
  todos,
})

// 루트 리듀서를 내보내준다.
export default rootReducer

// 루트 리듀서의 반환값를 유추해준다.
// 추후 이 타입을 컨테이너 컴포넌트에서 불러와서 사용해야 하므로 내보내준다.
export type RootState = ReturnType<typeof rootReducer>
```

# 투두리스트를 위한 프레젠테이셔널 컴포넌트 준비하기

총 3개의 컴포넌트를 준비해야한다.

- TodoInsert: 새 항목을 등록하는 컴포넌트
- TodoItem: 할 일 정보를 보여주는 컴포넌트
- TodoList: 여러개의 TodoItem을 렌더링하는 컴포넌트

## TodoInsert 프레젠테이셔널 컴포넌트

onInsert 라는 props를 받아와서 이 함수를 호출하여 새 항목을 추가하며, input의 상태는 컴포넌트 내부에서 로컬 상태로 관리한다.

```ts
// src/components/TodoInsert.tsx

import React, { ChangeEvent, FormEvent, useState } from 'react'

type TodoInsertProps = {
  onInsert: (text: string) => void
}

function TodoInsert({ onInsert }: TodoInsertProps) {
  const [value, setValue] = useState('')
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    onInsert(value)
    setValue('')
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        placeholder="할 일을 입력하세요."
        value={value}
        onChange={onChange}
      />
      <button type="submit">등록</button>
    </form>
  )
}

export default TodoInsert
```

## TodoItem 프레젠테이셔널 컴포넌트

각 할 일에 대한 정보를 보여주며, 텍스트 영역을 클릭하면 done 값이 바뀌고 우측의 X 를 클릭하면 항목이 삭제된다.  
할 일 정보를 지니고 있는 todo, 그리고 상태 토글 및 삭제를 해주는 함수 onToggle과 onRemove를 props로 받아온다.

```ts
import React, { CSSProperties } from 'react'
import { Todo } from '../modules/todos'

type TodoItemProps = {
  todo: Todo
  onToggle: (id: number) => void
  onRemove: (id: number) => void
}

function TodoItem({ todo, onToggle, onRemove }: TodoItemProps) {
  // CSSProperties 는 style 객체의 타입이다.
  const textStyle: CSSProperties = {
    textDecoration: todo.done ? 'line-through' : 'none',
  }
  const removeStyle: CSSProperties = {
    marginLeft: 8,
    color: 'red',
  }

  const handleToggle = () => {
    onToggle(todo.id)
  }

  const handleRemove = () => {
    onRemove(todo.id)
  }

  return (
    <li>
      <span onClick={handleToggle} style={textStyle}>
        {todo.text}
      </span>
      <span onClick={handleRemove} style={removeStyle}>
        (X)
      </span>
    </li>
  )
}

export default TodoItem
```

## TodoList 프레젠테이셔널 컴포넌트

여러개의 TodoItem 컴포넌트를 렌더링 해준다. 할 일 정보들을 지니고 있는 배열인 todos 와 각 TodoItem 컴포넌트들에게 전해줘야 하는 onToggle과 onRemove를 props로 받아온다.

```ts
import React from 'react'
import { Todo } from '../modules/todos'
import TodoItem from './TodoItem'

type TodoListProps = {
  todos: Todo[]
  onToggle: (id: number) => void
  onRemove: (id: number) => void
}

function TodoList({ todos, onToggle, onRemove }: TodoListProps) {
  if (todos.length === 0) return <p>등록된 항목이 없습니다.</p>
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          onToggle={onToggle}
          onRemove={onRemove}
          key={todo.id}
        />
      ))}
    </ul>
  )
}

export default TodoList
```

# 투두리스트를 위한 컨테이너 컴포넌트 만들기

투두리스트를 위한 컨테이너 컴포넌트를 만들어주었다. 이름은 TodoApp으로 설정을 해줬다.

```ts
// src/containers/TdooApp.tsx

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../modules'
import { toggleTodo, removeTodo, addTodo } from '../modules/todos'
import TodoInsert from '../components/TodoInsert'
import TodoList from '../components/TodoList'

function TodoApp() {
  const todos = useSelector((state: RootState) => state.todos)
  const dispatch = useDispatch()

  const onInsert = (text: string) => {
    dispatch(addTodo(text))
  }

  const onToggle = (id: number) => {
    dispatch(toggleTodo(id))
  }

  const onRemove = (id: number) => {
    dispatch(removeTodo(id))
  }

  return (
    <>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />
    </>
  )
}

export default TodoApp
```

# typesafe-actions로 리팩토링 해주기

`typesafe-actions`는 리덕스를 사용하는 프로젝트에서 액션 생성함수와 리듀서를 훨씬 쉽고 깔끔하게 작성할 수 있게 해주는 라이브러리이다.  
다음과 같이 설치를 해주면 된다.

```bash
yarn add typesafe-actions
```

## counter 리덕스 모듈 리팩토링하기

counter.ts 를 다음과 같이 수정할 수 있다.

```ts
// src/modules/counter.ts

import {
  createStandardAction,
  ActionType,
  createReducer,
} from 'typesafe-actions'

// 액션 type 선언
const INCREASE = 'counter/INCREASE'
const DECREASE = 'counter/DECREASE'
const INCREASE_BY = 'counter/INCREASE_BY'

// 액션 생성함수를 선언합니다
export const increase = createStandardAction(INCREASE)()
export const decrease = createStandardAction(DECREASE)()
export const increaseBy = createStandardAction(INCREASE_BY)<number>() // payload 타입을 Generics 로 설정해주면 된다.

// 액션 객체 타입 준비
const actions = { increase, decrease, increaseBy } // 모든 액션 생성함수들을 actions 객체에 넣어준다.
type CounterAction = ActionType<typeof actions> // ActionType 를 사용하여 모든 액션 객체들의 타입을 준비할 수 있다.

// 이 리덕스 모듈에서 관리 할 상태의 타입을 선언
type CounterState = {
  count: number
}

// 초기상태를 선언
const initialState: CounterState = {
  count: 0,
}

// 리듀서를 만든다.
// createReducer 는 리듀서를 쉽게 만들 수 있게 해주는 함수이다.
// Generics로 리듀서에서 관리할 상태, 그리고 리듀서에서 처리 할 모든 액션 객체들의 타입을 넣어야한다.
const counter = createReducer<CounterState, CounterAction>(initialState, {
  [INCREASE]: state => ({ count: state.count + 1 }), // 액션을 참조 할 필요 없으면 파라미터로 state 만 받아와도 된다.
  [DECREASE]: state => ({ count: state.count - 1 }),
  [INCREASE_BY]: (state, action) => ({ count: state.count + action.payload }), // 액션의 타입을 유추 할 수 있다.
})

export default counter
```

액션 생성 함수를 매번 직접 만들 필요 없이 `createStandardAction` 을 사용해서 한 줄로 쉽게 작성할 수 있게 되었다.

## counter 리덕스 모듈 또 다른 방식으로 리팩토링하기

`createReducer` 를 사용할 때 객체 형태로 작성을 해주어도 되고, `메서드 체이닝 방식` 을 통해서 구현할 수도 있다.

```ts
import {
  createStandardAction,
  ActionType,
  createReducer,
} from 'typesafe-actions'

// 액션 type 선언
const INCREASE = 'counter/INCREASE'
const DECREASE = 'counter/DECREASE'
const INCREASE_BY = 'counter/INCREASE_BY'

// 액션 생성함수를 선언
export const increase = createStandardAction(INCREASE)()
export const decrease = createStandardAction(DECREASE)()
export const increaseBy = createStandardAction(INCREASE_BY)<number>() // payload 타입을 Generics 로 설정해줘야한다.

// 액션 객체 타입 준비
const actions = { increase, decrease, increaseBy } // 모든 액션 생성함수들을 actions 객체에 넣어준다.
type CounterAction = ActionType<typeof actions> // ActionType 를 사용하여 모든 액션 객체들의 타입을 준비해줄 수 있다.

// 이 리덕스 모듈에서 관리 할 상태의 타입을 선언
type CounterState = {
  count: number
}

// 초기상태를 선언
const initialState: CounterState = {
  count: 0,
}

// 리듀서를 만든다.
// createReducer 는 리듀서를 쉽게 만들 수 있게 해주는 함수
// Generics로 리듀서에서 관리할 상태, 그리고 리듀서에서 처리 할 모든 액션 객체들의 타입을 넣어야한다.
const counter = createReducer<CounterState, CounterAction>(initialState)
  .handleAction(INCREASE, state => ({ count: state.count + 1 }))
  .handleAction(DECREASE, state => ({ count: state.count - 1 }))
  .handleAction(INCREASE_BY, (state, action) => ({
    count: state.count + action.payload,
  }))

export default counter
```

메서드 체이닝 방식으로 구현을 할 때의 장점은 바로 handleAction의 첫 번째 인자에 타입에 액션을 type 을 넣는 것이 아니라 `액션 생성함수 자체`를 넣어도 작동하는 점이다. 이렇게되면 액션의 type을 굳이 선언할 필요가 없어진다.

```ts
import {
  createStandardAction,
  ActionType,
  createReducer,
} from 'typesafe-actions'

export const increase = createStandardAction('counter/INCREASE')()
export const decrease = createStandardAction('counter/DECREASE')()
export const increaseBy = createStandardAction('counter/INCREASE_BY')<number>() //

// 액션 객체 타입 준비
const actions = { increase, decrease, increaseBy }
type CounterAction = ActionType<typeof actions>

type CounterState = {
  count: number
}

const initialState: CounterState = {
  count: 0,
}

const counter = createReducer<CounterState, CounterAction>(initialState)
  .handleAction(increase, state => ({ count: state.count + 1 }))
  .handleAction(decrease, state => ({ count: state.count - 1 }))
  .handleAction(increaseBy, (state, action) => ({
    count: state.count + action.payload,
  }))

export default counter
```

이렇게 액션의 type 대신에 생성 함수를 참조하여 리두서를 구현해주면 모든 액션 객체들의 타입인 CounterAction을 준비하는 것도 생략 가능하다. 그리고, createReducer를 사용할 때 해당함수의 Generics 자체를 생략해도 상관 없게 된다.

```ts
import { createStandardAction, createReducer } from 'typesafe-actions'

export const increase = createStandardAction('counter/INCREASE')()
export const decrease = createStandardAction('counter/DECREASE')()

type CounterState = {
  count: number
}

const initialState: CounterState = {
  count: 0,
}

const counter = createReducer(initialState)
  .handleAction(increase, state => ({ count: state.count + 1 }))
  .handleAction(decrease, state => ({ count: state.count - 1 }))
  .handleAction(increaseBy, (state, action) => ({
    count: state.count + action.payload,
  }))

export default counter
```

# todos 리덕스 모듈 리팩토링하기

todos 리덕스 모듈도 typesafe-actions를 사용하여 리팩토링이 가능하다. 아까 전에 작성한 모듈은 액션타입, 액션 생성함수, 그리고 reducer가 하나의 소스파일에 들어가있지만, 액션이 많아지면 코드 양이 너무 과도하게 많아질 수 있다. 이럴땐 이러한 구조로 작성해주면 편리하다.

```note
modules
  todos
    actions.ts
    index.ts
    reducer.ts
    types.td
  counter.ts # 파일이 그렇게 길지 않은 경우 그냥 파일 하나로 작성
```

위와 같은 구조로 분리를 해보았다. 우선 actions.ts 파일을 작성하였다.

```ts
// src/modules/todos/actions.ts

import { createAction, createStandardAction } from 'typesafe-actions'

// 리듀서에서 사용 할 수 있도록 타입도 내보내준다.
export const ADD_TODO = 'todos/ADD_TODO'
export const TOGGLE_TODO = 'todos/TOGGLE_TODO'
export const REMOVE_TODO = 'todos/REMOVE_TODO'

let nextId = 1 // 새로운 항목을 추가 할 때 사용 할 고유 ID 값

// 액션 생성 함수

// 이 액션 생성 함수의 경우엔 파라미터를 기반하여 커스터마이징된 payload를 설정해주므로,
// createAction 이라는 함수를 사용한다.
// 여기서 action은 액션 객체를 만드는 함수이다.
export const addTodo = createAction(
  ADD_TODO,
  action => (text: string) =>
    action({
      id: nextId++,
      text,
    }),
)
// 위 코드는 다음과 같은 형태로도 구현 할 수 있지만, createAction 말고 action 만 사용하면
// Action Helpers (https://www.npmjs.com/package/typesafe-actions#action-helpers-api) 지원이 안된다.
// export const addTodo = (text: string) => action(ADD_TODO, { id: nextId++, text })

// payload가 그대로 들어가는 액션생성함수는 정말 간단하다.
export const toggleTodo = createStandardAction(TOGGLE_TODO)<number>()
export const removeTodo = createStandardAction(REMOVE_TODO)<number>()
```

그 다음에는 액션객체들의 타입과 상태의 타입들을 선언할 types.ts를 작성하였다.

```ts
// src/modules/todos/types.ts

import { ActionType } from 'typesafe-actions'
import * as actions from './actions'

// 한번에 모두 import 해와서 actions 에 담았기 때문에
// 이 부분이 액션의 종류가 만하져도 한 줄로 작성 할 수 있어서 매우 간편하다.
export type TodosAction = ActionType<typeof actions>

// 상태에서 사용 할 할 일 항목 데이터 타입 정의
export type Todo = {
  id: number
  text: string
  done: boolean
}

// 이 모듈에서 관리할 상태는 Todo 객체로 이루어진 배열
export type TodosState = Todo[]
```

타입까지 모두 정의하였다면, 리듀서를 reducer.ts에 작성해주면 된다.

```ts
// src/modules/todos/reducer.ts

import { TodosState, TodosAction } from './types'
import { createReducer } from 'typesafe-actions'
import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO } from './actions'

// 초기 상태 선언
const initialState: TodosState = []

// 리듀서 작성
const reducer = createReducer<TodosState, TodosAction>(initialState, {
  [ADD_TODO]: (state, action) =>
    state.concat({
      ...action.payload, // id, text 를 이 안에 넣기
      done: false,
    }),
  // 바구조화 할당을 활용하여 payload 값의 이름을 바꿀 수 있음
  [TOGGLE_TODO]: (state, { payload: id }) =>
    state.map(todo => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
  [REMOVE_TODO]: (state, { payload: id }) =>
    state.filter(todo => todo.id !== id),
})

export default reducer
```

여기까지 작성한 후, todos 디렉터리에 index.ts를 만들어주면 된다. 이 파일의 용도는 기존에 todos.ts를 불러와서 사용하던 코드들이 (컨테이너 및 루트 리듀서) 별도의 import 경로 수정 없이 제대로 동작하게 하기 위함이다.

```ts
// src/modules/todos/index.ts

export { default } from './reducer' // reducer 를 불러와서 default로 내보내겠다는 의미
export * from './actions' // 모든 액션 생성함수들을 불러와서 같은 이름들로 내보내겠다는 의미
export * from './types' // 모든 타입들을 불러와서 같은 이름들로 내보내겠다는 의미
```

여기까지 작성을 완료하면 modules의 todos 디렉토리가 기존의 todos.ts를 완벽히 대체하게 된다.

# 참고사항

typesafe-actions의 createStandardAction은 최신버전에서 deprecated으로 분류되었다. 그래서 다음과 같이 코드를 작성해주면 된다.

```ts
import { deprecated, ActionType, createReducer } from 'typesafe-actions'
const { createAction, createStandardAction } = deprecated
```

# 참고링크

- [Velopert - 리액트 프로젝트에서 타입스크립트 & 리덕스 사용하기](https://react.vlpt.us/using-typescript/)

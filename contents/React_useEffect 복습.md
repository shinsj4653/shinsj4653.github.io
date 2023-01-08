---
date: '2023-01-08'
title: 'React - useEffect 복습'
categories: ['React']
summary: '근로활동에서 React의 useEffect 개념을 다시 한 번 공부하면서 배운 내용을 정리해보았다.'
thumbnail: './images/thumbnail-react.jpeg'
---

React의 useEffect...  
말로는 정말 많이 들었고, 근로에서 진행하는 프로젝트에서도 많이 써봤지만, 정작 정확하게 마스터를 하지 않고 쓰다보니 에러가 계속 발생하였다.  
특히, `비동기함수` 와 함께 사용하니까 내 뜻대로 화면에서 안 보여져서 더 답답하게 느껴졌다. 이번 기회에 useEffect 개념에 대해서 다시 한 번 복습해보았고, 깨달은 내용들을 정리해보았다.

# React.StrictMode

공식문서에 따른 Strict mode 설명은 다음과 같다.
> StrictMode는 애플리케이션 내의 잠재적인 문제를 알아내기 위한 도구이다.  
> Fragment와 같이 UI를 렌더링하지 않으며, 자손들에 대한 부가적인 검사와 경고를 활성화한다.

개발 모드에서만 작동되기 때문에, 배포 후에는 작동되지 않는다.  
다만, 컴포넌트가 `잠재적인 에러` 를 잡아내기 위해서 검증용으로 한번 더 렌더링이 된다. 그래서 React를 이용한 개발을 할 시에, console에 로그가 두 번 찍히는 것 이었다.

# useEffect, 비동기적? 아니면 동기적?

useEffect에 삽입되는 콜백함수는 element가 리턴이 된 이후에 실행이 된다.
개념적으로 React는 두 단계로 동작을 한다.
1. 렌더링 단계
특정 환경(ex. DOM 환경)에 어떤 변화가 필요한 지 결정하는 단계. 이 과정에서 React는 render를 호출하여 이전 렌더와 결과값을 비교한다.

2. 커밋 단계
React가 변경 사항을 반영하는 단계. React DOM의 경우, React가 DOM 노드를 추가, 변경 및 제거하는 단계를 말한다. 이 단계에서 React는 componentDidMount나 componentDidUpdate와 같은 생명주기 메서드를 호출한다.

`useEffect는 비동기적으로 콜백함수를 호출한다` 는 문구랑 useEffect의 콜백함수가 `진짜로 실행 컨텍스트 작업이 완료되는 순서대로 task queue에 들어가서 이벤트 루프가 비워질 때마다 콜 스텍으로 들어가 처리가 된다` 라고 착각하면 안된다!

예시 코드를 보자.
```js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(
  cors({
    origin: ['http://localhost:3000'],
  }),
);

app.get('/test1', async (req, res) => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('wait for 1s');
    }, 1000);
  });

  res.status(200).json({ message: 'test1 ok' });
});

app.get('/test2', async (req, res) => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('wait for 2s');
    }, 2000);
  });

  res.status(200).json({ message: 'test2 ok' });
});

app.listen(3001, () => console.log('hello wordl'));
```

test1 엔드포인트로 get 요청이 들어오면 1초 뒤에 응답을, test2 엔드포인트로 get 요청이 들어오면 2초 뒤에 응답을 보내는 구조로 되어있다.
클라이언트 사이드에서는 다음과 같은 형태로 get 요청을 보낸다.
```js
  const [list, setList] = useState([]);
  const [result, setResult] = useState([]);
  console.log(list, result);

  useEffect(() => {
    console.log('called from test2 useEffect');
    axios.get('http://localhost:3001/test2').then(result => {
      console.log(result);
      setList(['1', '2', '3']);
    });
  }, []);

  useEffect(() => {
    console.log('called from test1 useEffect');
    axios.get('http://localhost:3001/test1').then(result => {
      console.log(result, 'is called twice');
      setResult(list.map(e => +e));
    });
  }, [list]);

  return <div>test</div>;
```

`여기서 중요한 점!`  

> useEffect의 콜백이 순서대로, 동기적으로 호출이 된다. 그리고, dependency에 저장된 상태값에 변동이 확인 되면 또 다시 해당 콜백을 호출한다.

단, 이때 주의할 점은 setState와 같은 상태 업데이트 함수의 결과는 그 당시 환경에는 적용되지 않은 상태라는 점이다.
```js
  const [value1, setValue1] = useState([]);
  const [value2, setValue2] = useState([]);
  console.log(value1, value2);

  useEffect(() => {
    setValue2(['1', '2', '3']);
  }, []);

  useEffect(() => {
    if (value2.length) {
      setValue1([1, 2, 3]);
    }
  }, []);

  return <div>test</div>;
```
setValue2(['1', '2', '3']) 가 되는 순간, 상태 업데이트를 감지한 리액트 앱은 새로운 virtual dom을 만들고 있는데, 남아있던 virtual dom의 스냅샷 입장에서는 valeu2는 여전히 아무것도 업데이트 되지 않은 상태이다.  
따라서, 두번째 useEffect의 콜백함수에 써져있는 if문은 실행되지 않는다. 만약, dependency 배열에 value1를 써놨다 하더라도 그것은 해당 old virtual dom의 스냅샷에서 감지해서 호출되는 것이 아니라, 상태가 업데이트되므로 인해 새로 만들어진 virtual dom에서 호출되는 콜백인 것이다

# 정리

1. 여러 useEffect가 있을 경우, 해당 콜백함수는 동기적으로 순차적으로 호출되며, dependency 배열에 있는 요소 중, 어느 하나라도 주소값이 달라질 경우 재호출된다.
2. 상태를 업데이트한다는 것은, render가 호출되며 새로운 virtual dom이 만들어진다는 뜻이다. 즉, old virtual dom 스냅샷의 입장에서는 아직 상태가 업데이트 되지 않은 상태이므로, 이에 따라 useEffect의 콜백은 기존 상태를 기반으로 호출한다.
3. 만약 dependency에 대상이 되는 상태를 넣어뒀으면, 새로운 virtual dom의 입장에서 생각해봤을때 환경은 업데이트 되었고, useEffect의 dependency에 해당 내용이 존재하므로 콜백함수가 return문 이후에 호출되는 것이다.

# 참고링크

- [useEffect - 비동기적이지만 동기적이다](https://velog.io/@chltjdrhd777/useEffect%EB%8A%94-%EB%B9%84%EB%8F%99%EA%B8%B0%EC%A0%81%EC%9D%B4%EC%A7%80%EB%A7%8C-%EB%8F%99%EA%B8%B0%EC%A0%81%EC%9D%B4%EB%8B%A4)
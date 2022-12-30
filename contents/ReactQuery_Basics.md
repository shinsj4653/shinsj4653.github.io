---
date: '2022-12-30'
title: 'React Query - Basics'
categories: ['React Query', 'React']
summary: '유튜브에서 Weibenfalk님의 무료 React Query 강의를 들으면서 배운 내용을 정리해보았다.'
thumbnail: './images/thumbnail-react-query.png'
---

올해 겨울방학과 내년 한학기 동안 진행할 졸업프로젝트 때 사용할 상태관리 툴을 고르던 중, react query라는 라이브러리를 알게되어서 유튜브 강의를 통해 배운 내용을 정리해보았다.

# Official Docs

[React Query Official Docs Link](https://react-query-v3.tanstack.com/)

# Why React Query?

React에서 상태 관리를 하기 위해서는 대부분 Redux라는 상태관리 매니저를 사용한다. 하지만 Redux를 사용하면 서버 데이터를 위한 로직이 과도하게 커지고, 그로 인해서 Redux를 활용하기 위한 보일러 플레이트가 비대해 진다는 단점이 있다.

> 여기서 보일러 플레이트는 최소한의 변경으로 여러곳에서 재사용되며, 반복적으로 비슷한 형태를 띄는 코드를 말한다.

React Query의 큰 장점 중 하나는 `데이터를 캐싱한다는 것`이다. 캐싱된 데이터로 인해서 API 콜을 줄여주며 서버에 대한 부담을 줄여줄 수 있다.  
React Query가 데이터를 Refetch 해오는 상황은 다음 4가지이다.

- 브라우저에 포커스가 들어왔을 경우 (refetchOnWindowFocus)
- 새로 마운트가 되었을 경우 (refetchOnMount)
- 네트워크가 끊어졌다가 다시 연결된 경우 (refetchOnReconnect)
- React Query는 캐싱된 데이터는 항상 stale하다고 판단하며, stale 상태인 데이터를 Refetch

서버 데이터를 패칭해 온 데이터를 캐싱했어도, 사용자가 화면을 바라보고 있을 떄는 그 시점에 있어서 가장 최신의 데이터를 바라볼 수 있는 것이다.  
페이지가 전환이 되면, 해당 데이터의 상태가 stale 하다고 판단하여 리패칭하며, 페이지에서 어떤 이벤트가 발생하면 게발자가 트리거를 심어줌으로써 데이터를 리패치할 수도 있다.

# Installation

프로젝트 생성 후,

```bash
npm i react-query
```

위의 코드를 터미널에 입력하면 된다.

# REST-API Samples

react query 영상에서 사용할 더미 API 데이터를 아래의 사이트에서 가져와서 사용할 수 있다.

[Regres - A hosted REST-API ready to respond to your AJAX requests](https://reqres.in/)

# fetchUsers Example

```js
const fetchUsers = async () => {
  try {
    return await (await fetch('https://reqres.in/api/users')).json()
  } catch (err) {
    throw new Error(err)
  }
}
```

위의 코드는 잘못된 코드이다.
fetch는 4xx/5xx 에러들을 반환하지 않기 때문에 catch가 작동하지 않는다.
따라서, 다음과 같이 수정을 해줘야 한다.

```js
const fetchUsers = async () => {
  const response = await fetch('https://reqres.in/api/users')
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}
```

# Settings

useQuery를 사용할 때 다양한 옵션값들을 부여할 수 있다.

```js
const {
    data: users,
    isLoading,
    error,
  } = useQuery<Users, ErrorConstructor>("users", fetchUsers, {
    enabled: true,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
```

- `enabled` : true가 되면 fetchUsers를 사용한다는 것 이다. useQuery를 동기적으로 실행하고자할 떄 이 옵션을 사용하면 된다. 기본적으로 react-query는 비동기적으로 실행이 된다.
- `refetchOnWindowFocus` : 브라우저 창을 Focus 할 시에, 데이터를 refetch 해오는 옵션이다.
- `refetchInterval` : ms 단위의 값을 넣어주면, 그 ms 만큼 데이터를 refetch 해온다.

# 참고문서

- [React-Query 도입을 위한 고민(feat. Recoil)](https://tech.osci.kr/2022/07/13/react-query/)
- [React-query 개념 및 정리 | 기억보다 기록을](https://kyounghwan01.github.io/blog/React/react-query/basic/)

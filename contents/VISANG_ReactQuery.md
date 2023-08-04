---
date: '2023-08-04'
title: '비상교육 현장실습 - ReactQuery 사용'
categories: ['VISANG', 'React Query']
summary: '프론트엔드 작업 중, React Query를 사용하면서 겪었던 이슈들을 정리'
thumbnail: './images/thumbnail-visang.png'
---

졸업프로젝트때도 겪었던 이슈를 현장실습 프로젝트때도 동일하게 경험하게 되어 이번 기회에 정리를 해두기로 하였다.

# 문제상황

```jsx
const { data, isLoading, error } = useQuery('queryKey', () => {
  return axios.get('url')
})
```

data가 undefined라고 나오는 오류를 계속해서 만나게 되었다. 이 문제를 해결하기 위해 여러가지 방법을 시도해보았다.

# 해결방법

## && 연산자를 통해 data가 undefined인 경우에 대한 예외처리

꼭 && 연산자가 아니여도, data가 undefined인 경우에 대한 예외처리를 해주면 된다.

## if (isLoading) return 로딩중...을 통해 로딩중인 경우에 대한 예외처리

useQuery hook을 사용하면서 데이터를 비동기적으로 가져오는 동안 로딩 상태를 표시할 수 있는데 isLoading 변수는 useQuery가 실행되는 동안 데이터를 가져오고 있는지 여부를 나타내는 불리언(Boolean) 값이다.
따라서, if (isLoading) return 구문은 데이터를 가져오는 중일 때, 렌더링을 중단하고 로딩 상태를 나타내는 UI를 표시하기 위한 코드입니다. 이 코드는 컴포넌트 함수의 가장 상단에서 실행됩니다. 만약 isLoading이 true인 경우, 컴포넌트 함수의 반환문을 실행하지 않고 컴포넌트를 종료하기 때문이다.
isLoading 값이 false인 경우에는 서버에서 가져온 데이터를 이용하여 요소를 생성하여 렌더링하므로 에러가 해결된다.

# 참고링크

- [useQUery return undefined](https://velog.io/@won11/%EC%97%90%EB%9F%AC%EB%85%B8%ED%8A%B8-useQuery-return-undefined-f5eooubo)

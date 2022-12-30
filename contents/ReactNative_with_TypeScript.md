---
date: '2022-12-30'
title: 'React Native with TypeScript'
categories: ['React Native', 'TypeScript']
summary: '유튜브에서 ToThePointCode님의 무료 WalletApp 만들기 강의를 들으면서 배운 내용을 정리해보았다.'
thumbnail: './images/thumbnail-typescript.png'
---

졸업프로젝트에서 React Native를 기반으로 진행할 것이고 언어는 TypeScript를 활용하기 정했다. js로 React Native를 국가근로 활동을 하면서 다뤄봤지만, typescript로는 한번도 적용해보지 않아서 이번 강의를 통해 적용해보는 연습을 해보았다.

# Youtube Video Link

[Create a react native typescript project](https://www.youtube.com/watch?v=68l7wyHw97Y)

# Initial Setup

```bash
expo init projectName
```

expo를 활용하여 프로젝트를 생성하고 싶으면 위와 같이 코드를 입력하면 된다.

# styled-components 사용

css는 styled-components 라이브러리를 활용하여 작성을 하였다. typescript 환경에서 styled-components를 사용하기 위해서는 다음과 같은 명령어들이 필요하다.

```bash
npm install --save styled-components
npm install --save-dev @types/styled-components @types/styled-components-react-native
```

# Google Fonts 사용

프로젝트 내에서, assets 폴더 밑에 fonts 폴더 생성 후, 거기에 다운로드한 ttf 파일들을 넣어준다.  
그 다음에 밑에 있는 명령어를 입력해준다.

```bash
expo install expo-font expo-app-loading
```

젤 상단부분에 있는 App.tsx에서 다음과 같이 fonts를 적용하면 어느 component에서도 사용이 가능하다.

```ts
import { useFonts } from 'expo-font'
export default function App() {
  let [fontsLoaded] = useFonts({
    'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
    'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return <RootStack />
}
```

# React Navigation Setup with TypeScript

React Navigation 설치 및 추가 dependencies 는 다음 명령어들로 할 수 있다.

```bash
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
```

Stack Navigator와 dependencies 도 필요하다.

```bash
npm install @react-navigation/stack
npx expo install react-native-gesture-handler
```

# Reanimated Bottom Sheet

이 강의에서 사용한 Custom 라이브러리 중 하나이다. 다음과 같은 명령어로 설치를 해주었다.

```bash
yarn add reanimated-bottom-sheet
yarn add react-native-reanimated react-native-gesture-handler
```

이 라이브러리를 쓰려면, babel.config.ts 파일을 수정해줘야 한다.

```js
module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
  }
}
```

위의 코드를 다음과 같이 수정해주면 된다.

```js
module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo', 'module: metro-react-native-babel-preset'],
    plugins: ['react-native-reanimated/plugin'],
  }
}
```

# Trouble Shooting

## cannot find module metro-react-native-babel-preset

알맞은 dependencies들이 없어서 생기는 오류라고 한다. 다음의 명령어로 문제를 해결해주었다.

```bash
npm i metro-react-native-babel-preset --save-dev
```

다음의 링크를 참고하여 해결하였다.
[Link](https://stackoverflow.com/questions/52422178/react-native-error-cannot-find-module-metro-react-native-babel-preset)

# Next Assignment

이번 강의를 통해 기본적인 프로젝트 폴더 구조나 컴포넌트에 props를 넘겨주는 방법등은 이해를 했지만, 확실히 직접 졸프 개발을 하면서 모르는 부분들을 계속해서 구글링하면서 해결을 해나가야 더 익숙해질 것 같다.  
앞으로 `TypeScript` 관련 글들을 더 집중해서 작성을 해볼 예정이다.

# 참고링크

- [styled-components: API Reference](https://styled-components.com/docs/api#typescript)
- [React Navigation Docs](https://reactnavigation.org/docs/getting-started/)

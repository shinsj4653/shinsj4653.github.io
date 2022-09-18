---
date: '2022-09-17'
title: 'React Native - NomadCoder 강의 정리'
categories: ['React Native']
summary: 'NomadCoder님의 무료 React Native 강의를 들으면서 배운 내용을 정리해보았다.'
thumbnail: './images/thumbnail-react-native.jpeg'
---

NomadCoder님의 '왕초보를 위한 React Native 101'강의를 들으면서 배운 내용을 정리해보았다.

# WEATHER APP

## StatusBar

기기 상단에 표시되는 시계, 배터리, 와이파이 정보를 담고있는 바이다.  
`Thrid Party Component` 이다. 즉, ios 혹은 android `운영체제와 소통하기 위한 컴포넌트` 이므로, 화면에 표시되지 않는다.

## CSS 스타일링

```js
const styles = StyleSheet.create({
	...

})
```

StyleSheet는 자동완성 기능을 제공하여서 사용하면 편리하다.

```js
<View style={{ ...styles.day, alignItems: 'center' }}></View>
```

위 코드처럼, 밑에 명시된 styles를 적용함과 동시에, 원하는 스타일을 추가적으로 적용할 수 있다.

## AsyncStorage가 deprecated된 이유

React Native 팀이 모든 컴포넌트를 싹 다 지원하는 것이 어렵다는 것을 깨달았고, 그와 동시에 유지 관리 어려움과 업데이트 문제가 발생한다는 것도 알게되었다.  
그래서, React Native를 가능한 빠르게 작동시키기 위해 컴포넌트 몇 개를 deprecated시켰다. 그 결과, AsyncStorage 및 몇몇 다른 컴포넌트는 다른 곳에서 따로 다운을 받아야한다.

## Component vs API

> Component

Something that is rendered on the screen

> API

Something that is used to communicate with the operating system  
ex) StatusBar, Vibration, CameraRoll, etc.

## expo-status-bar vs StatusBar from react-native

expo-status-bar는 expo에서 제공하는 StatusBar이고, react-native의 StatusBar는 react-native에서 제공하는 StatusBar이다.
즉, expo에는 react-native에서 제공하지 않는 API들도 존재한다.
다른 커뮤니티에서도 react-native에서 제공하지 않는 패키지들 제공한다.

# WORK HARD TRAVEL HARD APP

## TouchableOpacity

> View that responds to touch

opacity가 있는 이유는 터치가 되었을 때 생기는 애니메이션 효과를 지니고 있기 떄문이다.

## TouchableHighlight

> View that changes the backgroundColor when touched

## TouchableWithoutFeedback

> View that responds to touch without any feedback, 즉 터치가 되었을 때 아무런 효과가 없다.

## Pressable

> View that responds to touch with a pressIn and pressOut animation

이 컴포넌트를 이용하면 기준 영역 조금 밖 부분을 터치해도 터치가 인식된다.

## @expo/vector-icons

[https://icons.expo.fyi/](https://icons.expo.fyi/)

위 사이트에서 원하는 아이콘들을 가져와서 사용할 수 있다. @expo/vector-icons 패키지는 expo를 설치하면 자동으로 설치되는 패키지이다.

## AsyncStorage : 사용하는 키 값 헷갈리지 말기

Code Challenge 중, 첫번째인 Work/Travel 상태를 저장시키는 작업을 하던 도중 발생한 실수이다.

```js
const travel = async () => {
  setWorking(false)
  await AsyncStorage.setItem(STATE_KEY, JSON.stringify(false)) // 상태 저장 -> key 변수 이름 헷갈리지 말기...
  console.log(working)
}
const work = async () => {
  setWorking(true)
  await AsyncStorage.setItem(STATE_KEY, JSON.stringify(true)) // 상태 저장
  console.log(working)
}
```

잘못된 key 변수를 사용하여 상태 저장이 안되는 오류가 있었다. 다음부터는 올바른 key값을 잘 사용할 수 있도록 노력을 해야겠다.

# 참고링크

- https://nomadcoders.co/react-native-for-beginners/lectures/3252

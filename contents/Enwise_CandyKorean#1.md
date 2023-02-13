---
date: '2023-02-14'
title: 'Enwise - CandyKorean #1'
categories: ['Enwise', 'React Native']
summary: 'Enwise 국가근로 활동에서 진행한 CandyKorean 프로젝트 정리'
thumbnail: './images/thumbnail-react-native.jpeg'
---
Enwise 국가근로 활동을 하면서 진행한 프로젝트, CandyKorean 앱을 제작하면서 배운 내용을 정리해보았다.

# 프로젝트 소개
외국인들을 대상으로 하는 한국어 교육 어플리케이션 입니다. 

총 3개의 난이도로 레벨이 구성되어 있고, 각 레벨에는 튜터와 각 튜터가 맡고 있는 코스가 있습니다. 사용자는 원하는 코스를 선택하여 코스의 강의를 수강한 후, 퀴즈를 통해 본인의 한국어 능력을 시험해볼 수 있습니다. 또한, Premium 과정을 통해 튜터와의 1대1 Private Class를 수강할 수도 있습니다.

# 역할
프론트엔드 개발을 담당하였고, 메인 기술스택은 `React Native`이다.

# Trouble Shooting & New Knowledge
## 1. scrollview child layout ( alignitems ) must be applied through the contentcontainerstyle prop  
ScrollView 안의 내용들을 중앙 정렬해주기 위해 alignItems 속성을 적용하려 했지만 제목과 같은 오류가 발생하였다.  

실제 ScrollView를 사용할 때 ScrollView 내부에 접근할 수 없는 컨테이너가 생성되기 때문에 이와 같은 오류가 발생한다고 한다.  
이 때, `contentContainerStyle props`를 이용해 이 컨테이너의 스타일을 부여가능하다.  
여기서 주의할 점은 contentContainerStyle props에 flexBasis를 0으로 설정하면 스크롤이 되지 않는 이슈가 발생한다.
```js
<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
  <View style={styles.empty}>
  </View>
</ScrollView>
```

## 2. StatusBar 가리기 - hidden 속성활용
화면에 따라 StatusBar를 가려야 할 때가 있었다.
```js
<StatusBar translucent={false} hidden={true} />
```
다음과 같이 hidden 속성을 사용하여 StatusBar를 가릴 수 있다.
[reactnative/docs/statusbar](https://reactnative.dev/docs/statusbar)

## 3. REACT-NATIVE-VIDEO (EVALUATING 'RCTVideolastance.Constants' error)
[react native video error](https://manon-kim.tistory.com/entry/React-Native-react-native-video)  
react native video 패키지를 사용하면서 제목과 같은 에러를 만났다.  
결국 위의 블로그로 해결을 하긴 하였지만, expo 환경에서는 expo video가 더 원활히 작동이 되는 것을 확인하였다.

## 4. Unable to resolve "@react-navigation/native" from "App.js" - React Native 
[Unable to resolve "@react-navigation/native" from "App.js"](https://stackoverflow.com/questions/60975287/unable-to-resolve-react-navigation-native-from-app-js-react-native-how)  

해당 패키지가 없을 때 나오는 에러라고 한다. 이럴 경우, 해당 패키지를 설치해주면 된다.  
```bash
npm install react-navigation
npm start -- --reset-cahce
```
만약 위와 같이 해결이 되지 않는다면, node_modules 폴더와 package-lock.json 을 모두 지운 뒤, npm install 명령을 실행하면 해결이 된다.

## 5. 특정 화면에서 tab bar 숨기기
[hide-tabbar](https://stackoverflow.com/questions/51352081/react-navigation-how-to-hide-tabbar-from-inside-stack-navigation)
```js
HomeStack.navigationOptions = ({ navigation }) => {

    let tabBarVisible = true;

    let routeName = navigation.state.routes[navigation.state.index].routeName

    if ( routeName == 'ProductDetails' ) {
        tabBarVisible = false
    }

    return {
        tabBarVisible,
    }
}
```
현재의 routeName을 가져와서 원하는 화면일 경우 tabBarVisible을 false로 설정해주면 된다.  

## 6. Values for opacity cannot be cast...
```js
opacity : (isCorrect && !isNext) ?? 0.5 
```
위 처럼 사용하면 오류가 난다. true, false 두 가지 경우 모두 style를 적용해줘야 오류가 나지 않는다

## 7. react-native image source 동적 삽입
[react-native image source 동적 삽입](https://090k.tistory.com/152)

Image 컴포넌트의 source 값을 동적으로 바꾸기 위해서는, require 안의 값을 변수로 받아와야 한다.  

```js
const a="flower"
require(`../img/navImg/015-${a}.png`);
```
require에 변수할당이 되지 않기 때문에 오류가 난다.

```js
const array = [
{
id: 0,
mytegory: "Flower",
src: require("../img/navImg/015-flower.png"),
text: "꽃선물",
},
{
id: 1,
mytegory: "Cloth",
src: require("../img/navImg/010-tshirt.png"),
text: "커플룩",
},
];
<Image
style={{
width: 30,
height: 30,
}}
source={array[list.id].src}
/>
```
배열에 저장되어 있는 값들을 토해 이미지를 동적으로 바꾸는 것이 가능하다.

## 8. export namespace should be first transformed by @babel/plugin-proposal-export-namespace-from
[export namespace should be first transformed by @babel/plugin-proposal-export-namespace-from](https://stackoverflow.com/questions/72927722/export-namespace-should-be-first-transformed-by-babel-plugin-proposal-export-n)  
react-native-reanimated/plugin 을 babel.config.js 파일의 plugins 배열에 넣어줘야 한다.
```js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ...
    'react-native-reanimated/plugin', // This line.
  ],
};
```
그리고 나서, `npm start -- --reset-cache` 명령어를 통해 캐시를 초기화해준다.

## 9. VirtualizedLists should never be nested inside plain ScrollViews
scrollview 안에 또 scrollview 가 있으면 이 오류가 난다.

## 10. Flatlist 스크롤 안되는 현상
[React Native: FlatList 스크롤이 안되는 현상](https://react-style.selfhow.com/post/?id=895)  
FlatList를 감싸는 부모의 컴포넌트의 크기를 안 잡아주면 스크롤이 안되는 현상이 발생할 수도 있다.  
FlatList를 감싸는 부모에 flex: 1 또는 flexGrow: 1를 추가하였는지 확인을 해줘야한다.  
그 후, FlatList에 contentContainerStyle 속성으로 flex: 1 또는 flexGrow: 1을 추가해주면 된다.
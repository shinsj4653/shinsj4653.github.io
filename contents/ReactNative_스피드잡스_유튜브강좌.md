---
date: '2022-08-29'
title: 'React Native - 유튜브 강의 정리'
categories: ['React Native']
summary: '스피드 잡스님와 신동규님의 유튜브 React Native 강의를 들으면서 배운 내용을 정리해보았다.'
thumbnail: './images/thumbnail-react-native.jpeg'
---

# React Native 설치 (Expo CLI)

## Node 설치

먼저 Node 설치가 완료된 상태여야 한다.

```bash
$ node -v
```

위 명령어로 Node 설치를 확인할 수 있다.

## CLI 설치

```bash
$ npm install -g expo-cli
$ expo init myProject
$ cd myProject
$ npm start # you can also use: expo start
```

## 가상 실행

실행전에 체크할 사항들이 있다.

- 안드로이드 SDK 및 Virtual Device가 설치 되어있는지 -> Android Studio 필요
- Xcode가 실행되어있고 설치가 되어있는지

```bash
# 아이폰
npm run ios

# 안드로이드
npm run android

```

## 본인 Device에서 실행

- 안드로이드 Device 앱스토어에서 expo 설치
  <br/><br/>
  설치가 완료되면 프로젝트 실행시 나오는 expo 웹 창의 `QR 코드` 를 스캔해주면 된다.

가상 기계에서 잘 작동되더라도, 막상 실제 디바이스에서는 안될 수 있다. 그래서 되도록 개발할 때는 실제 디바이스를 활용하는 것을 추천한다.

# React Native 설치 (React Native CLI)

Expo와는 다르게, React Native CLI를 활용하여 프로젝트를 생성하면 자동으로 ios 폴더와 android 폴더가 생성이 된다.
참고링크의 React Native CLI 설치 및 세팅하기 글을 참고하여 설치를 진행하였다.

## Chocolatey 설치

Chocolatey는 윈도우에서 필요한 패키지를 설치하고 관리하는 윈도우용 패키지 관리자이다. 이걸 활용하면 간단하게 필요한 패키지를 설치할 수 있다. 명령 프롬프트(cmd)를 관리자 권한으로 실행하고, 아래의 명령어를 실행하면된다.

```bash
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```

## Nodejs 설치

react-native는 javascript 이므로, javascript의 런타임인 Nodejs가 필요하다. cmd를 관리자 권한으로 실행한 후, 아래의 Chocolatey 명령어를 통해 Nodejs를 설치한다.

```bash
choco install -y nodejs.install

```

## python 설치

리액트 네이티브의 빌드 시스템은 파이썬을 사용한다. 맥(Mac)은 기본적으로 파이썬이 설치되어 있으므로, Python 설치 과정이 필요없지만, 윈도우(Windows)에서는 Python을 설치해줘야한다. cmd를 관리자 권한으로 실행한 후 아래의 Chocolatey 명령어를 통해 python을 설치한다.

```bash
choco install -y python2

```

## React Native CLI 설치

아래의 npm 명령어를 통해 설치를 해준다.

```bash
npm install -g react-native-cli

```

## JDK 설치

react-native로 안드로이드 앱을 개발하기 위해서는 JDK(Java Development Kit)를 설치할 필요가 있다. cmd를 관리자 권한으로 실행한 후, 아래의 Chocolatey 명령어를 실행하여 JDK 를 설치해준다.  
하지만, 여기서 나는 다음과 같은 오류가 발생하였다.

> Android Gradle plugin requires Java 11 to run. You are currently using Java 1.8.

다음 링크를 통해 JDK 11 를 설치하는 방법을 익혔다.

> [JDK 11 설치](https://reactnativecode.com/react-native-solve-android-gradle-plugin-requires-java-11-to-run-error-in-windows/)

본인 컴퓨터에서 사용하고 있는 JAVA 버전을 파악한 후, 이전 버전의 JAVA는 삭제를 해주면된다. 그리고 나서 새로운 버전을 설치하고, JAVA_HOME 환경변수를 설정해주면 된다.

## 안드로이드 스튜디오 설치

안드로이드 스튜디오를 설치하고 나서, SDK 와 환경변수 설정을 해주면 된다.

## 프로젝트 생성

아래의 React Native CLI 명령어를 통해 react-native 프로젝트를 생성한다.

```bash
npx react-native init SampleApp
```

프로젝트 생성 후, 다음 명령어로 안드로이드에서 실행이 가능하다.

```bash
cd SampleApp
# react-native run-android
npm run android
```

# 신동규님의 React Native 강좌

유튜브 강의를 들으면서 새로 알게된 점들을 정리해보았다.

## ScrollView와 FlatList의 차이점

둘 다 리스트 아이템을 렌더링하여 스크롤할 수 있는 형태로 보여주지만, ScrollView는 리스트의 아이템들을 모두 렌더링하는 반면에 FlatList는 `화면에 보이는` 아이템만 렌더링하는 특징을 가지고 있다.

## react-uuid 라이브러리

react에서 사용할 수 있는 라이브러리 중 하나이다. 리스트 아이템들에 각각 유니크한 key값을 부여하고 싶을 때, 다음과 같이 사용을 해주면 된다.

```js
import uuid from 'react-uuid'

const goalWithKey = goal => {
  key: uuid(),
  text: goal,
}
```

## Text나 Button 요소의 한계점

Text나 Button 컴포넌트에는 몇몇 styles 속성을 적용을 못한다. 따라서, `View` 컴포넌트로 감싸주어 styles속성을 부여해주면 된다.

```js
<View
  style={
    styles.closeButotnStyle /* Button에는 style이 안 먹힘.. -> View 로 감싸줘야 함 */
  }
>
  <Button onPress={closeModal} title="CLOSE" color="red" />
</View>
```

## props의 함수 명시 방법

```js
<TextInput
  value={enteredGoal}
  onChangeText={goalInputHandler} // goalInputHandler() -> 이런식으로 명시하면 App 실행될때 호출됨 -> 이벤트가 발생할때만 호출되도록 해야함
  style={styles.textInput}
  placeholder="Course goal!"
/>
```

## TouchableOpacity

react-native에서 제공해주는 컴포넌트이다. 어떠한 요소를 클릭했을 때 event가 발생하게끔 하려면 다음과 같이 활용을 해주면 된다.

```js
<TouchableOpacity onPress={props.deleteElement}>
  <View style={styles.goalItem}>
    <Text style={styles.goalText}>{props.text}</Text>
  </View>
</TouchableOpacity>
```

onPress 속성을 활용하여 원하는 이벤트 핸들러를 넣어주면 된다.

## bind 함수

[bind 함수 개념](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

```js
const deleteElement = goalKey => {
  setCourseGoals(currentGoals => {
    return currentGoals.filter(goal => goal.key !== goalKey)
  })
}
return (
  <FlatList
    data={courseGoals}
    renderItem={data => (
      <GoalItem
        deleteElement={deleteElement.bind(this, data.item.key)}
        text={data.item.text}
      />
    )}
  />
)
```

위와 같이 작성을 해주면, this 옆의 인수가 bind된 함수의 `파라미터` 로 전달이 된다.

# 참고링크

- [리액트 네이티브 강좌 - 스티브 잡스님](https://www.youtube.com/watch?v=Sr5UOR4llXY&list=PL60Uti4nULBN7EQYmgjksXJXnkufo0m-9)
- [리액트 네이티브 강좌 - 신동규님](https://www.youtube.com/watch?v=23feTKMubKA&list=PLG9rdv7aU2N7XZ-cqR-f0fewtOmY65Fwz&index=4)
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [React Native CLI 설치 및 세팅하기](https://dev-yakuza.posstree.com/ko/react-native/install-on-windows/)
- [TypeError: cli.init is not a function](https://stackoverflow.com/questions/72768245/typeerror-cli-init-is-not-a-function-for-react-native)

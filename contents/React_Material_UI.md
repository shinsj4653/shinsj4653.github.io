---
date: '2023-08-24'
title: '@mui/styles install 에러 해결'
categories: ['React', 'NodeJS']
summary: 'Material Ui의 스타일을 다루기 위해 @mui/styles를 install 하다가 에러 발생'
thumbnail: './images/thumbnail-react.jpeg'
---

다른 환경에서 블로그 레포지토리를 clone후, 실행하였을 때 다음과 같은 에러가 발생하였다.
```bash
npm install @mui/styles

npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR! 
npm ERR! While resolving: todoapp@0.1.0
npm ERR! Found: react@18.2.0
npm ERR! node_modules/react
npm ERR!   react@"^18.2.0" from the root project
npm ERR! 
npm ERR! Could not resolve dependency:
npm ERR! peer react@"^17.0.0" from @mui/styles@5.11.13
npm ERR! node_modules/@mui/styles
npm ERR!   @mui/styles@"*" from the root project
npm ERR! 
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force, or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
npm ERR! 
npm ERR! See /Users/seon-yujun/.npm/eresolve-report.txt for a full report.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/seon-yujun/.npm/_logs/2023-03-14T11_53_43_793Z-debug-0.log
```
위의 에러는 `리액트의 버전이 18로 업그레이드 한 이후, 특정 라이브러리를 설치할 때` 이러한 에러문구를 만날 수 있다.  

# 해결방법1
에러 코드를 읽어보면 참조가 꼬였다는 말을 하고 있는데, 이를 해결하려면 `--force`, `--legacy-peer-deps` 옵션을 추가하면 된다고 한다.  
- --force : 필요한 경우 패키지 의존성을 위해 추가적인 패키지를 설치하는 옵션
- --legacy-peer-deps : 충돌을 무시하고 설치하는 옵션
ex) npm install @mui/styles --legacy-peer-deps  
나는 해결방법1를 사용하였다.

## 해결방법2
위의 방법이 작동하지 않는다면, 다음 방법으로 해결 가능하다.
> 참조한 글 : https://github.com/npm/rfcs/discussions/283  
  
.npmrc 파일을 로컬에 추가하고,
```bash
legacy-peer-deps=true
```
위의 코드를 작성해주면 된다.  
유지보수가 되지 않는, 버전 업그레이드가 되지 않는 라이브러리를 사용해야할 때 이용하는 방법이다.  
> .npmrc: npm에 대한 comment가 실행될 때 어떻게 행동해야할지 정의하고 세팅할 수 있는 파일  
이외에도 npm 대신 `yarn`을 사용하면 되긴 한다는데, 이건 향후 좀 더 알아봐야 겠다.

# 참고링크
- [npm install 에러 해결하기(npm ERR! code ERESOLVE)](https://velog.io/@yujunsun0/npm-install-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0)
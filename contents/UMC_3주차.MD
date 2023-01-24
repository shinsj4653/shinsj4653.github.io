---
date: '2023-01-21'
title: 'UMC NodeJS - 3주차'
categories: ['NodeJS']
summary: 'UMC 동아리에서 진행한 3주차 세미나 및 스터디에서 배운 내용정리'
thumbnail: './images/thumbnail-nodejs.png'
---
UMC 활동 3주차 때 세미나에서 배운 내용과 스터디에서 토의한 내용을 정리해보았다.

# 개념 키워드
## Linux
리눅스가 많이 사용되는 이유로는 아무래도 경량된 OS 여서 서버로 많이 쓰일 수 있기 때문이다.  
라즈베리파이에서도 많이 사용되고, IoT 기반 서비스들이 거의 다 리눅스 기반이다.

## Linux의 종류
### centOS
The Community ENTerprise Operation System의 약자.  
레드햇(Red Hat) 엔터프라이즈 리눅스와 완전하게 호환되는 무료 기업용 리눅스 운영체제이다.  
리눅스 운영체제의 핵심인 `커널`은 리누스 토르발스에 의해 처음 만들어졌다.  
여기서 커널의 개념을 잠시 설명을 하겠다.  
  
소프트웨어가 컴퓨터 시스템에서 수행되기 위해서는 메모리에 그 프로그램이 올라가 있어야 한다. 운영체제 역시 컴퓨터 켜짐과 동시에 메모리에 올라가야한다.  
하지만, 운영체제처럼 규모가 큰 프로그램이 모두 메모리에 올라가면 메모리 공간의 낭비가 심해질 것 이다.  
따라서, 운영체제 중 `항상 필요한 부분` 만을 전원이 켜짐과 동시에 메모리에 올려놓고, 그렇지 않은 부분은 필요할 때 메모리에 올려서 사용을 한다.  
이 때 `메모리에 상주하는 운영체제 부분` 을 커널이라 한다.

### ubuntu
리눅스의 여러 배포판 중 하나인 데비안에서 또 한번 파생된 배포판이다.  

1. 개인용, 데스크탑 환경에 최적화
대부분의 리눅스 배포판들이 서버용으로 사용되고 있다. 우분투는 개인 사용자와 데스크탑 환경에 최적화 되도록 사용자 편의를 중점으로 개발되고 있다.

2. 자유 소프트웨어 기반
누구나 무료로 다운받아서 사용이 가능하다.

## AWS(Amazon Web Service)
전세게적으로 분포한 데이터 센터에서 200개가 넘는 완벽한 기능의 서비스를 제공하는, 세계적으로 가장 포괄적이며 널리 채택되고 있는 클라우드 플랫폼

## AWS EC2(Elastic Compute Cloud)
AWS에서 제공하는 클라우드 컴퓨팅 서비스.  
EC2의 장점은 다음과 같다.
- 용량을 쉽게 늘리거나 줄일 수 있다(탄력성)
- 저렴하다
- 사용자가 인스턴스를 완전히 제어가능하다.
- 보안 및 네트워크 구성, 스토리지 관리가 효과적이다.

## AWS Spot Instance vs On-demand
- Spot Instance: 온디맨드 가격보다 저렴한 비용으로 제공되는 예비 EC2 용량을 사용하는 인스턴스  
- On-demand: 장기 약정 없이 초 단위로 컴퓨팅 용량에 대해 비용을 지불  
수명주기를 완전하게 제어 가능하다.  

## AWS의 다양한 서비스
### S3 - 스토리지
Amazon Simple Storage Service
인터넷용 스토리지 서비스  
인터넷을 통해 언제 어디서는 원하는 양의 데이터를 저장하고 검색이 가능하다.  

### EC2 - 컴퓨팅
Amazon Elastic Compute Cloud  
크기를 조정할 수 있는 컴퓨팅 용량(=확장식 컴퓨팅)을 제공하는 웹 서비스
원하는 만큼 `가상 서버를 구축` 하고 보안 및 네트워크 구성과 스토리지 관리가 가능하다.

### RDS - 데이터베이스
Amazon Relational Database Service  
클라우드에서 관계형 데이터베이스를 더욱 쉽게 설치, 운영 및 확장할 수 있는 웹서비스  
산업 표준 관계형 데이터베이스를 위한 경제적이고 크기 조절이 가능한 용량을 제공한다.

### Storage vs Database
둘 다 저장장치의 역할을 한다.
스토리지는 파일저장소, 데이터베이스는 데이터를 저장한다.  
1차 스토리지 : 램(RAM)처럼, `내부 장치에 들어있는 데이터` 
2차 스토리지 : 테이프, 하드디스크 등 `외부 장치에 저장된 데이터`

## AWS 프리티어 과금(AWS Reduce Cost)
아마존에서는 신규 AWS 고객에게 1년간의 프리티어를 제공한다. 12개월동안 무료로 서비스를 이용하게 해주는 전략을 사용중이다. 다만, 12개월동안 AWS 서비스륾 마음대로 사용가능하긴 하지만, 제한된 한도량이 존재한다. 프리티어라도 한달동안 몇시간동안만 무료이며, 용량이나 트래픽 한도량이 존재한다. 만일 이를 초과할 경우, 과금이 되어 잘못하면 요금폭탄을 맞을 수도 있다.  
`즉, 프리티어라고 해서 그냥 1년내내 모든게 다 무료인 것은 아니다!`

# 미션
## 스탠다드 : AWS Elastic IP를 적용하여 http 외부접속 가능하게 Nginx, php, mysql 설치
AWS `EC2` 서비스에 들어가서 인스턴스를 하나 생성하였다.  
`WinSCP` 를 활용하여 `SSH 기반` 세션을 하나 생성하여 ubuntu 인스턴스를 외부 접속하였다.  
`Nginx, php, mysql` 패키지를 각각 설치해줬다.  
- 참고자료 : [ubuntu-18.04 에서 nginx, php, mysql 설치](https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-ubuntu-18-04)

여기서, php 패키지를 설치할 때 `php-fpm`이 필요하다. 그 이유는 nginx와 php를 연결해주기 때문이다. 설치 후, 이 설정을 nginx configuration 파일에서 해줬다.  
php와 nginx를 연동하였고, Datagrip를 활용하여 mysql에 외부 접속을 테스트하였다.   

- 참고자료 : [datagrip test](https://r-mango.tistory.com/13)  

phpmyadmin 를 설치후, 페이지를 직접 띄어보기도 하였다. 

- 참고자료 : [phpmyadmin 설치](https://choidr.tistory.com/entry/Ubuntu-1804에-phpmyadmin-설치Nginx)
Domain 생성 후 연결해주는 작업은 `가비아`에서 해줬다.
- 참고자료 : [https://happylulurara.tistory.com/146](https://happylulurara.tistory.com/146)

`Let's Encrypt`를 이용하여 HTTPS 까지 적용을 해줬다. 
- 참고자료 : [https://yusang.tistory.com/33?category=835611](https://yusang.tistory.com/33?category=835611)


## 챌린지 : Sub Domain 적용(dev, prod), Redirection 적용(ip to domain)
dev와 prod용 서버를 각각 생성을 해주었다.
- 참고자료 : [https://luminitworld.tistory.com/86](https://luminitworld.tistory.com/86)

Redirection 적용까지 해봤다. ip주소를 입력하면 자동으로 도메인 주소로 연결되게끔 해주는 것 이다.


# 트러블 슈팅
1. putty.exe를 찾을 수 없습니다.  
말 그대로 putty가 없어서 생기는 오류였다. 최신버전의 PuTTY를 깔아주니 해결이 되었다.
- 참고자료 : [https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)

2. Netwrok error: Connection timed out
인바운드 규칙을 제대로 설정을 안해줘서 그렇다. 기존의 SSH 22번 포트에 대한 규칙을 HTTP에 대한 규칙으로 모르고 바꿔버려서 오류가 생겼다.
- 참고자료 : [https://jg-han.tistory.com/96](https://jg-han.tistory.com/96)

3. phpmyadmin 페이지 : 404 not found
```bash
Nginx 문서 루트 디렉토리의 심볼릭 링크 설정 명령어를 수정함
sudo ln -s ...
-> -s 를 추가함!
```
그런데, `WARNING: Moudle mcrypt ini file doesn't exist` 오류가 발생하였다.
- 참고자료 : [mcrypt 문제해결](https://askubuntu.com/questions/998199/warning-module-mcrypt-ini-file-doesnt-exist-under-etc-php-7-2-mods-available)

4. Domain name needs at least one dot
https 적용 중, 도메인 이름을 처음에 umc-singjun 으로만 설정해준 것을 알았다...  
umc-singjun.shop 으로 설정을 해야했었다.  
하지만 `sudo ufw status` 명령어를 입력하니 `Status: inactive` 가 떴다.  
- 참고자료 : [https://kugancity.tistory.com/entry/ubuntu에서-방화벽-설정-UFW](https://kugancity.tistory.com/entry/ubuntu에서-방화벽-설정-UFW), [https://surprisecomputer.tistory.com/28](https://surprisecomputer.tistory.com/28)

5. sudo chmod -R 777
위 명령어를 쳤는데도 권한이 거부되었다고 떴다.  
/etc/ssh/sshd_config 파일을 수정하여 권한을 부여하니 에러를 해결할 수 있었다.
- 참고자료 : [https://choidr.tistory.com/entry/WinSCP-SFTP-Permission-Denied-ErrorAWS](https://choidr.tistory.com/entry/WinSCP-SFTP-Permission-Denied-ErrorAWS)

# 참고자료
- 운영체제와 커널이란
[https://goodmilktea.tistory.com/23](https://goodmilktea.tistory.com/23)
    
- Servlet이란
[https://mangkyu.tistory.com/14](https://mangkyu.tistory.com/14)
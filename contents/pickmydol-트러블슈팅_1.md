---
date: '2025-04-27'
title: 'Pickmydol - 30만 버스트 트래픽 환경 구성 트러블 슈팅 #1'
categories: ['Docker']
summary: 'Docker 관련 트러블 슈팅 정리'
thumbnail: './images/thumbnail-docker.jpg'
---

# 문제 개요

pickmydol 프로젝트에서 300,000 수준의 버스트 트래픽 테스트를 위해 nGrinder 기반 부하 테스트 환경을 구축하는 과정에서, Docker 컨테이너 간 네트워크 통신 문제가 발생했다. 테스트 환경은 Terraform을 이용해 AWS EC2 Spot 인스턴스 100대를 자동 구성하고, 각 인스턴스에 nGrinder Agent를 Docker로 배포하는 방식이었다.

## 문제 1: Docker standalone vs swarm 환경 설정 오류

🔥 문제 상황

docker stats 명령어로 확인 시 CPU 사용률이 300% 이상으로 비정상적으로 증가  

docker-compose.yml 내 deploy.resources.limits 설정이 적용되지 않음  

🧨 원인

deploy.resources.limits는 swarm 모드에서만 유효  

현재는 standalone 모드에서 docker run으로 실행 중이었기 때문에 설정이 무시됨  

✅ 해결 방법

Terraform의 launch_template에서 UserData 스크립트를 수정하여, EC2 생성 시 docker run에 --cpus, -m 옵션을 직접 지정

```bash
docker run -d \
  --name agent \
  --network host \
  -m 2g \
  --cpus=1.5 \
  -e NGRINDER_CONTROLLER=${controller_ip}:16001 \
  ngrinder/agent
```

## 문제 2: Agent-Controller 간 DNS 해석 오류

🔥 문제 상황

Agent 컨테이너에서 wget http://controller:80/agent/download 수행 시 bad address 'controller' 오류 발생

🧨 원인 분석

NGRINDER_CONTROLLER=controller:16001 환경변수로 설정했지만,

내부 스크립트는 controller라는 호스트명을 기반으로 wget 요청

그러나 standalone Docker 환경에서는 controller라는 이름의 호스트가 DNS에서 해석되지 않음

✅ 해결 방법

Docker 실행 시 --add-host=controller:${controller_ip} 옵션 추가하여 컨테이너 내부에서 controller 호스트를 직접 지정

```bash
docker run -d \
  --name agent \
  --network host \
  --add-host controller:${controller_ip} \
  -m 2g \
  --cpus=1.5 \
  -e NGRINDER_CONTROLLER=controller:16001 \
  ngrinder/agent
```

Terraform 내 agent_user_data.sh.tmpl 템플릿에서 ${controller_ip}는 templatefile() 함수로 동적으로 주입

Terraform 적용 시 유의 사항

⚠️ 단순히 terraform apply로는 user_data 변경이 반영되지 않음

user_data는 EC2 인스턴스 생성 시점에만 적용되므로, 기존 인스턴스에는 변경되지 않음

✅ 적용 방법 2가지

1. EC2 재생성

```bash
terraform taint aws_instance.ngrinder_agent
terraform apply
```

또는

```bash
terraform destroy -target=aws_instance.ngrinder_agent
terraform apply
```

2. 수동 재시작 (destroy 없이)

```bash
docker stop agent && docker rm agent
docker run ... --add-host controller:${controller_ip} ...
```


# 결과 및 회고

위 설정을 적용한 후, 모든 agent 인스턴스가 정상적으로 controller에 연결되었고, 300,000 트래픽을 분산 처리하는 테스트 환경 구축에 성공

Docker standalone 환경에서는 자원 제한 설정이 적용되지 않으므로 반드시 --cpus, -m 등의 명시적 옵션이 필요함

컨테이너 간 통신 오류 발생 시, DNS 해석 실패 여부를 반드시 먼저 확인하고 --add-host 옵션으로 빠르게 우회 가능

# 참고 명령어 요약

## ping으로 통신 확인 (EC2 기준)
ping 172.31.6.17

## controller가 agent 다운로드를 제공하는지 확인
curl http://172.31.6.17/agent/download/agent.zip

## 정상 연결된 경우
{
  "success" : true
}

# 마무리

nGrinder의 컨테이너 기반 트래픽 테스트 환경을 안정적으로 구성하는 데 있어, 네트워크 구조와 Docker의 실행 환경 차이에 대한 이해가 필수임을 실감했다.

특히 클라우드 환경에서는 작은 설정 하나가 수천 개 요청의 실패로 이어질 수 있기에, 세밀한 네트워크 분석과 자동화된 배포 전략의 중요성을 다시금 확인할 수 있었다.


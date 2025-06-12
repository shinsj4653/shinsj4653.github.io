---
date: '2025-06-03'
title: 'Pickmydol - 30만 버스트 트래픽 환경 구성 트러블 슈팅 #2'
categories: ['Kafka']
summary: 'Kafka 관련 트러블 슈팅 정리'
thumbnail: './images/thumbnail-kafka.png'
---

# 문제 개요
Kafka 기반 스트리밍 처리 환경에서 Redis 저장 병목과 메시지 수신 실패라는 두 가지 핵심 문제가 발생했다. 시스템은 Kafka → Redis → PostgreSQL 흐름을 기반으로, EC2 인스턴스에 Docker로 구성된 비동기 소비자 구조였다.  

## 문제 1: Kafka 단일 Partition으로 인한 Redis 병목
### 🔥 문제 상황
초기 Kafka Topic이 단일 Partition으로 구성되어 있었고, Consumer 또한 1개만 존재한 구조였다. 이 구조에서는 모든 메시지 처리를 하나의 Consumer가 담당하며, Redis 저장 작업도 병렬로 이루어지지 않아 Redis 병목이 발생했다.

### 🧨 원인
Kafka는 Partition 수에 따라 메시지가 Consumer에 분산된다. 하지만 단일 Partition → 단일 Consumer 구조에서는 수평 확장이 불가능했고, **burst 트래픽(300,000 수준)**을 감당하지 못하는 병목점이 되었다.

### ✅ 해결 방법

Kafka Topic을 300개 Partition으로 확장

동일한 group.id를 가진 Consumer 컨테이너를 여러 EC2 인스턴스에 분산 배포

Kafka의 Partition-to-Consumer Mapping 구조를 활용하여 Redis 저장 작업을 병렬 분산


### 📌 경험 요약
이 경험은 Kafka 구조에 대한 실전 이해를 바탕으로, 병목 지점 분석 → 구조 재설계를 통해 Burst 트래픽 처리용 아키텍처를 완성한 사례였다.

## 문제 2: Kafka Consumer 수신 실패 (advertised.listeners 설정 오류)
### 🔥 문제 상황
Kafka Consumer가 메시지를 수신하지 못하고 타임아웃이 지속 발생.

### 🧨 원인
Kafka server.properties 파일의 advertised.listeners 값이 localhost:9092로 고정되어 있었고, 외부에서 접속하는 EC2 기반 Consumer는 Private IP를 경유해 접근해야 했음.
→ Broker가 자신의 주소를 잘못 알려주는 구조였고, DNS 및 NAT 문제와 연결되어 통신이 실패함.

### ✅ 해결 방법

EC2 내 메타데이터에서 실제 Private IP를 동적으로 추출

advertised.listeners 값을 ${EC2_IP}:9092 형식으로 자동 주입하는 Shell Script 작성

Kafka를 재시작하여 Broker 주소를 올바르게 인식시킴

```bash
EC2_IP=$(curl -s http://169.254.169.254/latest/meta-data/local-ipv4)
echo "advertised.listeners=PLAINTEXT://${EC2_IP}:9092" >> /opt/kafka/config/server.properties
systemctl restart kafka
```

Kafka Consumer가 정상적으로 메시지를 수신함을 로그에서 확인했고, 안정적인 트래픽 수신이 가능해졌다.

### 📌 경험 요약
이 과정에서 Kafka 네트워크 구조와 EC2 내 메타데이터 활용, 동적 설정 주입 자동화에 대한 경험을 쌓았고, 클라우드 환경에서의 Kafka 운영 실무 감각을 체득할 수 있었다.

## 문제 3. Kafka 동기 방식 → 비동기 방식 전환 

### 🔥 문제 상황
기존에는 @KafkaListener 기반 동기 방식으로 Kafka 메시지를 수신하고, 각 메시지를 Redis에 저장

300,000 수준의 버스트 트래픽 처리 시 병목 발생

Consumer 한 대가 모든 부하를 감당

처리량, 타임아웃, 실패 대응 한계

### ✅ 해결 방법
💡 비동기 방식 도입
Reactor Kafka 기반의 KafkaReceiver 도입

메시지를 Flux 스트림으로 수신하여 .flatMap()으로 Redis 저장 처리

.timeout(), .subscribeOn(), .onErrorResume() 등을 활용해 다음을 구현:

타임아웃 처리

컨슈머 실패 시 fallback 처리

병렬 실행 제어

### 🔧 예시 코드 (Redis 저장)
```java
public Mono<Void> createVoteWithRedis(String name) {
    String redisKey = "vote:" + name;
    log.info("📌 Redis Increment 요청 Key: {}", redisKey);

    return redisTemplate.hasKey(redisKey)
            .flatMap(exists -> {
                if (exists != null && exists) {
                    return redisTemplate.opsForValue().increment(redisKey)
                            .doOnNext(count -> log.info("🔁 Redis Increment: {} -> {}", redisKey, count))
                            .then(); // Mono<Void>
                } else {
                    return redisTemplate.opsForValue().increment(redisKey)
                            .doOnNext(count -> log.info("🆕 Redis Increment + TTL 설정: {} -> {}", redisKey, count))
                            .then(redisTemplate.expire(redisKey, Duration.ofHours(2)));
                }
            });
}
```

### ✅ 기술 개념 정리
🔸 flatMap()과 then()의 차이
|항목|--|flatMap()|--|then()|  
반환값 사용	사용함	사용하지 않음
목적	값을 다음 연산으로 전달	순차 실행만 원할 때
반환 타입	Mono<R>	Mono<Void> 또는 연결 Mono 타입
예시	DB 결과로 분기 처리	작업 완료 후 로그 출력, TTL 설정 등

🔸 예시 비교
flatMap() 사용 시 (값을 활용해야 할 때)
java
복사
편집
.flatMap(count -> redisTemplate.expire(key, Duration.ofHours(2)))
then() 사용 시 (값 무시하고 다음 실행만)
java
복사
편집
.doOnNext(count -> log.info("..."))
.then(redisTemplate.expire(key, Duration.ofHours(2)))

### ✅ 주요 성과
300,000 트래픽 수준에서도 안정적인 메시지 처리 가능

Redis 저장 병목 제거

Reactive Stream 기반의 처리 흐름을 효과적으로 구성

트래픽 유실 없이 타임아웃 및 예외 상황 대응 가능


## 결과 및 회고
- Kafka 기반 비동기 구조의 성능 병목 원인을 진단하고 Topic 파티셔닝 및 Consumer 병렬 처리 구조로 개선

- Kafka의 외부 접속 설정 오류를 해결하여, 클라우드 내 자동화된 Broker 설정 구성 구축

- 300,000 트래픽 수용 테스트에서 안정적인 메시지 수신 및 Redis 처리 구조 검증

위의 개선사항을 토대로 서버 7대 기준, `300,000 버스트 트래픽 중, 약 29만건을 성공적으로 인식한 후 Valkey 캐시에 저장`할 수 있었다.

<iframe src="https://drive.google.com/file/d/1T3JBCq7wm_x2vhOhLCXr81ZaluORh19S/preview" 
        width="640" height="360" allow="autoplay" allowfullscreen>
</iframe>


하지만, 나머지 유실된 약 1만건은 아래 ngrinder agent 로그 처럼 504 Timeout Error가 뜬다.

```bash
2025-06-11 18:25:32,252 INFO  http://pickmydol-dev-alb-1687995646.ap-northeast-2.elb.amazonaws.com:81/api/v1/votes -> 504 Gateway Time-out, 132 bytes
2025-06-11 18:25:32,252 ERROR ❌ Error: Status 504, Body: <html>
<head><title>504 Gateway Time-out</title></head>
<body>
<center><h1>504 Gateway Time-out</h1></center>
</body>
</html>
```


따라서, 하기 개선사항을 계획하였고 향후 실행할 예정이다.

### ✅ 504 Gateway Timeout 대응 경험 기반 계획

실시간 투표 시스템을 개발하면서 처음에는 `504 Gateway Timeout`이 발생했을 때 Spring WebFlux 내부에서의 타임아웃 설정이나 Netty 관련 문제라고 판단했습니다. 하지만 로그를 자세히 분석해보니 실제 원인은 WebFlux 내부가 아니라, **AWS ALB(Application Load Balancer) 단에서 응답 지연으로 인해 504 오류가 발생하고 있었던 것**이었다.

즉, 서버는 정상적으로 작동하고 있었지만 ALB가 요청에 대 한 응답을 **기한 내에 받지 못해서 오류를 발생시킨 것**이었고, 이 문제는 WebFlux에서 직접 감지할 수 없는 외부 네트워크 계층의 장애였다.

그래서 아키텍처적으로 접근을 바꾸기로 하였다.  
**WebFlux 단에서의 오류 처리가 아닌, ALB를 거쳐 API를 호출하는 `nGrinder controller` 단에서 HTTP 응답 코드를 감지하고, 504 오류 발생 시에는 별도로 구성한 `/api/v1/dlq` API로 메시지를 분기 전송**하도록 처리 로직을 변경할 예정이다.  

이 `/dlq` API는 Kafka DLQ 토픽에 메시지를 발행하고, DLQConsumer는 실패 데이터를 분석 가능한 형태로 DB에 저장하여 나중에 재처리하거나, 실패 원인을 시각화하고 운영에 활용할 수 있도록 구성할 것 이다.  
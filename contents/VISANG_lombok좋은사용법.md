---
date: '2023-07-27'
title: '비상교육 현장실습 - @Lombok의 좋은 사용법'
categories: ['VISANG']
summary: '현장실습 프로젝트 때 사용하는 Lombok 라이브러리 내용 정리'
thumbnail: './images/thumbnail-visang.png'
---

@Data는 다음 값들을 모두 포함하고 있다.

```java
@ToString

@EqualsAndHashCode

@Getter

@Setter

@RequiredArgsConstructor
```

이번에 현장실습 프로젝트를 진행하면서 @Data를 아무 생각없이 주로 썼었는데 최근에 @Data를 쓰면 안되는 경우가 있다는 것을 알게 되었다. 이번 기회에 @Data를 쓰면 안되는 경우에 대해 정리해보고자 한다.

# @Setter는 안전하지 않다

Setter를 사용하게 되면 객체를 어디서든 수정할 수 있기 때문에 객체의 안정성을 보장받기 힘들다. 따라서 Setter를 사용하지 않고, 생성자를 통해 객체를 생성하고, 필요한 경우에만 Setter를 사용하는 것이 좋다.

# 양방향 연관관계에서 순환 참조 문제

@ToString을 사용하였는데 해당 DTO에 양방향 연관관계가 설정되어 있으면, ToString을 하는 과정에서 1번 엔티티가 연관관계의 2번 엔티티를 찾아 ToString하게 뿌리고, 2번 엔티티가 다시 또 연관관계에 있는 1번 엔티티를 찾아 뿌리고, 결국 무한루프에 빠지게 된다.  
@ToString을 사용하기 위해서는 양방향 연관관계에 있는 것을 제외시키면 된다.  
@Data를 쓰지 않고 따로 @ToString을 삽입하여 exclude 시켜줘야한다.

```java
@ToString(exclude = {"user"})
public class Address {
		private String postCode;
		private String address;
		private String detailAddress;
		private String extraAddress;
		private User user;
}
```

# @NoArgsConstructor 접근 권한 부여

@NoArgsConstructor에 (access = AccessLevel.PROTECTED)를 추가해주면, 해당 클래스의 기본 생성자의 접근 권한을 protected로 제한할 수 있다. 이 속성과 함께 Builder 패턴을 사용하여 생성자들 대신하여 사용해야 한다고 한다. 그 이유는, @NoArgsConstructor를 사용하면 기본 생성자가 생성되는데, 이 기본 생성자는 public으로 생성되기 때문에, 이를 막기 위해서 접근 권한을 protected로 제한해주는 것이다.

# 참고 링크

- [Lombok의 좋은 사용법](https://riimy.tistory.com/83)

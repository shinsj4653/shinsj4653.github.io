---
date: '2023-08-02'
title: '비상교육 현장실습 - MockMVC를 이용한 테스트'
categories: ['VISANG', 'Spring']
summary: 'MockMVC가 무엇인지, 그리고 이를 활용하여 테스트 코드를 작성해본 경험에 대해 정리'
thumbnail: './images/thumbnail-visang.png'
---

클라이언트 단에서 GET 요청을 할 시, Controller -> Service -> DAO -> MyBatis 쿼리를 실행하는 루틴을 테스트해야 하는 상황이었다. 테스트 환경에서는 실제 조회시와는 다르게 Controller로 요청이 날아오지 않기 때문에, 테스트를 위한 가짜 요청이 필요했고 이를 MockMVC가 담당하였다.

# MockMVC란

`개발한 웹 프로그램을 실제 서버에 배포하지 않고도 테스트를 위한 요청을 제공하는 수단`이다. MockMVC를 사용하면, 웹 서버를 실행하지 않고도 DispatcherServlet을 초기화할 수 있다. 따라서, 테스트 환경에서도 실제 서버를 실행하는 것과 동일한 테스트를 진행할 수 있다.

# MockMVC를 이용한 테스트

아래와 같은 테스트용 컨트롤러가 있다고 해보자.

```JAVA
@RestController
public class postsListController {

    @RequestMapping("/postsList")
    public String getPostsList() {
        return "This will return posts's URI.";
    }
}
```

위의 컨트롤러를 테스트해 보기 위해 다음과 같은 테스트 코드를 작성하였다.

```JAVA
@Autowired
postsListController postsListController;

@Autowired
private MockMvc mockMvc;

@Test
public void getPostsList() throws Exception {
    mockMvc.perform(
            MockMvcRequestBuilders.get("/postsList"))
            .andExpect(status().isOk())
            .andExpect(content().string("This will return posts's URI."))
            ;
}
```

MockMvcRequestBuilders.get() 메소드를 통해 GET 요청을 보내고, andExpect() 메소드를 통해 응답을 검증한다.

# 참고링크

- [MockMVC를 이용한 Controller 테스트](https://katfun.tistory.com/entry/Spring-MockMVC%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-Controller-%ED%85%8C%EC%8A%A4%ED%8A%B8-GET)

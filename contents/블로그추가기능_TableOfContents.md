---
date: '2022-08-14'
title: '블로그 기능 추가 2 - Table Of Contents'
categories: ['Gatsby', 'JavaScript']
summary: '블로그에 있는 각 게시글에 TOC를 어떻게 적용했는지 정리'
thumbnail: './images/thumbnail-gatsby.png'
---

# TOC 옵션 추가

블로그 글의 목차에 해당하는 Table Of Contents를 만들어보기로 하였다. 블로그 글의 내용의 h1, h2, h3 총 3종류의 태그를 중심으로 목차의 중심을 잡기로 결정하였다. 포스팅 글의 template을 담당하는 post_template.tsx에서 graphql 부분에 다음과 같이 코드를 수정하였다.

```js
export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          tableOfContents // 추가!
          html
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData
              }
              publicURL
            }
          }
        }
      }
    }
  }
`
```

query문에 tableOfContents를 추가해주면 자동적으로 마크다운 파일에서 h1, h2, h3 태그 정보들을 가져와준다. 수집된 헤더 정보들을 바탕으로 ul과 li 태그들을 자동으로 생성해주어서 너무 편리했다. GlobalStyles.tsx 파일에서 ul과 li 태그들의 스타일링까지 마무리를 해주었다. 하지만, 여기서 문제가 발생하였다.

# 첫번째 문제점 : 목차와 내용간의 Linking 문제

tableOfContents 정보는 잘 가져왔는데 클릭 시, 그 내용으로 글이 움직이질 않았다. 첫번째 참고 사이트대로 gatsby-remark-autolink-headers를 잘 설치하였고, gatsby-config.js에도 추가를 해주었는데도 링킹이 작동하지 않았다. 그래서, gatsby 공식문서를 읽어보기로 하였다.  
gatsby 공식문서의 gatsby-remark-autolink-headers 부분을 읽어보니, 자신이 링크를 걸어주고 싶은 헤더 태그를 직접 지정할 수 있는 옵션이 있었다.

```js
{
	resolve: `gatsby-transformer-remark`,
	options: {
		...
		{
       resolve: 'gatsby-remark-autolink-headers',
       options: {
         elements: [`h1`, `h2`, `h3`],
       },
     },
		 ...
	}
}
```

위와 같이 h1, h2, h3를 지정해주니, 성공적으로 linking 작업을 완료할 수 있었다.

# 두번째 문제점 : 뒤로가기 버튼 기능 상실

기존의 포스트 글에서 메인화면으로 돌아가는 뒤로가기 버튼은 다음과 같이 설계되어 있었다.

```js
const PostHeadInfo: FunctionComponent<PostHeadInfoProps> = function ({
  title,
  date,
  categories,
}) {
  const goBackPage = () => window.history.back()

  return (
    <PostHeadInfoWrapper>
      <PrevPageIcon onClick={goBackPage}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </PrevPageIcon>
      <Title>{title}</Title>
      <PostData>
        <div>{categories.join(' / ')}</div>
        <div>{date}</div>
      </PostData>
    </PostHeadInfoWrapper>
  )
}
```

하지만, ToC의 링크 작업 이후에는 Toc의 각 항목들을 누르면 사이트의 주소창의 정보가 그 누른 항목에 따라 바뀌게 된다. 즉, 뒤로가기를 누르면 메인화면으로 돌아가는 것이 아닌 이전에 클릭한 항목으로만 돌아가게 되었다.  
메인화면으로 돌아가게 하기 위해서 `location.replace('/')`를 활용하기로 하였다.

```js
const goBackPage = () => window.location.replace('/')
```

replace함수를 사용하게 되면 기존의 위치로 back하는 작업을 할 수 없다고 한다. 왜냐하면, currentPage 정보가 세션 히스토리에 저장되지 않기 떄문이다. 하지만 우리는 메인화면으로만 가면 되기 때문에 큰 문제는 없을 것 같다.

# 참고 사이트

- [Gatsby Blog에 목차 추가하기](https://soopdop.github.io/2020/12/03/add-table-of-content-gatsby/)

- [TOC option 추가](https://www.gatsbyjs.com/plugins/gatsby-remark-autolink-headers/)

- [location.replace()](https://developer.mozilla.org/ko/docs/Web/API/Window/history)

- [TOC 디자인 참고](https://enidanny.github.io/github%20blog/github-start-two/)

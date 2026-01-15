import React, { FunctionComponent, useMemo } from 'react'
import styled from '@emotion/styled'
import Footer from 'components/Common/Footer'
import Header from 'components/Common/Header'
import { CategoryListProps } from 'components/Main/CategoryList'
import Sidebar from 'components/Main/Sidebar'
import PostList from 'components/Main/PostList'
import { graphql } from 'gatsby'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import { PostListItemType } from 'types/PostItem.types'
import queryString, { ParsedQuery } from 'query-string'
import Template from 'components/Common/Template'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const MainContainer = styled.main`
  display: flex;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 24px;
  gap: 48px;
  flex: 1;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 24px 20px;
    gap: 0;
  }
`

const ContentArea = styled.div`
  flex: 1 1 0;
  width: 0;
  min-width: 0;
  overflow: hidden;

  @media (max-width: 1024px) {
    width: 100%;
    flex: none;
  }
`

type IndexPageProps = {
  location: {
    search: string
  }
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        siteUrl: string
      }
    }
    allMarkdownRemark: {
      edges: PostListItemType[]
    }
    file: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
      publicURL: string
    }
  }
}
const IndexPage: FunctionComponent<IndexPageProps> = function ({
  location: { search },
  data: {
    site: {
      siteMetadata: { title, description, siteUrl },
    },
    allMarkdownRemark: { edges },
    file: {
      childImageSharp: { gatsbyImageData },
      publicURL,
    },
  },
}) {
  const parsed: ParsedQuery<string> = queryString.parse(search)
  const selectedCategory: string =
    typeof parsed.category !== 'string' || !parsed.category
      ? 'All'
      : parsed.category

  const categoryList = useMemo(
    () =>
      edges.reduce(
        (
          list: CategoryListProps['categoryList'],
          {
            node: {
              frontmatter: { categories },
            },
          }: PostListItemType,
        ) => {
          categories.forEach(category => {
            if (list[category] === undefined) list[category] = 1
            else list[category]++
          })

          list['All']++

          return list
        },
        { All: 0 },
      ),
    [],
  )

  return (
    <Template
      title={title}
      description={description}
      url={siteUrl}
      image={publicURL}
    >
      <Container>
        <Header />
        <MainContainer>
          <Sidebar 
            profileImage={gatsbyImageData}
            selectedCategory={selectedCategory}
            categoryList={categoryList}
          />
          <ContentArea>
            <PostList selectedCategory={selectedCategory} posts={edges} />
          </ContentArea>
        </MainContainer>
        <Footer />
      </Container>
    </Template>
  )
}

export default IndexPage

export const getPostList = graphql`
  query getPostList {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 768, height: 400)
              }
            }
          }
        }
      }
    }
    file(name: { eq: "profile-image" }) {
      childImageSharp {
        gatsbyImageData(width: 120, height: 120)
      }
      publicURL
    }
  }
`

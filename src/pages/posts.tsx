import React, { FunctionComponent, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import { PostListItemType } from 'types/PostItem.types'
import queryString, { ParsedQuery } from 'query-string'
import Template from 'components/Common/Template'
import Header from 'components/Common/Header'
import Footer from 'components/Common/Footer'
import PostItem from 'components/Main/PostItem'
import SearchBar from 'components/Main/SearchBar'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const MainContent = styled.main`
  flex: 1;
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 24px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
`

const PageDescription = styled.p`
  font-size: 16px;
  color: var(--text-secondary);
  margin-bottom: 32px;
`

const CategoryTabs = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
  flex-wrap: wrap;
`

const CategoryTab = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${({ active }) => (active ? 'var(--text-primary)' : 'var(--bg-secondary)')};
  color: ${({ active }) => (active ? 'var(--bg-primary)' : 'var(--text-secondary)')};

  &:hover {
    background-color: ${({ active }) => (active ? 'var(--text-primary)' : 'var(--bg-tertiary)')};
  }

  body.dark & {
    background-color: ${({ active }) => (active ? 'var(--text-primary)' : 'var(--bg-secondary)')};
    color: ${({ active }) => (active ? 'var(--bg-primary)' : 'var(--text-secondary)')};
  }
`

const SearchWrapper = styled.div`
  margin-bottom: 24px;
`

const PostListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Placeholder = styled.div`
  text-align: center;
  padding: 60px 20px;
  font-size: 16px;
  color: var(--text-secondary);
  background-color: var(--bg-secondary);
  border-radius: 12px;
`

type PostsPageProps = {
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
      publicURL: string
    }
  }
}

const PostsPage: FunctionComponent<PostsPageProps> = function ({
  location: { search },
  data: {
    site: {
      siteMetadata: { title, description, siteUrl },
    },
    allMarkdownRemark: { edges },
    file: { publicURL },
  },
}) {
  const parsed: ParsedQuery<string> = queryString.parse(search)
  const [selectedCategory, setSelectedCategory] = useState<string>(
    typeof parsed.category === 'string' ? parsed.category : 'All'
  )
  const [searchKeyword, setSearchKeyword] = useState('')

  const categoryList = useMemo(
    () =>
      edges.reduce(
        (
          list: { [key: string]: number },
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
    [edges],
  )

  const filteredPosts = useMemo(() => {
    return edges.filter(({ node: { frontmatter } }) => {
      const { title, summary, categories } = frontmatter
      const matchesCategory = selectedCategory === 'All' || categories.includes(selectedCategory)
      const matchesSearch = 
        title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        summary.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        categories.join('').toLowerCase().includes(searchKeyword.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [edges, selectedCategory, searchKeyword])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value)
  }

  return (
    <Template
      title={`글 | ${title}`}
      description={description}
      url={`${siteUrl}/posts`}
      image={publicURL}
    >
      <Container>
        <Header />
        <MainContent>
          <PageTitle>Posts</PageTitle>
          <PageDescription>카테고리별 글 모음</PageDescription>

          <CategoryTabs>
            {Object.entries(categoryList).map(([name]) => (
              <CategoryTab
                key={name}
                active={name === selectedCategory}
                onClick={() => setSelectedCategory(name)}
              >
                {name === 'All' ? '전체' : name}
              </CategoryTab>
            ))}
          </CategoryTabs>

          <SearchWrapper>
            <SearchBar value={searchKeyword} onChange={handleSearchChange} />
          </SearchWrapper>

          <PostListWrapper>
            {filteredPosts.length > 0 ? (
              filteredPosts.map(
                ({
                  node: {
                    id,
                    fields: { slug },
                    frontmatter,
                  },
                }) => (
                  <PostItem {...frontmatter} link={slug} key={id} />
                ),
              )
            ) : (
              <Placeholder>검색 결과가 존재하지 않습니다.</Placeholder>
            )}
          </PostListWrapper>
        </MainContent>
        <Footer />
      </Container>
    </Template>
  )
}

export default PostsPage

export const getPostList = graphql`
  query getPostsPageList {
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
      publicURL
    }
  }
`


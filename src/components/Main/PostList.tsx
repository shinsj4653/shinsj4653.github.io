import React, { FunctionComponent, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import PostItem from 'components/Main/PostItem'
import { PostListItemType } from 'types/PostItem.types'
import useInfiniteScroll, {
  useInfiniteScrollType,
} from 'hooks/useInfiniteScroll'
import SearchBar from 'components/Main/SearchBar'

export type PostType = {
  node: {
    id: string
    frontmatter: {
      title: string
      summary: string
      date: string
      categories: string[]
      thumbnail: {
        publicURL: string
      }
    }
  }
}

type PostListProps = {
  selectedCategory: string
  posts: PostListItemType[]
}

const Container = styled.div`
  position: relative;
  width: 100%;
  min-width: 0;
`

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-shrink: 0;
`

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  flex-shrink: 0;
`

const SearchBarWrapper = styled.div`
  width: 100%;
  max-width: 300px;
  flex-shrink: 0;
`

const PostListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 400px;
  width: 100%;
`

const Placeholder = styled.div`
  text-align: center;
  padding: 60px 20px;
  font-size: 16px;
  color: var(--text-secondary);
  background-color: var(--bg-secondary);
  border-radius: 12px;
  width: 100%;
`
const PostList: FunctionComponent<PostListProps> = function ({
  selectedCategory,
  posts,
}) {
  const [searchKeyword, setSearchKeyword] = useState('')
  const { containerRef, postList }: useInfiniteScrollType = useInfiniteScroll(
    selectedCategory,
    posts,
  )

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value)
  }

  const filteredPosts = useMemo(() => {
    return postList.filter(({ node: { frontmatter } }) => {
      const { title, summary, categories } = frontmatter
      return (
        title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        summary.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        categories.join('').toLowerCase().includes(searchKeyword.toLowerCase())
      )
    })
  }, [searchKeyword, postList])

  return (
    <Container>
      <SectionHeader>
        <SectionTitle>최신 글</SectionTitle>
        <SearchBarWrapper>
          <SearchBar
            value={searchKeyword}
            onChange={handleSearchChange}
          />
        </SearchBarWrapper>
      </SectionHeader>
      <PostListWrapper ref={containerRef}>
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
    </Container>
  )
}

export default PostList
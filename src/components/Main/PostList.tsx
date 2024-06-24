import React, { FunctionComponent, useMemo, useState, useRef } from 'react'
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
  max-width: 768px;
  margin: 0 auto;
  padding: 50px 0;
`

const SearchBarWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
`

const PostListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  margin-top: 20px;
  min-width: 768px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 100%;
    padding: 0 20px;
  }
`

const Placeholder = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 50px 0;
  font-size: 18px;
  color: #888;
`
const PostList: FunctionComponent<PostListProps> = function ({
  selectedCategory,
  posts,
}) {

  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const { containerRef, postList }: useInfiniteScrollType = useInfiniteScroll(
    selectedCategory,
    posts,
  )

  const handleSearchChange = (event) => {
    const { scrollTop, scrollLeft } = containerRef.current

    setSearchKeyword(event.target.value)
    requestAnimationFrame(() => {
      containerRef.current.scrollTop = scrollTop
      containerRef.current.scrollLeft = scrollLeft
    })
  }

  const filteredPosts = useMemo(() => {
    return postList.filter(({ node: { frontmatter } }) => {
      const { title, summary, categories } = frontmatter
      return (
        title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        summary.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        categories.join('').toLowerCase().includes(searchKeyword.toLowerCase()) ||
        searchTerm.toLowerCase().includes(searchKeyword.toLowerCase()) 
        )
    })
  }, [searchKeyword, postList, searchTerm, selectedCategory, posts])

  return (
    <Container>
      <SearchBarWrapper>
        <SearchBar
          value={searchKeyword}
          onChange={handleSearchChange}
        />
      </SearchBarWrapper>
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
import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { PostFrontmatterType } from 'types/PostItem.types'

type PostItemProps = PostFrontmatterType & { link: string }

const PostItemWrapper = styled(Link)`
  display: block;
  padding: 24px;
  border-radius: 12px;
  background-color: var(--bg-primary);
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: var(--hover-bg);
    transform: translateY(-2px);
  }

  body.dark & {
    background-color: var(--bg-primary);

    &:hover {
      background-color: var(--hover-bg);
    }
  }
`

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`

const CategoryBadge = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: var(--accent-color);
`

const Date = styled.span`
  font-size: 13px;
  color: var(--text-tertiary);
`

const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
  line-height: 1.4;
  
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const Summary = styled.p`
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 12px;
  
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const Tag = styled.span`
  font-size: 12px;
  color: var(--text-tertiary);
  
  &::before {
    content: '#';
  }
`

const PostItem: FunctionComponent<PostItemProps> = function ({
  title,
  date,
  categories,
  summary,
  link,
}) {
  return (
    <PostItemWrapper to={link}>
      <PostMeta>
        {categories.length > 0 && (
          <CategoryBadge>{categories[0]}</CategoryBadge>
        )}
        <Date>{date}</Date>
      </PostMeta>
      
      <Title>{title}</Title>
      <Summary>{summary}</Summary>
      
      <TagList>
        {categories.map((category) => (
          <Tag key={category}>{category}</Tag>
        ))}
      </TagList>
    </PostItemWrapper>
  )
}

export default PostItem

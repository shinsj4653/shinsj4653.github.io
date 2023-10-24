import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { PostFrontmatterType } from 'types/PostItem.types'

type PostItemProps = PostFrontmatterType & { link: string }

// type PostItemProps = {
//   title: string
//   date: string
//   categories: string[]
//   summary: string
//   thumbnail: {
//     publicURL: string
//   }
//   link: string
// }

const ThumbnailImage = styled(GatsbyImage)`
  width: 100%;
  height: 200px;
  border-radius: 10px 10px 0 0;
`

const PostItemWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  transition: 0.3s box-shadow;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
`
const PostItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 15px;
`

const Title = styled.div`
  display: -webkit-box;
  overflow: hidden;
  margin-bottom: 3px;
  text-overflow: ellipsis;
  white-space: normal;
  overflow-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 20px;
  font-weight: 700;
`

const Date = styled.div`
  font-size: 14px;
  font-weight: 400;
  opacity: 0.7;
`

const Category = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  margin: 10px -5px;
`

const CategoryItem = styled.div`
  margin: 2.5px 5px;
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 700;
  color: white;
`

const Summary = styled.div`
  display: -webkit-box;
  overflow: hidden;
  margin-top: auto;
  text-overflow: ellipsis;
  white-space: normal;
  overflow-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 16px;
  opacity: 0.8;
`

const PostItem: FunctionComponent<PostItemProps> = function ({
  title,
  date,
  categories,
  summary,
  thumbnail: {
    childImageSharp: { gatsbyImageData },
  },
  link,
}) {
  return (
    <PostItemWrapper to={link}>
      <ThumbnailImage image={gatsbyImageData} alt="Post Item Image" />

      <PostItemContent>
        <Title>{title}</Title>
        <Date>{date}</Date>
        <Category>
          {categories.map(item => {
            switch (item) {
              case 'MarkDown':
                return (
                  <CategoryItem style={{ backgroundColor: '#000' }} key={item}>
                    {item}
                  </CategoryItem>
                )

              case 'FastCampus':
                return (
                  <CategoryItem
                    style={{ backgroundColor: '#E62249' }}
                    key={item}
                  >
                    {item}
                  </CategoryItem>
                )

              case 'JavaScript':
                return (
                  <CategoryItem
                    style={{ backgroundColor: '#FFE300', color: '#000' }}
                    key={item}
                  >
                    {item}
                  </CategoryItem>
                )

              case 'NodeJS':
                return (
                  <CategoryItem
                    style={{ backgroundColor: '#85BD6F', color: '#FFF' }}
                    key={item}
                  >
                    {item}
                  </CategoryItem>
                )

              case 'CSS':
                return (
                  <CategoryItem
                    style={{ backgroundColor: '#2794CD', color: '#FFF' }}
                    key={item}
                  >
                    {item}
                  </CategoryItem>
                )

              case 'HTML':
                return (
                  <CategoryItem
                    style={{ backgroundColor: '#F1672B', color: '#FFF' }}
                    key={item}
                  >
                    {item}
                  </CategoryItem>
                )

              case 'Github':
                return (
                  <CategoryItem
                    style={{ backgroundColor: '#E4E4E4', color: '#000' }}
                    key={item}
                  >
                    {item}
                  </CategoryItem>
                )

              case 'WebProgramming':
                return (
                  <CategoryItem
                    style={{ backgroundColor: '#000', color: '#FFF' }}
                    key={item}
                  >
                    {item}
                  </CategoryItem>
                )

              case 'KU':
                return (
                  <CategoryItem
                    style={{ backgroundColor: '#046B3F', color: '#FFF' }}
                    key={item}
                  >
                    {item}
                  </CategoryItem>
                )

              case 'Redux':
                return (
                  <CategoryItem
                    style={{ backgroundColor: '#8041C4', color: '#FFF' }}
                    key={item}
                  >
                    {item}
                  </CategoryItem>
                )

              case 'TypeScript':
                return (
                  <CategoryItem
                    style={{ backgroundColor: '#3178C6', color: '#FFF' }}
                    key={item}
                  >
                    {item}
                  </CategoryItem>
                )

              case 'MobX':
                return (
                  <CategoryItem
                    style={{ backgroundColor: '#e25f13', color: '#FFF' }}
                    key={item}
                  >
                    {item}
                  </CategoryItem>
                )

              case 'Gatsby':
                return (
                  <CategoryItem
                    style={{ backgroundColor: '#663399', color: '#FFF' }}
                    key={item}
                  >
                    {item}
                  </CategoryItem>
                )

              case 'Velopert':
                return (
                  <CategoryItem
                    style={{ backgroundColor: '#f7f7f7', color: '#000' }}
                    key={item}
                  >
                    {item}
                  </CategoryItem>
                )

              case 'React':
                return (
                  <CategoryItem
                    style={{ backgroundColor: '#00D8FF', color: '#000' }}
                    key={item}
                  >
                    {item}
                  </CategoryItem>
                )

              case 'CodingAngma':
                return (
                  <CategoryItem
                    style={{ backgroundColor: '#1E1E1E', color: '#fff' }}
                    key={item}
                  >
                    {item}
                  </CategoryItem>
                )

              case 'React Native':
                return (
                  <CategoryItem
                    style={{ backgroundColor: '#04A6CF', color: '#fff' }}
                    key={item}
                  >
                    {item}
                  </CategoryItem>
                )
              case 'React Query':
                return (
                  <CategoryItem
                    style={{ backgroundColor: '#264057', color: '#fff' }}
                    key={item}
                  >
                    {item}
                  </CategoryItem>
                )

              case 'Coding Test':
                return (
                  <CategoryItem
                    style={{ backgroundColor: '#264057', color: '#fff' }}
                    key={item}
                  >
                    {item}
                  </CategoryItem>
                )

              case 'UMC':
                return (
                  <CategoryItem
                    style={{ backgroundColor: '#00FF6F', color: '#000' }}
                    key={item}
                  >
                    {item}
                  </CategoryItem>
                )

              case 'Enwise':
                return (
                  <CategoryItem
                    style={{ backgroundColor: '#fff', color: '#000' }}
                    key={item}
                  >
                    {item}
                  </CategoryItem>
                )

              case 'Python':
                return (
                  <CategoryItem
                    style={{ backgroundColor: '#5194C8', color: '#fff' }}
                    key={item}
                  >
                    {item}
                  </CategoryItem>
                )

              case 'CodingApple':
                return (
                  <CategoryItem
                    style={{ backgroundColor: '#ff3d3d', color: '#fff' }}
                    key={item}
                  >
                    {item}
                  </CategoryItem>
                )

              case 'CS':
                return (
                  <CategoryItem
                    style={{ backgroundColor: '#7726EE', color: '#fff' }}
                    key={item}
                  >
                    {item}
                  </CategoryItem>
                )
              case 'Network':
                return (
                  <CategoryItem
                    style={{ backgroundColor: '#17d320', color: '#fff' }}
                    key={item}
                  >
                    {item}
                  </CategoryItem>
                )

              case 'Java':
                return (
                  <CategoryItem
                    style={{ backgroundColor: '#E51F24', color: '#fff' }}
                    key={item}
                  >
                    {item}
                  </CategoryItem>
                )

              case 'Spring':
                return (
                  <CategoryItem
                    style={{ backgroundColor: '#65B742', color: '#fff' }}
                    key={item}
                  >
                    {item}
                  </CategoryItem>
                )

              case 'VISANG':
                return (
                  <CategoryItem
                    style={{ backgroundColor: '#00B6E4', color: '#fff' }}
                    key={item}
                  >
                    {item}
                  </CategoryItem>
                )

              case 'AWS':
                return (
                  <CategoryItem
                    style={{ backgroundColor: '#F79300', color: '#fff' }}
                    key={item}
                  >
                    {item}
                  </CategoryItem>
                )

              case 'ElasticSearch':
                return (
                  <CategoryItem
                    style={{ backgroundColor: '#45B7AA', color: '#fff' }}
                    key={item}
                  >
                    {item}
                  </CategoryItem>
                )
            }
          })}
        </Category>
        <Summary>{summary}</Summary>
      </PostItemContent>
    </PostItemWrapper>
  )
}

export default PostItem

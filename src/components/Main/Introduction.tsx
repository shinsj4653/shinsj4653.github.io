import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import ProfileImage from 'components/Main/ProfileImage'
import backgroundImg from '../../assets/blog-banner-gray.jpg'

type IntroductionProps = {
  profileImage: IGatsbyImageData
}
// background-image: linear-gradient(60deg, #29323c 0%, #485563 100%);

const Background = styled.div`
  width: 100%;
  background-image: url(${backgroundImg});
  background-repeat: no-repeat;
  background-size: cover;
  color: #fff;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 768px;
  height: 400px;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
    padding: 0 20px;
  }
`

const SubTitle = styled.div`
  font-size: 20px;
  font-weight: 800;
  color: #000;
  @media (max-width: 768px) {
    font-size: 15px;
  }
`

const Title = styled.div`
  margin-top: 5px;
  font-size: 35px;
  font-weight: 900;
  color: #000;
  @media (max-width: 768px) {
    font-size: 25px;
  }
`

const Introduction: FunctionComponent<IntroductionProps> = function ({
  profileImage,
}) {
  return (
    <Background>
      <Wrapper>
        <ProfileImage profileImage={profileImage} />

        <div>
          <SubTitle>Nice to Meet You,</SubTitle>
          <Title>I'm Junior Frontend Developer Shin.</Title>
        </div>
      </Wrapper>
    </Background>
  )
}

export default Introduction

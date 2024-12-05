import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import ProfileImage from 'components/Main/ProfileImage'
import backgroundImage from '../../assets/banner.png'
import { FaGithub } from 'react-icons/fa'
import { SiNotion } from 'react-icons/si'
import { SiGmail } from 'react-icons/si'

type IntroductionProps = {
  profileImage: IGatsbyImageData
}
// background-image: linear-gradient(60deg, #29323c 0%, #485563 100%);
// const backgroundImage = '../../assets/banner.png'
const Background = styled.div`
  width: 100%;
  background-image: url(${backgroundImage});
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
  margin-bottom: 20px;
`

const goTo = (location: string) => {
  if (location == 'github') {
    window.open('https://github.com/shinsj4653', '_blank')
  } else if (location === 'notion') {
    window.open(
      'https://forested-dive-1ea.notion.site/Welcome-to-my-Notion-Page-0fda5a0b60d94c0bbd0ea579a226fc31',
      '_blank',
    )
  } else if (location === 'gmail') {
    window.open('mailto:shinsj4653@gmail.com', '_blank')
  }
}

const Introduction: FunctionComponent<IntroductionProps> = function ({
  profileImage,
}) {
  return (
    <Background>
      <Wrapper>
        <ProfileImage profileImage={profileImage} />
        <div>
          <SubTitle>Nice to Meet You,</SubTitle>
          <Title>I'm an Ardent Engineer Shin.</Title>
        </div>
        <div style={{ display: 'flex' }}>
          <FaGithub
            size="30"
            color="black"
            style={{ cursor: 'pointer', marginRight: '15px' }}
            title="Visit Github"
            onClick={() => {
              goTo('github')
            }}
          />
          <SiNotion
            size="30"
            color="black"
            style={{ cursor: 'pointer', marginRight: '15px' }}
            title="Visit Notion"
            onClick={() => {
              goTo('notion')
            }}
          />
          <SiGmail
            size="30"
            color="black"
            style={{ cursor: 'pointer' }}
            title="shinsj4653@gmail.com"
            onClick={() => {
              goTo('gmail')
            }}
          />
        </div>
      </Wrapper>
    </Background>
  )
}

export default Introduction

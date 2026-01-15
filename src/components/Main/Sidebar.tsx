import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { SiGmail } from 'react-icons/si'
import { Link } from 'gatsby'

type SidebarProps = {
  profileImage: IGatsbyImageData
  selectedCategory: string
  categoryList: {
    [key: string]: number
  }
}

const SidebarWrapper = styled.aside`
  width: 280px;
  flex-shrink: 0;
  
  @media (max-width: 1024px) {
    width: 100%;
    margin-bottom: 40px;
  }
`

const ProfileCard = styled.div`
  padding: 32px 24px;
  background-color: var(--bg-secondary);
  border-radius: 16px;
  text-align: center;
  margin-bottom: 24px;

  body.dark & {
    background-color: var(--bg-secondary);
  }
`

const ProfileImageWrapper = styled(GatsbyImage)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto 16px;
`

const ProfileName = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
`

const ProfileRole = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: var(--accent-color);
  margin-bottom: 16px;
`

const ProfileBio = styled.p`
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 20px;
`

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: var(--border-color);
  margin: 20px 0;
`

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--bg-primary);
  color: var(--text-secondary);
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--accent-color);
    color: white;
  }

  body.dark & {
    background-color: var(--bg-tertiary);
  }
`

const CategorySection = styled.div`
  padding: 24px;
  background-color: var(--bg-secondary);
  border-radius: 16px;

  body.dark & {
    background-color: var(--bg-secondary);
  }
`

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
`

const CategoryList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const CategoryItem = styled.li<{ active: boolean }>`
  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 12px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: ${({ active }) => (active ? '600' : '400')};
    color: ${({ active }) => (active ? 'var(--accent-color)' : 'var(--text-secondary)')};
    background-color: ${({ active }) => (active ? 'var(--bg-primary)' : 'transparent')};
    transition: all 0.2s ease;

    &:hover {
      background-color: var(--bg-primary);
      color: var(--text-primary);
    }

    body.dark & {
      background-color: ${({ active }) => (active ? 'var(--bg-tertiary)' : 'transparent')};
    }
  }
`

const CategoryCount = styled.span`
  font-size: 12px;
  color: var(--text-tertiary);
`

const Sidebar: FunctionComponent<SidebarProps> = function ({
  profileImage,
  selectedCategory,
  categoryList,
}) {
  return (
    <SidebarWrapper>
      <ProfileCard>
        <ProfileImageWrapper image={profileImage} alt="Profile" />
        <ProfileName>신성준</ProfileName>
        <ProfileRole>Database Engineer</ProfileRole>
        <ProfileBio>
          장애 대응과 고가용성 확보를 최우선으로 하여 24시간 멈추지 않는 서비스를 지향하는 DBA 입니다.
        </ProfileBio>
        <Divider />
        <SocialLinks>
          <SocialIcon 
            href="https://github.com/shinsj4653" 
            target="_blank" 
            rel="noopener noreferrer"
            title="GitHub"
          >
            <FaGithub size={20} />
          </SocialIcon>
          <SocialIcon 
            href="https://www.linkedin.com/in/seongjun-shin-an-ardent-developer/" 
            target="_blank" 
            rel="noopener noreferrer"
            title="LinkedIn"
          >
            <FaLinkedin size={20} />
          </SocialIcon>
          <SocialIcon 
            href="mailto:shinsj4653@gmail.com"
            title="Email"
          >
            <SiGmail size={18} />
          </SocialIcon>
        </SocialLinks>
      </ProfileCard>

      <CategorySection>
        <SectionTitle>카테고리</SectionTitle>
        <CategoryList>
          {Object.entries(categoryList).map(([name, count]) => (
            <CategoryItem key={name} active={name === selectedCategory}>
              <Link to={`/?category=${name}`}>
                <span>{name === 'All' ? '전체' : name}</span>
                <CategoryCount>{count}</CategoryCount>
              </Link>
            </CategoryItem>
          ))}
        </CategoryList>
      </CategorySection>
    </SidebarWrapper>
  )
}

export default Sidebar


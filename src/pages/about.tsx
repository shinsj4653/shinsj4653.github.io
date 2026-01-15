import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import Template from 'components/Common/Template'
import Header from 'components/Common/Header'
import Footer from 'components/Common/Footer'
import { FaGithub } from 'react-icons/fa'

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

const ProfileSection = styled.section`
  text-align: center;
  margin-bottom: 48px;
`

const ProfileImageWrapper = styled(GatsbyImage)`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 0 auto 24px;
`

const Name = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
`

const Role = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: var(--accent-color);
  margin-bottom: 16px;
`

const Quote = styled.blockquote`
  font-size: 16px;
  color: var(--text-secondary);
  font-style: italic;
  margin-bottom: 24px;
  padding: 0 20px;
`

const Bio = styled.p`
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto;
`

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: var(--border-color);
  margin: 40px 0;
`

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
`

const InfoItem = styled.div`
  text-align: center;
  padding: 20px;
  background-color: var(--bg-secondary);
  border-radius: 12px;

  body.dark & {
    background-color: var(--bg-secondary);
  }
`

const InfoLabel = styled.p`
  font-size: 13px;
  font-weight: 600;
  color: var(--text-tertiary);
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const InfoValue = styled.p`
  font-size: 15px;
  color: var(--text-primary);
  line-height: 1.5;
`

const Section = styled.section`
  margin-bottom: 48px;
`

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 24px;
`

const TimelineItem = styled.div`
  position: relative;
  padding-left: 24px;
  padding-bottom: 32px;
  border-left: 2px solid var(--border-color);

  &:last-child {
    padding-bottom: 0;
  }

  &::before {
    content: '';
    position: absolute;
    left: -6px;
    top: 6px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--accent-color);
  }
`

const TimelinePeriod = styled.p`
  font-size: 13px;
  font-weight: 600;
  color: var(--accent-color);
  margin-bottom: 4px;
`

const TimelineTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
`

const TimelineSubtitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 8px;
`

const TimelineDescription = styled.div`
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;

  ul {
    margin-top: 8px;
    padding-left: 16px;
  }

  li {
    margin-bottom: 4px;
  }
`

const ProjectCard = styled.div`
  padding: 20px;
  background-color: var(--bg-secondary);
  border-radius: 12px;
  margin-bottom: 16px;

  body.dark & {
    background-color: var(--bg-secondary);
  }
`

const ProjectTitle = styled.h4`
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
`

const ProjectDescription = styled.p`
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 8px;
`

const ProjectAchievements = styled.ul`
  font-size: 13px;
  color: var(--text-secondary);
  padding-left: 16px;
  line-height: 1.6;
`

const ActivityList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`

const ActivityItem = styled.span`
  padding: 8px 16px;
  background-color: var(--bg-secondary);
  border-radius: 20px;
  font-size: 14px;
  color: var(--text-secondary);

  body.dark & {
    background-color: var(--bg-secondary);
  }
`

const OpenSourceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const OpenSourceItem = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background-color: var(--bg-secondary);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--bg-tertiary);
    transform: translateX(4px);
  }

  body.dark & {
    background-color: var(--bg-secondary);

    &:hover {
      background-color: var(--bg-tertiary);
    }
  }
`

const OpenSourceIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--text-primary);
  color: var(--bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
`

const OpenSourceInfo = styled.div`
  flex: 1;
`

const OpenSourceName = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
`

const OpenSourcePR = styled.p`
  font-size: 13px;
  color: var(--text-secondary);
`

type AboutPageProps = {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        siteUrl: string
      }
    }
    file: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
      publicURL: string
    }
  }
}

const AboutPage: FunctionComponent<AboutPageProps> = function ({
  data: {
    site: {
      siteMetadata: { title, description, siteUrl },
    },
    file: {
      childImageSharp: { gatsbyImageData },
      publicURL,
    },
  },
}) {
  return (
    <Template
      title={`소개 | ${title}`}
      description={description}
      url={`${siteUrl}/about`}
      image={publicURL}
    >
      <Container>
        <Header />
        <MainContent>
          <ProfileSection>
            <ProfileImageWrapper image={gatsbyImageData} alt="Profile" />
            <Name>신성준</Name>
            <Role>DBA</Role>
            <Quote>
              "금융 서비스에서 트랜잭션의 안정성은 곧 사용자의 신뢰라고 생각합니다."
            </Quote>
            <Bio>
              장애 대응과 고가용성 확보를 최우선으로 하여 24시간 멈추지 않는 서비스를 지향합니다.
              안정적인 DB 운영을 넘어, 데이터 엔지니어링과 오픈소스 생태계 기여에 관심이 많습니다.
            </Bio>
          </ProfileSection>

          <Divider />

          <InfoGrid>
            <InfoItem>
              <InfoLabel>Email</InfoLabel>
              <InfoValue>shinsj4653@gmail.com</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Residence</InfoLabel>
              <InfoValue>Gyeonggi-do, South Korea</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Education</InfoLabel>
              <InfoValue>Konkuk National Univ.<br />Computer Science and Engineering<br />(2018.03 - 2025.02)</InfoValue>
            </InfoItem>
          </InfoGrid>

          <Section>
            <SectionTitle>Career</SectionTitle>

            <TimelineItem>
              <TimelinePeriod>25.11 ~ ing</TimelinePeriod>
              <TimelineTitle>Korea Credit Data</TimelineTitle>
              <TimelineSubtitle>Aurora MySQL, PostgreSQL DBA</TimelineSubtitle>
              <TimelineDescription>
                300만 사업자 서비스 캐시노트의 DB 시스템 운영
              </TimelineDescription>
            </TimelineItem>

            <TimelineItem>
              <TimelinePeriod>24.10 ~ 25.08</TimelinePeriod>
              <TimelineTitle>Shinhan DS</TimelineTitle>
              <TimelineSubtitle>Oracle DBA</TimelineSubtitle>
              <TimelineDescription>
                <ProjectCard>
                  <ProjectTitle>프로젝트 1: 데이터 이관 솔루션 성능 최적화</ProjectTitle>
                  <ProjectDescription>
                    운영 DB의 대용량 데이터를 개발/테스트 환경으로 이관하는 과정에서 발생하는 병목 현상과 데이터 깨짐 문제 해결
                  </ProjectDescription>
                  <ProjectAchievements>
                    <li>Sybase DB identity 속성을 활용한 병렬 처리 로직 구현</li>
                    <li>UTF-8/WIN949 문자셋 불일치 문제 해결 (KSC5601 변환)</li>
                    <li><strong>처리 속도 1,220% 향상</strong> (1억 건 이상 데이터 이관)</li>
                  </ProjectAchievements>
                </ProjectCard>

                <ProjectCard>
                  <ProjectTitle>프로젝트 2: SOL 서비스 DB 아카이빙 개선</ProjectTitle>
                  <ProjectDescription>
                    TB급 SOL 서비스 DB의 테이블스페이스 용량 급증에 따른 선제적 장애 예방
                  </ProjectDescription>
                  <ProjectAchievements>
                    <li>파티션 레벨 LOB 세그먼트 분석/점검 프로세스 도입</li>
                    <li>SQL 자동화 쉘 스크립트 개발로 수작업 분석 자동화</li>
                    <li><strong>월별 분석 작업 시간 1시간(연간 12시간) 절감</strong></li>
                  </ProjectAchievements>
                </ProjectCard>

                <ProjectCard>
                  <ProjectTitle>프로젝트 3: Oracle Tablespace 확장 자동화</ProjectTitle>
                  <ProjectDescription>
                    빈번한 Tablespace 확장 업무의 수작업 제거 및 휴먼 에러 방지
                  </ProjectDescription>
                  <ProjectAchievements>
                    <li>Non-OMF → OMF 방식 전환으로 잠재적 휴먼 오류 제거</li>
                    <li>SQL*Plus 기반 동적 쿼리 자동화 스크립트(auto_add.sh) 개발</li>
                    <li><strong>주당 작업 공수 91% 절감</strong> (10시간 → 0.9시간)</li>
                    <li>휴먼 에러 발생률 0% 달성</li>
                  </ProjectAchievements>
                </ProjectCard>
              </TimelineDescription>
            </TimelineItem>

            <TimelineItem>
              <TimelinePeriod>23.07 ~ 23.12</TimelinePeriod>
              <TimelineTitle>Visang Education</TimelineTitle>
              <TimelineSubtitle>Data Engineer</TimelineSubtitle>
              <TimelineDescription>
                <ProjectCard>
                  <ProjectTitle>데이터 포털 웹 서비스 개발</ProjectTitle>
                  <ProjectDescription>
                    여러 부서에 흩어져 있는 데이터에 대한 접근성 향상 및 데이터 요청/공유 프로세스 효율화
                  </ProjectDescription>
                  <ProjectAchievements>
                    <li>Elasticsearch Force Merge API 활용 <strong>검색 성능 60% 개선</strong></li>
                    <li>AWS VPC, NAT Gateway, Bastion Host 기반 보안 인프라 구축</li>
                    <li>안전한 데이터 접근을 위한 클라우드 보안 아키텍처 설계</li>
                  </ProjectAchievements>
                </ProjectCard>
              </TimelineDescription>
            </TimelineItem>
          </Section>

          <Section>
            <SectionTitle>Activity</SectionTitle>
            <ActivityList>
              <ActivityItem>BOAZ (24.01 ~ 25.01)</ActivityItem>
              <ActivityItem>GDSC (23.07 ~ 24.07)</ActivityItem>
            </ActivityList>
          </Section>

          <Section>
            <SectionTitle>Open Source</SectionTitle>
            <OpenSourceList>
              <OpenSourceItem 
                href="https://github.com/apache/airflow/pull/56062" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <OpenSourceIcon>
                  <FaGithub size={20} />
                </OpenSourceIcon>
                <OpenSourceInfo>
                  <OpenSourceName>Apache Airflow Contributor</OpenSourceName>
                  <OpenSourcePR>@PR #56062: apache/airflow</OpenSourcePR>
                </OpenSourceInfo>
              </OpenSourceItem>
              <OpenSourceItem 
                href="https://github.com/elastic/elasticsearch/pull/128429" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <OpenSourceIcon>
                  <FaGithub size={20} />
                </OpenSourceIcon>
                <OpenSourceInfo>
                  <OpenSourceName>Elasticsearch Contributor</OpenSourceName>
                  <OpenSourcePR>@PR #128429: elastic/elasticsearch</OpenSourcePR>
                </OpenSourceInfo>
              </OpenSourceItem>
            </OpenSourceList>
          </Section>
        </MainContent>
        <Footer />
      </Container>
    </Template>
  )
}

export default AboutPage

export const getAboutData = graphql`
  query getAboutData {
    site {
      siteMetadata {
        title
        description
        siteUrl
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

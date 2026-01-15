import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { SiGmail } from 'react-icons/si'

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 40px 20px;
  border-top: 1px solid var(--border-color);
  background-color: var(--bg-secondary);

  body.dark & {
    background-color: var(--bg-secondary);
  }
`

const Copyright = styled.p`
  font-size: 14px;
  color: var(--text-secondary);
`

const FooterLinks = styled.div`
  display: flex;
  gap: 16px;
`

const FooterLink = styled.a`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--text-tertiary);
  transition: color 0.2s ease;

  &:hover {
    color: var(--text-primary);
  }
`

const Footer: FunctionComponent = function () {
  const now = new Date()
  const year: number = now.getFullYear()

  return (
    <FooterWrapper>
      <Copyright>© {year} Seongjun Shin Tech Blog</Copyright>
      <FooterLinks>
        <FooterLink 
          href="https://github.com/shinsj4653" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <FaGithub size={16} />
          GitHub
        </FooterLink>
        <FooterLink 
          href="https://www.linkedin.com/in/seongjun-shin-an-ardent-developer/" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <FaLinkedin size={16} />
          LinkedIn
        </FooterLink>
        <FooterLink href="mailto:shinsj4653@gmail.com">
          <SiGmail size={14} />
          Contact
        </FooterLink>
      </FooterLinks>
    </FooterWrapper>
  )
}

export default Footer

import React, { FunctionComponent, useState } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 40px;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.3s ease;

  body.dark & {
    background-color: rgba(26, 26, 26, 0.9);
  }

  @media (max-width: 768px) {
    padding: 12px 20px;
  }
`

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  text-decoration: none;
  
  &:hover {
    color: var(--accent-color);
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`

const LogoIcon = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 6px;
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 32px;

  @media (max-width: 768px) {
    display: none;
  }
`

const NavLink = styled(Link)`
  font-size: 15px;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: var(--text-primary);
  }

  &.active {
    color: var(--text-primary);
    font-weight: 600;
  }
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--text-primary);
  padding: 4px;

  @media (max-width: 768px) {
    display: block;
  }
`

const MobileNav = styled.nav<{ isOpen: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    background-color: var(--bg-primary);
    border-bottom: 1px solid var(--border-color);
    padding: 16px 20px;
    gap: 16px;

    body.dark & {
      background-color: var(--bg-primary);
    }
  }
`

const MobileNavLink = styled(Link)`
  font-size: 16px;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  padding: 8px 0;

  &:hover {
    color: var(--text-primary);
  }
`

const Header: FunctionComponent = function () {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <HeaderWrapper>
      <Logo to="/">
        <LogoIcon src="/triforce.png" alt="Blog Icon" />
        Shin's Dev Blog
      </Logo>
      
      <Nav>
        <NavLink to="/">홈</NavLink>
        <NavLink to="/posts">글</NavLink>
        <NavLink to="/about">소개</NavLink>
      </Nav>

      <RightSection>
        <MobileMenuButton onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </RightSection>

      <MobileNav isOpen={isMobileMenuOpen}>
        <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>홈</MobileNavLink>
        <MobileNavLink to="/posts" onClick={() => setIsMobileMenuOpen(false)}>글</MobileNavLink>
        <MobileNavLink to="/about" onClick={() => setIsMobileMenuOpen(false)}>소개</MobileNavLink>
      </MobileNav>
    </HeaderWrapper>
  )
}

export default Header


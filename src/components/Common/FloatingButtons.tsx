import React, { useState, useEffect, FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import { BsFillSunFill, BsFillMoonStarsFill } from 'react-icons/bs'
import { FaArrowUp } from 'react-icons/fa'

const FloatingContainer = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 100;

  @media (max-width: 768px) {
    bottom: 16px;
    right: 16px;
  }
`

const FloatingButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  body.dark & {
    background-color: var(--bg-secondary);
    border-color: var(--border-color);
  }

  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
    font-size: 16px;
  }
`

const ThemeButtonStyled = styled.label`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  body.dark & {
    background-color: var(--bg-secondary);
    border-color: var(--border-color);
  }

  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
    font-size: 16px;
  }
`

type FloatingButtonsProps = {
  showTopBelow?: number
}

const FloatingButtons: FunctionComponent<FloatingButtonsProps> = function ({
  showTopBelow = 300,
}) {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > showTopBelow) {
        setShowTop(true)
      } else {
        setShowTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showTopBelow])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <FloatingContainer>
      {showTop && (
        <FloatingButton onClick={scrollToTop} aria-label="Scroll to top">
          <FaArrowUp />
        </FloatingButton>
      )}
      <ThemeToggler>
        {({ theme, toggleTheme }: { theme: string; toggleTheme: (theme: string) => void }) => (
          <ThemeButtonStyled>
            <input
              type="checkbox"
              onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
              checked={theme === 'dark'}
              style={{ display: 'none' }}
            />
            {theme === 'dark' ? <BsFillSunFill /> : <BsFillMoonStarsFill />}
          </ThemeButtonStyled>
        )}
      </ThemeToggler>
    </FloatingContainer>
  )
}

export default FloatingButtons

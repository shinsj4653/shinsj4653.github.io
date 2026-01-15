import React from 'react'
import styled from '@emotion/styled'
import { FaSearch } from 'react-icons/fa'

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
`

const SearchIcon = styled.div`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-tertiary);
  display: flex;
  align-items: center;
  pointer-events: none;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 42px;
  font-size: 14px;
  font-family: inherit;
  background-color: var(--bg-secondary);
  border: 1px solid transparent;
  border-radius: 10px;
  color: var(--text-primary);
  transition: all 0.2s ease;

  &::placeholder {
    color: var(--text-tertiary);
  }

  &:hover {
    background-color: var(--bg-tertiary);
  }

  &:focus {
    background-color: var(--bg-primary);
    border-color: var(--accent-color);
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
    outline: none;
  }

  body.dark & {
    background-color: var(--bg-secondary);
    
    &:hover {
      background-color: var(--bg-tertiary);
    }
    
    &:focus {
      background-color: var(--bg-primary);
      box-shadow: 0 0 0 3px rgba(102, 179, 255, 0.1);
    }
  }
`

type SearchBarProps = {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChange, 
  placeholder = "검색어를 입력하세요..." 
}) => {
  return (
    <SearchWrapper>
      <SearchIcon>
        <FaSearch size={14} />
      </SearchIcon>
      <SearchInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </SearchWrapper>
  )
}

export default SearchBar

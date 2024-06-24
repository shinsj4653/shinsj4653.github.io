import React from 'react'
import styled from '@emotion/styled'

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin-bottom: 20px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: #007acc;
    box-shadow: 0 0 5px rgba(0, 122, 204, 0.5);
    outline: none;
  }
`

const SearchBar = ({ value, onChange }) => {
  return (
    <SearchInput
      type="text"
      placeholder="검색할 내용을 입력하세요."
      value={value}
      onChange={onChange}
    />
  )
}

export default SearchBar
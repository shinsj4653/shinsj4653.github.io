import React, { FunctionComponent } from 'react'
import { Global, css } from '@emotion/react'

const defaultStyle = css`
  @import url('https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&display=swap');

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Nanum Myeongjo', serif;
  }

  html,
  body,
  #___gatsby {
    height: 100%;
  }

  body::-webkit-scrollbar {
    width: 8px;
  }

  body::-webkit-scrollbar-thumb {
    height: 30%;
    background: #747474;

    border-radius: 10px;
  }

  body::-webkit-scrollbar-track {
    background: rgba(33, 122, 244, 0.1);
  }

  a,
  a:hover {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }
`

const GlobalStyle: FunctionComponent = function () {
  return <Global styles={defaultStyle} />
}

export default GlobalStyle

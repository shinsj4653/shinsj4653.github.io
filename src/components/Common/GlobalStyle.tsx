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
  body {
    --bg: white;
    --textNormal: #222;
    --textTitle: #222;
    --textLink: blue;
    --hr: hsla(0, 0%, 0%, 0.2);

    background-color: var(--bg);
    code.language-text {
      color: #fff;
      background-color: #000;
    }
    .css-m14mk4-MarkdownRenderer a {
      color: #0800ff;
      text-decoration: underline;
    }
    .css-2whywe-NotFoundPageWrapper {
      color: black;
    }
    .css-czusl8-IconButton {
      background-color: #fff;
      color: #333;
      border: 2px solid #333;
    }
  }
  body.dark {
    --bg: #212529;
    --textNormal: rgba(255, 255, 255, 0.88);
    --textTitle: white;
    --textLink: yellow;
    --hr: hsla(0, 0%, 100%, 0.2);
    code.language-text {
      color: #000;
      background-color: #fff;
    }
    .css-m14mk4-MarkdownRenderer a {
      color: yellow;
      text-decoration: underline;
    }
    .css-2whywe-NotFoundPageWrapper {
      color: white;
    }
    .css-czusl8-IconButton {
      background-color: #333;
      color: #fff;
      border: 2px solid #fff;
    }
  }

  body *::selection {
    background: gray;
    color: #fff;
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
    background: #d0d0d0;
  }

  a,
  a:hover {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  input[type='checkbox'] {
    display: none;
  }
`

const GlobalStyle: FunctionComponent = function () {
  return <Global styles={defaultStyle} />
}

export default GlobalStyle

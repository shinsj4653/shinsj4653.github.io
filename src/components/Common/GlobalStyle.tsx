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
    .table-of-content {
      background-color: #fafafa;
    }
    .content a {
      color: #0800ff;
      text-decoration: underline;
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
    .table-of-content {
      background-color: #2d2d2d;
    }
    .content a {
      color: var(--textLink);
      text-decoration: underline;
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
  .blog-post-container {
    display: flex;
    flex-direction: row;
    padding: 0 200px;
    margin-top: 100px;
    .content {
      flex-grow: 0;
      max-width: calc(100% * 2 / 3);
      flex-basis: calc(100% * 2 / 3);
      margin-right: 50px;
    }
    .table-of-content::before {
      width: 100%;
      display: block;
      content: '📃 On This Page';
      background-color: gray;
      color: white;
      font-weight: 900;
      padding: 5px;
    }
    .table-of-content {
      box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.25);
      border-radius: 7px;
      top: 90px;
      flex-grow: 0;
      min-width: 400px;
      max-width: calc(100% / 3);
      flex-basis: calc(100% / 3);
      margin-left: 1rem;
      max-width: 18rem;
      max-height: calc(100vh - 200px);
      position: sticky;
      overflow: auto;

      ul li a {
        padding: 8px;
        width: 100%;
        border-bottom: 1px solid lightgray;
      }

      // h1
      ul li a {
        display: block;

        font-size: 15px;
      }

      // h2
      ul li ul li a {
        display: block;
        font-size: 14px;
        padding-left: 15px;
      }

      // h3
      ul li ul li ul li a {
        display: block;
        font-size: 13px;
        padding-left: 30px;
      }
    }
  }
  .table-of-content::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .table-of-content::-webkit-scrollbar-thumb {
    height: 30%;
    background: #747474;

    border-radius: 10px;
  }

  .table-of-content::-webkit-scrollbar-track {
    background: #d0d0d0;
  }
  @media (max-width: 1460px) {
    .blog-post-container {
      width: 100%;
      padding: 0 20px;
      flex-direction: column-reverse;
      align-items: center;
      .content {
        width: inherit;
      }
      .table-of-content {
        min-width: calc(100% * 2 / 3);
        top: 0;
        position: relative;
        margin-bottom: 50px;
      }
    }
  }
`

const GlobalStyle: FunctionComponent = function () {
  return <Global styles={defaultStyle} />
}

export default GlobalStyle

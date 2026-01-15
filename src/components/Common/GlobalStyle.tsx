import React, { FunctionComponent } from 'react'
import { Global, css } from '@emotion/react'

const defaultStyle = css`
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

  :root {
    /* Light Mode Colors */
    --bg-primary: #ffffff;
    --bg-secondary: #f8f9fa;
    --bg-tertiary: #f1f3f4;
    --text-primary: #212529;
    --text-secondary: #6c757d;
    --text-tertiary: #adb5bd;
    --border-color: #e9ecef;
    --accent-color: #0066cc;
    --hover-bg: #f8f9fa;
    
    /* Category Colors */
    --category-dev: #3182ce;
    --category-opensource: #38a169;
    --category-retrospect: #d69e2e;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  html,
  body,
  #___gatsby {
    height: 100%;
  }

  body {
    --bg: var(--bg-primary);
    --textNormal: var(--text-primary);
    --textTitle: var(--text-primary);
    --textLink: var(--accent-color);
    --hr: var(--border-color);

    background-color: var(--bg);
    color: var(--textNormal);
    line-height: 1.6;
    
    code.language-text {
      color: #fff;
      background-color: #1a1a1a;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.9em;
    }
    .css-m14mk4-MarkdownRenderer a {
      color: var(--accent-color);
      text-decoration: underline;
    }
    .css-2whywe-NotFoundPageWrapper {
      color: var(--text-primary);
    }
    .css-czusl8-IconButton {
      background-color: var(--bg-primary);
      color: var(--text-primary);
      border: 1px solid var(--border-color);
    }
    .table-of-content {
      background-color: var(--bg-secondary);
    }
    .content a {
      color: var(--accent-color);
      text-decoration: underline;
    }
  }

  body.dark {
    --bg-primary: #1a1a1a;
    --bg-secondary: #242424;
    --bg-tertiary: #2d2d2d;
    --text-primary: #e9ecef;
    --text-secondary: #adb5bd;
    --text-tertiary: #6c757d;
    --border-color: #3d3d3d;
    --accent-color: #66b3ff;
    --hover-bg: #2d2d2d;

    --bg: var(--bg-primary);
    --textNormal: var(--text-primary);
    --textTitle: var(--text-primary);
    --textLink: var(--accent-color);
    --hr: var(--border-color);

    code.language-text {
      color: #e9ecef;
      background-color: #2d2d2d;
    }
    .css-m14mk4-MarkdownRenderer a {
      color: var(--accent-color);
      text-decoration: underline;
    }
    .css-2whywe-NotFoundPageWrapper {
      color: var(--text-primary);
    }
    .css-czusl8-IconButton {
      background-color: var(--bg-secondary);
      color: var(--text-primary);
      border: 1px solid var(--border-color);
    }
    .table-of-content {
      background-color: var(--bg-secondary);
    }
    .content a {
      color: var(--accent-color);
      text-decoration: underline;
    }
    /* Dark mode table styles */
    table th,
    table td {
      border-color: var(--border-color);
    }
    table th {
      background-color: var(--bg-secondary);
    }
    table tr:nth-of-type(even) {
      background-color: var(--bg-tertiary);
    }
    table tr:hover {
      background-color: #363636;
    }
  }

  body *::selection {
    background: gray;
    color: #fff;
  }

  body::-webkit-scrollbar {
    width: 10px;
    height: 10px;
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
    margin: 100px auto 0;

    width: calc(100% * 2 / 3);
    .content {
      flex-grow: 0;
      width: 100%;
      flex-basis: calc(100% * 2 / 3);
      margin-right: 1rem;
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
      width: 90%;
      flex-basis: calc(100% / 3);
      margin-left: 0rem;
      max-height: calc(100vh - 200px);
      position: sticky;
      overflow: auto;
      margin-left: 1rem;

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

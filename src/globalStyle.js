import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  :root {
    --color-heading: #1e266d;
    --color-text: #455880;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body,
  ul,
  ol,
  li,
  figure,
  figcaption,
  blockquote,
  dl,
  dd {
    margin: 0;
  }

  html, body {
    overflow-x: hidden;
  }

  body {
    min-height: 100vh;
    scroll-behavior: smooth;
    text-rendering: optimizeSpeed;
    font-family: 'Lato', Arial;
    line-height: 1.5;
  }


  h1, h2, h3, h4, h5 {
    margin-top: 0;
    margin-bottom: 0.5em;
  }

  h2 {
    font-size: 36px;

  }

  h3 {
    font-size: 30px;
  }

  @media screen and (max-width: 800px) {
    h2 {
      font-size: 28px;
    }

    h3 {
      font-size: 20px;
    }
  }

  ul {
    padding-left: 25px;
  }

  ul > li > p {
      margin-bottom: 0;
  }

  ul > li > ul {
      margin-bottom: 0.75em;
      padding-left: 15px;
  }

  img {
    max-width: 100%;
  }

  hr {
    border: none;
    border-top: 1px solid #e8e8e8;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  a {
    text-decoration: none;
  }

  p {
    margin-bottom: 20px;
    margin-top: 0;
    max-width: 680px;
  }

 input[type="text"],
  input[type="email"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
  }

  textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
  }

  select {
    padding: 8px 10px;
    width: 100%;
  }
`

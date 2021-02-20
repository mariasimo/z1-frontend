import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  * {
    box-sizing:border-box;
  }
  html {
    --color-text: black;
    --color-background: white;
    --color-primary: #2F0079;
    --color-primary-rgb: 47,0,121;
    --width-container: 90%;
    --max-width-container: 40rem;
    --spacing-s: 1rem;
    --spacing-m: 2rem;
  }
  body {
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  }
`;

export default GlobalStyles;

import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}
    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
    a, dl, dt, dd, ol, ul, li, form, label, table{
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 10px;
        vertical-align: baseline;
    }
    body{
        line-height: 1;
        font-family: 'Noto Sans KR', sans-serif;
    }
    ol, ul{
        list-style: none;
    }
    button {
        border: 0;
        background: transparent;
        cursor: pointer;
    }

    html {
        font-size: 16px; /* Default font size */
        /* Media query for mobile */
        @media (min-width: 450px) and (max-width: 600px) {
            font-size: 13px;
        }
        @media (max-width: 450px) {
            font-size: 10px;
        }
    }
`;

export default GlobalStyles;

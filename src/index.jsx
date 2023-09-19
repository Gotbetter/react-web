import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyle from "./styles/GlobalStyle";
import { BrowserRouter } from "react-router-dom";
import theme from "./styles/theme";
import { ThemeProvider } from "styled-components";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);

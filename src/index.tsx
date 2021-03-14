import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { ThemeProvider } from "@emotion/react";
import { GlobalStyle, theme } from "./asset/style";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <GlobalStyle />
      <App />
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById("root")
);

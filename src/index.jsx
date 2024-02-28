import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyles from "./Styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";
import theme from "./Styles/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));

const client = new QueryClient();
root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

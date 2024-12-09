import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import "./index.css";
import "tw-elements";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const root = ReactDOM.createRoot(document.getElementById("root")!);
const queryClient = new QueryClient();

const theme = createTheme({
  typography: {
    fontFamily: '"Peyda", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  direction: "rtl",
});

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

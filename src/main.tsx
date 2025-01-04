import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import "./index.css";
import "tw-elements";
import "./fonts.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root")!);
const queryClient = new QueryClient();

const theme = createTheme({
  typography: {
    fontFamily: '"Peyda", "Roboto", "Helvetica", "Arial", sans-serif',
    allVariants: {
      fontWeight: 300,
    },
  },
  direction: "rtl",
});

const url = new URL(window.location.href);
const rfValue = url.searchParams.get('rf');
if (rfValue) {
    localStorage.setItem('rf', rfValue);
}

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Toaster />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

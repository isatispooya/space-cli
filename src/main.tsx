import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import "./index.css";
import "tw-elements";
import "./fonts.css";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";
import loadWidget from "./components/chatBox";
import ContactUsBox from "./components/contactUsBox";
import { startClarity } from "./utils";
import "tabulator-tables/dist/css/tabulator_bulma.min.css";

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

const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const url = new URL(window.location.href);
const rfValue = url.searchParams.get("rf");
if (rfValue) {
  localStorage.setItem("rf", rfValue);
}

startClarity();

loadWidget();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <CacheProvider value={rtlCache}>
          <ThemeProvider theme={theme}>
            <Toaster />
            <App />
            <ContactUsBox />
          </ThemeProvider>
        </CacheProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

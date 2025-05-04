import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Router from "./routes/sections";

export default function App() {
  return (
    <>
      <Router />
      <ToastContainer rtl />
    </>
  );
}

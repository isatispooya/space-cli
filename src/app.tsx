import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Router from "./routes/sections";

const App = () => {
  return (
    <>
      <Router />
      <ToastContainer rtl />
    </>
  );
};

export default App;

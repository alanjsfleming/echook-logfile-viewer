import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./pages/App";
import GetAccess from "./pages/GetAccess";
import NoPage from "./pages/NoPage";
import reportWebVitals from "./reportWebVitals";
import AnalyticsComponent from "./features/AnalyticsComponent";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <AnalyticsComponent />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/get-access" element={<GetAccess />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

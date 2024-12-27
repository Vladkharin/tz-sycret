import React from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CertificatesPage } from "./components/CertificatesPage.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<CertificatesPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

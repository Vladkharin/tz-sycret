import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CertificatesPage } from "./components/CertificatesPage.tsx";

export type CERTIFICATE = {
  ID: string;
  TABLENAME: string;
  PRIMARYKEY: string;
  NAME: string;
  DESCRIPTION: string;
  PRICE: string;
  SUMMA: string;
  DISCOUNT: string;
  IMAGEURL: string;
  REC_SNO: string;
  REC_NAME: string;
  REC_SUM: string;
  REC_QUANTITY: string;
  REC_PAYMENT_METHOD: string;
  REC_PAYMENT_OBJECT: string;
  REC_TAX: string;
};

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

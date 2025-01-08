import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CertificatesPage } from "./components/CertificatesPage.tsx";
import { OrderForm } from "./components/OrderForm.tsx";

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
  const [certificate, setCertificate] = useState<CERTIFICATE>({
    ID: "",
    TABLENAME: "",
    PRIMARYKEY: "",
    NAME: "",
    DESCRIPTION: "",
    PRICE: "",
    SUMMA: "",
    DISCOUNT: "",
    IMAGEURL: "",
    REC_SNO: "",
    REC_NAME: "",
    REC_SUM: "",
    REC_QUANTITY: "",
    REC_PAYMENT_METHOD: "",
    REC_PAYMENT_OBJECT: "",
    REC_TAX: "",
  });

  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<CertificatesPage certificate={certificate} setCertificate={setCertificate} />} />
        <Route path={"/order-form"} element={<OrderForm certificate={certificate} />} />
      </Routes>
    </Router>
  );
}

export default App;

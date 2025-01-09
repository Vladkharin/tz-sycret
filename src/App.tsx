import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CertificatesPage } from "./components/CertificatesPage.tsx";
import { OrderForm } from "./components/OrderForm.tsx";
import { Payment } from "./components/Payment.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<CertificatesPage />} />
        <Route path={"/order-form"} element={<OrderForm />} />
        <Route path={"/payment"} element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;

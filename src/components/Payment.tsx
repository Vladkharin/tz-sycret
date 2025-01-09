import React from "react";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

export function Payment() {
  return (
    <Div>
      <p>Оплата...</p>
    </Div>
  );
}

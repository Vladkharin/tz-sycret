import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getCertificates } from "../API/routes.ts";

const arrow = require("../assets/icons/arrow.svg").default as string;
const Section = styled.section`
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const ChooseCertificate = styled.div`
  display: flex;
  border: 1px solid black;
  width: 300px;
  height: 50px;
`;

const ChooseText = styled.div`
  padding: 10px;
  color: black;
  font-size: 20px;
  flex-basis: 80%;
`;

const ChooseArrow = styled.img`
  flex-basis: 20%;
  padding: 10px;
  border-right: 1px solid grey;
  border-left: 1px solid grey;
`;

export function CertificatesPage() {
  const [certificateText, setCertificateText] = useState<string>("Выбрать товар");
  const [certificatesData, setCertificatesData] = useState({});

  async function handle() {
    const options = {
      ApiKey: "011ba11bdcad4fa396660c2ec447ef14",
      MethodName: "OSGetGoodList",
    };
    const data = getCertificates(options);

    setCertificatesData(data);
  }

  useEffect(() => {
    handle();
  }, []);

  console.log(certificatesData);
  return (
    <>
      <Section>
        <Wrapper>
          <ChooseCertificate>
            <ChooseText>{certificateText}</ChooseText>
            <ChooseArrow src={arrow} alt={"arrow"}></ChooseArrow>
          </ChooseCertificate>
        </Wrapper>
      </Section>
    </>
  );
}

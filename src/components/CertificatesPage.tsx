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
  gap: 20px;
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

const ChooseCertificateMenu = styled.div<{ $activeClass: boolean }>`
  width: 300px;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 1px;
  opacity: ${(props) => (props.$activeClass ? "1" : "0")};
`;

const ChooseCertificateItem = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
`;

export function CertificatesPage() {
  const [certificateText, setCertificateText] = useState<string>("Выбрать товар");
  const [certificatesData, setCertificatesData] = useState([]);
  const [menuState, setMenuState] = useState<boolean>(false);

  async function handle() {
    const options = {
      ApiKey: "011ba11bdcad4fa396660c2ec447ef14",
      MethodName: "OSGetGoodList",
    };
    const data = await getCertificates(options);

    setCertificatesData(data.data);
  }

  useEffect(() => {
    handle();
  }, []);

  if (!certificatesData) {
    return;
  }

  return (
    <Section>
      <Wrapper>
        <ChooseCertificate onClick={() => (menuState ? setMenuState(false) : setMenuState(true))}>
          <ChooseText>{certificateText}</ChooseText>
          <ChooseArrow src={arrow} alt={"arrow"}></ChooseArrow>
        </ChooseCertificate>
        <ChooseCertificateMenu $activeClass={menuState}>
          {certificatesData.map((certificate, index) => {
            return <ChooseCertificateItem key={index}>{certificate.NAME}</ChooseCertificateItem>;
          })}
        </ChooseCertificateMenu>
      </Wrapper>
    </Section>
  );
}

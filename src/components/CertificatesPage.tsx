import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getCertificates } from "../API/routes.ts";
import { CERTIFICATE } from "../App.tsx";

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
  width: 420px;
  height: 50px;
`;

const ChooseText = styled.div`
  padding: 10px;
  color: black;
  font-size: 20px;
  flex-basis: 90%;
`;

const ChooseArrow = styled.img`
  flex-basis: 10%;
  padding: 10px;
  border-right: 1px solid grey;
  border-left: 1px solid grey;
`;

const ChooseCertificateMenu = styled.div<{ $activeClass: boolean }>`
  width: 420px;
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

const OrderWrapper = styled.div<{ $active: string }>`
  display: ${(props) => props.$active};
  flex-direction: column;
  align-items: center;
`;

const OrderText = styled.p`
  font-size: 20px;
  color: black;
`;

const OrderSpan = styled.span`
  font-weight: bold;
`;

const OrderButton = styled.button`
  width: 100px;
  height: 50px;
`;

export function CertificatesPage(): JSX.Element {
  const [certificate, setCertificate] = useState<CERTIFICATE>();
  const [certificatesData, setCertificatesData] = useState<CERTIFICATE[]>([]);
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

  console.log(certificatesData);

  if (certificatesData.length <= 0) {
    console.log(1);
    return <div>Hello world</div>;
  }

  return (
    <Section>
      <Wrapper>
        <ChooseCertificate onClick={() => (menuState ? setMenuState(false) : setMenuState(true))}>
          <ChooseText>{certificate ? certificate.NAME : "Выбрать товар"}</ChooseText>
          <ChooseArrow src={arrow} alt={"arrow"}></ChooseArrow>
        </ChooseCertificate>
        <ChooseCertificateMenu $activeClass={menuState}>
          {certificatesData.map((certificate, index) => {
            return (
              <ChooseCertificateItem
                onClick={() => {
                  setCertificate(certificate);
                  setMenuState(false);
                }}
                key={index}
              >
                {certificate.NAME}
              </ChooseCertificateItem>
            );
          })}
        </ChooseCertificateMenu>
        <OrderWrapper $active={certificate ? "flex" : "none"}>
          <OrderText>
            Цена - <OrderSpan>{certificate?.SUMMA.split(".")[0]} р.</OrderSpan>
          </OrderText>
          <OrderButton>Купить</OrderButton>
        </OrderWrapper>
      </Wrapper>
    </Section>
  );
}

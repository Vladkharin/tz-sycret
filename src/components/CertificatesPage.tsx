import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getCertificates } from "../API/routes.ts";
import { CERTIFICATE } from "../App.tsx";
import { Link } from "react-router-dom";

const arrow = require("../assets/icons/arrow.svg").default as string;
const loading = require("../assets/icons/spinning-dots.svg").default as string;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: ${(props) => props.$active};
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

const ImgLoading = styled.img`
  transition: rotate 5s;
  width: 100px;
  height: 100px;
`;

const LinkToForm = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export function CertificatesPage({
  certificate,
  setCertificate,
}: {
  certificate: CERTIFICATE;
  setCertificate: React.Dispatch<React.SetStateAction<CERTIFICATE>>;
}): JSX.Element {
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
    return (
      <Section>
        <Wrapper>
          <ImgLoading src={loading}></ImgLoading>
        </Wrapper>
      </Section>
    );
  }

  return (
    <Section>
      <Wrapper>
        <ChooseCertificate onClick={() => (menuState ? setMenuState(false) : setMenuState(true))}>
          <ChooseText>{certificate.ID !== "" ? certificate.NAME : "Выбрать товар"}</ChooseText>
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
        <OrderWrapper $active={certificate.ID !== "" ? "1" : "0"}>
          <OrderText>
            Цена - <OrderSpan>{certificate?.SUMMA.split(".")[0]} р.</OrderSpan>
          </OrderText>
          <LinkToForm to={"/order-form"}>
            <OrderButton>Купить</OrderButton>
          </LinkToForm>
        </OrderWrapper>
      </Wrapper>
    </Section>
  );
}

import React from "react";
import styled from "styled-components";
import { CERTIFICATE } from "../App";

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  width: 300px;
  height: 50px;
  padding: 10px;
`;

// const InputPhone = styled.InputMask``;

const TextArea = styled.textarea``;

const TitleForm = styled.h2``;

export function OrderForm({ certificate }: { certificate: CERTIFICATE }) {
  console.log(certificate);
  return (
    <Section>
      <Wrapper>
        <Form>
          <TitleForm>{certificate.NAME}</TitleForm>
          <Input placeholder={"Введите Имя..."} />
          <Input placeholder={"Введите номер..."} />
          <TextArea placeholder={"Оставьте отзыв..."} />
          <Input placeholder={"Введите почту..."} />
        </Form>
      </Wrapper>
    </Section>
  );
}

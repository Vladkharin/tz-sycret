import React, { useState } from "react";
import styled from "styled-components";
import { useMask } from "@react-input/mask";
import { Link, useNavigate } from "react-router-dom";
import { CERTIFICATE } from "./CertificatesPage";
import { OSSale } from "../API/routes.ts";

const backgroundImg = require("../assets/image/order-background.png");

const Section = styled.section<{ $background: string }>`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background: url(${(props) => props.$background});
  background-repeat: no-repeat;
  background-position: left;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  backdrop-filter: blur(3px);
  width: 100vw;
  height: 100vh;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: grey;
  padding: 20px;
  justify-content: flex-start;
  border: 1px solid #ffadad;
  border-radius: 10px;
  background-color: white;
  width: auto;
  height: auto;
`;

const Input = styled.input<{ $error: boolean }>`
  width: auto;
  max-width: 300px;
  min-width: 280px;
  height: 30px;
  padding: 10px;
  border: 1px solid ${(props) => (props.$error ? "red" : "#ffadad")};
  border-radius: 5px;
`;

const Error = styled.div<{ $activeClass: string }>`
  display: ${(props) => props.$activeClass};
  color: red;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ffadad;
  border-radius: 5px;
`;

const InputWithError = styled.div`
  height: auto;
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const TitleForm = styled.h2``;

const Label = styled.label<{ $error: boolean }>`
  color: ${(props) => (props.$error ? "red" : "black")};
`;

const LinkBack = styled(Link)`
  height: 50px;
  width: 100px;
  border: 1px solid #ffadad;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: black;
  border-radius: 10px;

  &:hover {
    background-color: #ffadad;
  }
`;

const ButtonSubmit = styled.button`
  height: 50px;
  width: 150px;
  border: 1px solid #ffadad;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  background: none;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background-color: #ffadad;
  }
`;

const LinksWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export function OrderForm() {
  const navigate = useNavigate();
  const certificate: CERTIFICATE = JSON.parse(localStorage.getItem("certificate") as string);
  const inputRef = useMask({ mask: "+7 (___) ___-__-__", replacement: { _: /\d/ }, showMask: true });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    review: "",
    mail: "",
  });

  const [errorForm, setErrorForm] = useState({
    name: "",
    phone: "",
    mail: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function focusOutPhoneInput() {
    if (formData.phone.replace(/[^.\d]+/g, "").length < 11) {
      setErrorForm({ ...errorForm, phone: "Вы ввели некорректный телефон" });
      return "Вы ввели некорректный телефон";
    } else {
      setErrorForm({ ...errorForm, phone: "" });
      return "";
    }
  }

  function focusOutNameInput() {
    if (formData.name.length === 0) {
      setErrorForm({ ...errorForm, name: "Имя должно быть заполнено" });
      return "Имя должно быть заполнено";
    } else {
      setErrorForm({ ...errorForm, name: "" });
      return "";
    }
  }

  function focusOutMailInput() {
    if (formData.mail.length === 0) {
      setErrorForm({ ...errorForm, mail: "Почта должна быть заполнена" });
      return "Почта должна быть заполнена";
    }

    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (formData.mail.match(validRegex)) {
      setErrorForm({ ...errorForm, mail: "" });
      return "";
    } else {
      setErrorForm({ ...errorForm, mail: "Вы ввели некорректную почту" });
      return "Вы ввели некорректную почту";
    }
  }

  function validateForm() {
    errorForm.phone = focusOutPhoneInput();
    errorForm.name = focusOutNameInput();
    errorForm.mail = focusOutMailInput();

    if (errorForm.phone || errorForm.name || errorForm.mail) {
      return true;
    }

    return false;
  }

  async function postData(event: React.FormEvent<HTMLFormElement>, certificate: CERTIFICATE) {
    event.preventDefault();

    const error = validateForm();

    if (error) {
      return;
    }

    const target = event.target as HTMLFormElement;

    const obj = {
      ApiKey: "011ba11bdcad4fa396660c2ec447ef14",
      MethodName: "OSSale",
      Id: certificate.ID,
      TableName: certificate.TABLENAME,
      PrimaryKey: certificate.PRIMARYKEY,
      Price: certificate.PRICE,
      Summa: certificate.SUMMA,
      ClientName: formData.name,
      Phone: formData.phone,
      Email: formData.mail,
      PaymentTypeId: 2,
      UseDelivery: 0,
      DeliveryAddress: "",
      IsGift: 0,
      MsgText: formData.review,
      PName: "",
      PPhone: "",
    };

    const arr: string[] = [];

    for (const key in obj) {
      arr.push(`${key}=${obj[key]}`);
    }

    const data = await OSSale(arr.join("&"));

    if (data.result === 0) {
      navigate("/payment");
    } else {
      target.reset();
    }
  }

  return (
    <Section $background={backgroundImg}>
      <Wrapper>
        <Form onSubmit={(event) => postData(event, certificate)}>
          <TitleForm>{certificate.NAME}</TitleForm>
          <InputWithError>
            <Label $error={errorForm.name ? true : false}>ФИО *</Label>
            <Input
              $error={errorForm.name ? true : false}
              placeholder={"Введите..."}
              onChange={handleChange}
              name={"name"}
              type={"text"}
              onBlur={focusOutNameInput}
            />
            <Error $activeClass={errorForm.name ? "block" : "none"}>{errorForm.name}</Error>
          </InputWithError>
          <InputWithError>
            <Label $error={errorForm.phone ? true : false}>Телефон *</Label>
            <Input
              $error={errorForm.phone ? true : false}
              ref={inputRef}
              placeholder={"Введите..."}
              onChange={handleChange}
              name={"phone"}
              type={"tel"}
              onBlur={focusOutPhoneInput}
            />
            <Error $activeClass={errorForm.phone ? "block" : "none"}>{errorForm.phone}</Error>
          </InputWithError>
          <InputWithError>
            <Label $error={errorForm.mail ? true : false}>Почта *</Label>
            <Input
              $error={errorForm.mail ? true : false}
              placeholder={"Введите..."}
              onChange={handleChange}
              name={"mail"}
              type={"email"}
              onBlur={focusOutMailInput}
            />
            <Error $activeClass={errorForm.mail ? "block" : "none"}>{errorForm.mail}</Error>
          </InputWithError>
          <InputWithError>
            <Label $error={false}>Сообщение</Label>
            <TextArea placeholder={"Введите..."} onChange={handleChange} name={"review"} />
          </InputWithError>
          <LinksWrapper>
            <LinkBack to={"/"}>Назад</LinkBack>

            <ButtonSubmit type="submit">Перейти к оплате</ButtonSubmit>
          </LinksWrapper>
        </Form>
      </Wrapper>
    </Section>
  );
}

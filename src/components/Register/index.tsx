import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Api } from "../../scripts/requests";
import { RegisterForm, RegisterWrapper } from "./style";
import { ErrorMessage, HeadlineBold, Label, Title1 } from "../../styles/text";
import { Input, LabelWrapper, Select } from "../../styles/input";
import { PrimaryButton } from "../../styles/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { iUserRegister } from "../../interfaces";

export default function Register() {
  const loginSchema = yup.object().shape({
    name: yup.string().required("Campo obrigatorio"),
    last_name: yup.string().required("Campo obrigatorio"),
    email: yup
      .string()
      .required("Campo obrigatorio")
      .email("Insira um e-mail valido"),
    password: yup
      .string()
      .required("Campo obrigatorio")
      .min(8, "Senha precisa ter ao menos 8 caracteres")
      .matches(/(\d)/, "Senha precisa ter ao menos um numero")
      .matches(/([a-z])/, "Senha precisa ter ao menos uma letra")
      .matches(
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
        "Senha precisa ter ao menos um simbolo"
      ),
    passwordCheck: yup
      .string()
      .required("Campo obrigatorio")
      .oneOf([yup.ref("password"), ""], "Senhas precisam ser iguais"),
    telephone: yup.string().required("Campo obrigatorio"),
  });

  const {
    setRegisterName,
    setRegisterLastName,
    setRegisterPassword,
    setRegisterPasswordCheck,
    setRegisterEmail,
    setRegisterTelephone,
    clearRegister,
    userRegister,
  } = useContext(UserContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iUserRegister>({
    resolver: yupResolver(loginSchema),
  });

  async function registerSubmit(data: iUserRegister) {
    const newUser = await Api.register(data);
    if (newUser) {
      notifySuccess();
      clearRegister();
      navigate("");
    } else {
      notifyError();
    }
  }

  const notifySuccess = () =>
    toast.success("Conta criada com sucesso!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const notifyError = () =>
    toast.error("Algo de errado aconteceu, tente com dados diferentes", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  return (
    <RegisterWrapper>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Title1>Crie sua conta</Title1>
      <HeadlineBold>Rapido e grátis, vamos nessa</HeadlineBold>
      <RegisterForm onSubmit={handleSubmit(registerSubmit)}>
        <LabelWrapper>
          <Label htmlFor="name">Nome</Label>
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
          <Input
            type="text"
            id="name"
            {...register("name")}
            placeholder="Digite aqui seu nome"
            value={userRegister.name}
            onChange={(event) => setRegisterName(event.target.value)}
          />
        </LabelWrapper>
        <LabelWrapper>
          <Label htmlFor="last_name">Sobrenome</Label>
          <ErrorMessage>{errors.last_name?.message}</ErrorMessage>
          <Input
            type="text"
            id="last_name"
            {...register("last_name")}
            placeholder="Digite aqui seu sobrenome"
            value={userRegister.last_name}
            onChange={(event) => setRegisterLastName(event.target.value)}
          />
        </LabelWrapper>
        <LabelWrapper>
          <Label htmlFor="email">E-mail</Label>
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
          <Input
            type="text"
            id="email"
            {...register("email")}
            placeholder="Digite aqui seu email"
            value={userRegister.email}
            onChange={(event) => setRegisterEmail(event.target.value)}
          />
        </LabelWrapper>
        <LabelWrapper>
          <Label htmlFor="telephone">Telefone</Label>
          <ErrorMessage>{errors.telephone?.message}</ErrorMessage>
          <Input
            type="text"
            id="telephone"
            {...register("telephone")}
            placeholder="Digite aqui seu telephone"
            value={userRegister.telephone}
            onChange={(event) => setRegisterTelephone(event.target.value)}
          />
        </LabelWrapper>
        <LabelWrapper>
          <Label htmlFor="password">Senha</Label>
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
          <Input
            type="password"
            id="password"
            {...register("password")}
            placeholder="Digite aqui sua senha"
            value={userRegister.password}
            onChange={(event) => setRegisterPassword(event.target.value)}
          />
        </LabelWrapper>
        <LabelWrapper>
          <Label htmlFor="passwordCheck">Confirmar senha</Label>
          <ErrorMessage>{errors.passwordCheck?.message}</ErrorMessage>
          <Input
            type="password"
            id="passwordCheck"
            {...register("passwordCheck")}
            placeholder="Digite novamente sua senha"
            value={userRegister.passwordCheck}
            onChange={(event) => setRegisterPasswordCheck(event.target.value)}
          />
        </LabelWrapper>
        <PrimaryButton>Enviar</PrimaryButton>
      </RegisterForm>
    </RegisterWrapper>
  );
}

import React, { useContext } from "react";
import { Modal } from "../../styles/modal";
import {
  EditContactForm,
  EditContactWrapper,
  EditContactHeader,
} from "./style";
import { Input, LabelWrapper } from "../../styles/input";
import { CloseButton, PrimaryButton } from "../../styles/button";
import { ErrorMessage, Label, Title2 } from "../../styles/text";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Api } from "../../scripts/requests";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ModalContext } from "../../contexts/ModalContext";
import { UserContext } from "../../contexts/UserContext";
import { iUser } from "../../interfaces";
import { useNavigate } from "react-router-dom";

export default function EditUserModal() {
  const {
    toggleUserModal,
    toggleLoadingModal,
    sendAlertLoading,
    userInfo,
    setInfoName,
    setInfoLastName,
    setInfoTelephone,
    setInfoEmail,
    clearInfo,
  } = useContext(ModalContext);

  const { logout, setNewUser } = useContext(UserContext);

  const editUserSchema = yup.object().shape({
    name: yup.string().required("Campo obrigatorio"),
    last_name: yup.string().required("Campo obrigatorio"),
    email: yup
      .string()
      .required("Campo obrigatorio")
      .email("Insira um e-mail valido"),
    telephone: yup.string().required("Campo obrigatorio"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iUser>({
    resolver: yupResolver(editUserSchema),
  });

  async function submitUser(data: iUser) {
    toggleLoadingModal();
    await Api.editUser(data)
      .then(() => {
        setNewUser(data);
        toggleUserModal();
        sendAlertLoading();
      })
      .catch(() => {
        notifyError();
        sendAlertLoading();
      });
  }

  const navigate = useNavigate();

  async function deleteUser() {
    toggleLoadingModal();
    await Api.deleteUser();
    toggleUserModal();
    navigate("");
    sendAlertLoading();
  }

  const notifyError = () =>
    toast.error("Acao invalida, tente novamente", {
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
    <Modal
      onClick={(event) => {
        if (
          event.target instanceof Element &&
          event.target.tagName === "SECTION"
        ) {
          toggleUserModal();
          clearInfo();
        }
      }}
    >
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
      <EditContactWrapper>
        <EditContactHeader>
          <Title2>Editar Usuario</Title2>
          <CloseButton
            onClick={() => {
              toggleUserModal();
              clearInfo();
            }}
          >
            X
          </CloseButton>
        </EditContactHeader>
        <EditContactForm onSubmit={handleSubmit(submitUser)}>
          <LabelWrapper>
            <Label htmlFor="name">Nome</Label>
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
            <Input
              type="text"
              id="name"
              {...register("name")}
              placeholder="Digite aqui o nome"
              onChange={(event) => {
                setInfoName(event.target.value);
              }}
              value={userInfo.name}
            />
          </LabelWrapper>
          <LabelWrapper>
            <Label htmlFor="last_name">Sobrenome</Label>
            <ErrorMessage>{errors.last_name?.message}</ErrorMessage>
            <Input
              type="text"
              id="last_name"
              {...register("last_name")}
              placeholder="Digite aqui o sobrenome"
              onChange={(event) => {
                setInfoLastName(event.target.value);
              }}
              value={userInfo.last_name}
            />
          </LabelWrapper>
          <LabelWrapper>
            <Label htmlFor="email">E-mail</Label>
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
            <Input
              type="text"
              id="email"
              {...register("email")}
              placeholder="Digite aqui o email"
              onChange={(event) => {
                setInfoEmail(event.target.value);
              }}
              value={userInfo.email}
            />
          </LabelWrapper>
          <LabelWrapper>
            <Label htmlFor="telephone">Telefone</Label>
            <ErrorMessage>{errors.telephone?.message}</ErrorMessage>
            <Input
              type="text"
              id="telephone"
              {...register("telephone")}
              placeholder="Digite aqui o telephone"
              onChange={(event) => {
                setInfoTelephone(event.target.value);
              }}
              value={userInfo.telephone}
            />
          </LabelWrapper>
          <PrimaryButton>Editar Usuario</PrimaryButton>
          <PrimaryButton
            onClick={(event) => {
              event.preventDefault();
              deleteUser();
            }}
          >
            Excluir
          </PrimaryButton>
        </EditContactForm>
      </EditContactWrapper>
    </Modal>
  );
}

import React, { useContext } from "react";
import { Input, Select, LabelWrapper } from "../../styles/input";
import { CloseButton, PrimaryButton } from "../../styles/button";
import { ErrorMessage, Label, Title2 } from "../../styles/text";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "../../styles/modal";
import { AddContactForm, AddContactHeader, AddContactWrapper } from "./style";
import { ModalContext } from "../../contexts/ModalContext";
import { UserContext } from "../../contexts/UserContext";
import { Api } from "../../scripts/requests";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { iContact } from "../../interfaces";

export default function AddContactModal() {
  const { toggleAddModal, toggleLoadingModal, sendAlertLoading } =
    useContext(ModalContext);

  const { addContact } = useContext(UserContext);

  const newContactSchema = yup.object().shape({
    first_name: yup.string().required("Campo obrigatorio"),
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
  } = useForm<iContact>({
    resolver: yupResolver(newContactSchema),
  });

  async function submitContact(data: iContact) {
    toggleLoadingModal();
    await Api.postNewContact(data)
      .then((res) => {
        addContact(res);
        toggleAddModal();
        sendAlertLoading();
      })
      .catch(() => {
        notifyError();
        sendAlertLoading();
      });
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
      onClick={(event: React.MouseEvent) => {
        if (
          event.target instanceof Element &&
          event.target.tagName === "SECTION"
        ) {
          toggleAddModal();
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
      <AddContactWrapper>
        <AddContactHeader>
          <Title2>Cadastrar Contato</Title2>
          <CloseButton
            onClick={() => {
              toggleAddModal();
            }}
          >
            X
          </CloseButton>
        </AddContactHeader>
        <AddContactForm onSubmit={handleSubmit(submitContact)}>
          <LabelWrapper>
            <Label htmlFor="first_name">Nome</Label>
            <ErrorMessage>{errors.first_name?.message}</ErrorMessage>
            <Input
              type="text"
              id="first_name"
              {...register("first_name")}
              placeholder="Digite aqui o nome"
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
            />
          </LabelWrapper>
          <PrimaryButton>Adicionar Contato</PrimaryButton>
        </AddContactForm>
      </AddContactWrapper>
    </Modal>
  );
}

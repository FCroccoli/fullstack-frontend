import React, { useContext } from "react";
import { HeadlineBold, HeadlineItalic, Title2 } from "../../styles/text";
import {
  ContactCard,
  ContactDescriptionWrapper,
  ContactInfoWrapper,
  ContactName,
  ContactNameWrapper,
  ContactsDisplay,
  ContactsHeader,
} from "./style";
import { DisplayButton } from "../../styles/button";
import AddContactModal from "../AddContactModal";
import LoadingModal from "../LoadingModal";
import { ModalContext } from "../../contexts/ModalContext";
import { UserContext } from "../../contexts/UserContext";
import { FaEdit, FaPlus } from "react-icons/fa";
import EditContactModal from "../EditContactModal";

export default function Contacts() {
  const {
    displayAddModal,
    toggleAddModal,
    displayLoadingModal,
    displayEditModal,
    toggleEditModal,
  } = useContext(ModalContext);

  const { isLoading, contacts } = useContext(UserContext);

  return (
    <>
      <ContactsHeader>
        <Title2>Contatos</Title2>
        <DisplayButton
          onClick={() => {
            toggleAddModal();
          }}
        >
          <FaPlus />
        </DisplayButton>
      </ContactsHeader>
      {isLoading ? (
        <HeadlineBold>Carregando</HeadlineBold>
      ) : !isLoading && contacts.length < 1 ? (
        <Title2>Voce ainda nao possui nenhum contato cadastrado</Title2>
      ) : (
        <ContactsDisplay>
          {contacts &&
            contacts!.map((contact) => (
              <ContactCard key={contact.id}>
                <ContactInfoWrapper>
                  <ContactNameWrapper>
                    <ContactName>{`Nome: ${contact.first_name} ${contact.last_name}`}</ContactName>
                  </ContactNameWrapper>
                  <ContactDescriptionWrapper>
                    <HeadlineItalic>{`Telephone: ${contact.telephone}`}</HeadlineItalic>
                    <HeadlineItalic>{`Email: ${contact.email}`}</HeadlineItalic>
                  </ContactDescriptionWrapper>
                </ContactInfoWrapper>
                <DisplayButton
                  onClick={() => {
                    toggleEditModal(contact);
                  }}
                >
                  <FaEdit />
                </DisplayButton>
              </ContactCard>
            ))}
        </ContactsDisplay>
      )}
      {displayAddModal && <AddContactModal />}
      {displayEditModal && <EditContactModal />}
      {displayLoadingModal && <LoadingModal />}
    </>
  );
}

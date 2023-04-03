import React, { createContext, useState } from "react";
import {
  iContact,
  iModalContext,
  iModalContextProps,
  iUser,
} from "../interfaces";

export const ModalContext = createContext({} as iModalContext);

export default function ModalProvider({ children }: iModalContextProps) {
  const [displayAddModal, setDisplayAddModal] = useState(false);

  const [displayEditModal, setDisplayEditModal] = useState(false);

  const [displayUserEditModal, setDisplayUserEditModal] = useState(false);

  const [displayLoadingModal, setDisplayLoadingModal] = useState(false);

  const [selectedContact, setSelectedContact] = useState({} as iContact);

  const [userInfo, setUserInfo] = useState({} as iUser);

  const [alertLoading, setAlertLoading] = useState(true);

  function toggleAddModal() {
    setDisplayAddModal(!displayAddModal);
  }

  function toggleEditModal(contact?: iContact) {
    setDisplayEditModal(!displayEditModal);
    if (contact) {
      setSelectedContact(contact);
    }
  }

  function toggleUserModal(user?: iUser) {
    setDisplayUserEditModal(!displayUserEditModal);
    if (user) {
      setUserInfo(user);
    }
  }

  function toggleLoadingModal() {
    setDisplayLoadingModal(!displayLoadingModal);
  }

  function sendAlertLoading() {
    setAlertLoading(!alertLoading);
  }

  function setContactName(newName: string) {
    setSelectedContact({ ...selectedContact, first_name: newName });
  }

  function setContactLastName(newLastName: string) {
    setSelectedContact({ ...selectedContact, last_name: newLastName });
  }

  function setContactTelephone(newTelephone: string) {
    setSelectedContact({ ...selectedContact, telephone: newTelephone });
  }

  function setContactEmail(newEmail: string) {
    setSelectedContact({ ...selectedContact, email: newEmail });
  }

  function clearContact() {
    setSelectedContact({} as iContact);
  }

  function setInfoName(newName: string) {
    setUserInfo({ ...userInfo, name: newName });
  }

  function setInfoLastName(newLastName: string) {
    setUserInfo({ ...userInfo, last_name: newLastName });
  }

  function setInfoTelephone(newTelephone: string) {
    setUserInfo({ ...userInfo, telephone: newTelephone });
  }

  function setInfoEmail(newEmail: string) {
    setUserInfo({ ...userInfo, email: newEmail });
  }

  function clearInfo() {
    setUserInfo({} as iUser);
  }

  return (
    <ModalContext.Provider
      value={{
        displayAddModal,
        toggleAddModal,
        displayEditModal,
        toggleEditModal,
        toggleUserModal,
        displayLoadingModal,
        toggleLoadingModal,
        selectedContact,
        alertLoading,
        sendAlertLoading,
        setContactName,
        setContactLastName,
        setContactTelephone,
        setContactEmail,
        clearContact,
        displayUserEditModal,
        userInfo,
        setInfoName,
        setInfoLastName,
        setInfoTelephone,
        setInfoEmail,
        clearInfo,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

import React, { createContext, useEffect, useState } from "react";
import { Api } from "../scripts/requests";
import {
  iContact,
  iUserRegister,
  iUser,
  iUserContext,
  iUserContextProps,
} from "../interfaces";

export const UserContext = createContext({} as iUserContext);

export default function UserProvider({ children }: iUserContextProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("@token") ? true : false
  );

  const [userRegister, setUserRegister] = useState({} as iUserRegister);

  const [user, setUser] = useState({} as iUser);

  const [contacts, setContacts] = useState([] as iContact[]);

  const [isLoading, setIsLoading] = useState(true);

  async function login() {
    await Api.getContacts().then((res) => {
      setContacts(res.data);
    });
    await Api.getUser().then((res) => {
      setIsLoggedIn(true);
      setUser(res.data);
      setIsLoading(false);
    });
  }

  function logout() {
    setIsLoggedIn(false);
    clearRegister();
  }

  function addContact(contact: iContact) {
    setContacts([...(contacts || ([] as iContact[])), contact]);
  }

  function updateContact(editedContact: iContact) {
    if (contacts) {
      console.log(editedContact);
      setContacts(
        contacts.map((contact) => {
          return contact.id === editedContact.id ? editedContact : contact;
        })
      );
    }
  }

  function removeContact(deletedContact: iContact) {
    if (contacts) {
      setContacts(
        contacts.filter((contact) => {
          return contact.id !== deletedContact.id;
        })
      );
    }
  }

  function setNewUser(newUser: iUser) {
    setUser(newUser);
  }

  function setRegisterName(newName: string) {
    setUserRegister({ ...userRegister, name: newName });
  }

  function setRegisterLastName(newLastName: string) {
    setUserRegister({ ...userRegister, last_name: newLastName });
  }

  function setRegisterPassword(newPassword: string) {
    setUserRegister({ ...userRegister, password: newPassword });
  }

  function setRegisterTelephone(newTelephone: string) {
    setUserRegister({ ...userRegister, telephone: newTelephone });
  }

  function setRegisterEmail(newEmail: string) {
    setUserRegister({ ...userRegister, email: newEmail });
  }

  function setRegisterPasswordCheck(newPasswordCheck: string) {
    setUserRegister({ ...userRegister, passwordCheck: newPasswordCheck });
  }

  function clearRegister() {
    setUserRegister({} as iUserRegister);
  }

  useEffect(() => {
    if (isLoggedIn) {
      Api.getContacts().then((res) => {
        setContacts(res.data);
      });
      Api.getUser()
        .then((res) => {
          setUser(res.data);
          setIsLoading(false);
        })
        .catch(() => {
          localStorage.clear();
          setIsLoggedIn(false);
          setIsLoading(false);
        });
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        logout,
        login,
        user,
        contacts,
        isLoading,
        addContact,
        updateContact,
        removeContact,
        userRegister,
        setRegisterName,
        setRegisterLastName,
        setRegisterPassword,
        setRegisterPasswordCheck,
        setRegisterTelephone,
        setRegisterEmail,
        clearRegister,
        setNewUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Title1, HeadlineItalic } from "../../styles/text";
import Contacts from "../Contacts";
import {
  DashboardHeader,
  DashboardDisplay,
  DashboardWrapper,
  Loading,
  DashboardDescriptionWrapper,
  DashboardNameWrapper,
} from "./style";
import { DisplayButton } from "../../styles/button";
import { ModalContext } from "../../contexts/ModalContext";
import { FaEdit } from "react-icons/fa";
import LoadingModal from "../LoadingModal";
import EditUserModal from "../EditUserModal";

export default function Dashboard() {
  const { user, isLoading } = useContext(UserContext);

  const { toggleUserModal, displayUserEditModal, displayLoadingModal } =
    useContext(ModalContext);

  return (
    <>
      <DashboardWrapper>
        {isLoading ? (
          <Loading>Carregando...</Loading>
        ) : (
          <DashboardHeader>
            <DashboardNameWrapper>
              <Title1>{`Nome: ${user.name} ${user.last_name}`}</Title1>
              <DisplayButton
                onClick={() => {
                  toggleUserModal(user);
                }}
              >
                <FaEdit />
              </DisplayButton>
            </DashboardNameWrapper>
            <DashboardDescriptionWrapper>
              <HeadlineItalic>{`Telephone: ${user.telephone}`}</HeadlineItalic>
              <HeadlineItalic>{`Email: ${user.email}`}</HeadlineItalic>
            </DashboardDescriptionWrapper>
          </DashboardHeader>
        )}
        <DashboardDisplay>
          <Contacts></Contacts>
        </DashboardDisplay>
      </DashboardWrapper>
      {displayUserEditModal && <EditUserModal />}
      {displayLoadingModal && <LoadingModal />}
    </>
  );
}

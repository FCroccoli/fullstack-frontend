import React, { useContext, useEffect } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { Modal } from "../../styles/modal";
import { HeadlineBold } from "../../styles/text";
import { LoadingIcon } from "./style";

export default function LoadingModal() {
  const { toggleLoadingModal, alertLoading, sendAlertLoading } =
    useContext(ModalContext);

  useEffect(() => {
    if (alertLoading) {
      toggleLoadingModal();
      sendAlertLoading();
    }
  }, [alertLoading]);

  return (
    <Modal>
      <LoadingIcon />
      <HeadlineBold>Carregando</HeadlineBold>
    </Modal>
  );
}

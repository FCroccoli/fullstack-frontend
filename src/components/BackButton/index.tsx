import React from "react";
import { useNavigate } from "react-router-dom";
import { ButtonNav } from "../../styles/button";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <ButtonNav
      onClick={() => {
        navigate("/");
      }}
    >
      Voltar
    </ButtonNav>
  );
}

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { ButtonNav } from "../../styles/button";

export default function LogoutButton() {
  const navigate = useNavigate();

  const { logout } = useContext(UserContext);

  return (
    <ButtonNav
      onClick={() => {
        localStorage.clear();
        logout();
        navigate("/");
      }}
    >
      Sair
    </ButtonNav>
  );
}

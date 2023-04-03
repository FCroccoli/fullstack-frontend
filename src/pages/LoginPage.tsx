import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Login from "../components/Login";
import { UserContext } from "../contexts/UserContext";

export default function LoginPage() {
  const { isLoggedIn } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn ? navigate("home") : null;
  });

  return (
    <>
      <Header solo={true}></Header>
      <Login></Login>
    </>
  );
}

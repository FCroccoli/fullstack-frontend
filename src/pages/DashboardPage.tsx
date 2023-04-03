import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Header from "../components/Header";
import LogoutButton from "../components/LogoutButton";
import { UserContext } from "../contexts/UserContext";

export default function DashboardPage() {
  const { isLoggedIn, isLoading } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoading]);

  return (
    <>
      <Header solo={false} children={<LogoutButton />}></Header>
      <Dashboard></Dashboard>
    </>
  );
}

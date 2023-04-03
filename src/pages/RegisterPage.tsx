import React from "react";
import BackButton from "../components/BackButton";
import Header from "../components/Header";
import Register from "../components/Register";

export default function RegisterPage() {
  return (
    <>
      <Header solo={false} children={<BackButton />}></Header>
      <Register></Register>
    </>
  );
}

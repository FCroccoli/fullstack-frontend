import React from "react";
import { HeaderLogo, StyledHeader } from "./style";
import { iHeaderProps } from "../../interfaces";

export default function Header({ children, solo }: iHeaderProps) {
  return (
    <StyledHeader solo={solo}>
      <HeaderLogo>Kontacts</HeaderLogo>
      {children}
    </StyledHeader>
  );
}

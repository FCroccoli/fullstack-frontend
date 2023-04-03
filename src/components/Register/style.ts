import styled from "styled-components";

export const RegisterWrapper = styled.div`
  width: 90%;
  position: relative;
  top: 60px;
  padding: 32px 18px;
  margin-bottom: 20px;
  background: var(--grey-1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 26px;
  border-radius: 8px;
  @media (min-width: 996px) {
    width: 26%;
  }
`;

export const RegisterForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

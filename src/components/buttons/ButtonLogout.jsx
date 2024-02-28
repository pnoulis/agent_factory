import { ButtonIconText } from "./ButtonIconText.jsx";
import styled from "styled-components";
import IconLogout from "/assets/icons/logout.svg?react";

const StyleButtonIconText = styled(ButtonIconText.Button)`
  width: 100%;
  padding: 5px 10px;
  border: none;
  gap: 5px;
  ${ButtonIconText.Text} {
    padding-left: 7px;
    font-size: var(--tx-sm);
    flex: 1;
    text-align: center;
    font-weight: 550;
    border-left: 2px solid black;
  }
  ${ButtonIconText.Icon} {
    box-sizing: border-box;
    padding: 8px;
    fill: black;
  }
`;

function ButtonLogout({ onLogout, className }) {
  return (
    <StyleButtonIconText className={className} onClick={onLogout}>
      <ButtonIconText.Icon>
        <IconLogout />
      </ButtonIconText.Icon>
      <ButtonIconText.Text>logout</ButtonIconText.Text>
    </StyleButtonIconText>
  );
}

export { ButtonLogout };

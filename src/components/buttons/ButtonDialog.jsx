import { css } from "styled-components";

const ButtonDialog = css`
  font-size: var(--tx-nl);
  text-transform: uppercase;
  border-radius: var(--br-xs);
  border: 2px solid black;
  text-align: center;
  height: 40px;
  min-width: 120px;
  width: max-content;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background-color: var(--primary-base);
    border-color: var(--primary-base);
    color: white;
  }

  &:focus-within {
    background-color: var(--primary-light);
    border-color: var(--primary-light);
    color: white;
  }

  &:focus-within:hover {
    background-color: var(--primary-base);
    border-color: var(--primary-base);
  }
`;

export { ButtonDialog };

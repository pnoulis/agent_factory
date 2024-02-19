import { css } from "styled-components";

const ButtonStandard = css`
  font-size: var(--tx-lg);
  text-transform: uppercase;
  background-color: var(--primary-base);
  height: 60px;
  border-radius: var(--br-nl);
  width: 100%;
  cursor: pointer;
  letter-spacing: 1px;
  text-align: center;
  color: white;
  font-weight: 500;
  &:hover {
    opacity: 0.9;
  }
`;

export { ButtonStandard };

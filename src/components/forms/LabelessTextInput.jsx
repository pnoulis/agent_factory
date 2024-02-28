import styled from "styled-components";
import { TextInput_0 } from "react_utils/inputs";

const LabelessTextInput = styled(TextInput_0)`
  text-transform: uppercase !important;
  max-height: 55px !important;
  min-height: 55px !important;
  height: 55px !important;
  & > * {
    font-size: var(--tx-sm) !important;
  }

  .label {
    display: none;
  }

  & input {
    background-color: var(--grey-light);
    border-color: white !important;
    border-radius: var(--br-nl);
  }

  .input:focus ~ .optional,
  input:not(:placeholder-shown) ~ .optional {
    right: 1px;
    background-color: var(--grey-light);
  }

  &.error .input {
    text-transform: uppercase !important;
  }

  ::placeholder {
    font-size: var(--tx-md);
    font-weight: 500;
    opacity: 0.6 !important;
  }

  &.error p {
    position: initial;
    background-color: white;
    border-radius: var(--br-nl);
    margin-top: 5px;
    padding-bottom: 5px;
  }
`;

export { LabelessTextInput };

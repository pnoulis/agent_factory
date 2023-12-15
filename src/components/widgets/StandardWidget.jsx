import styled from "styled-components";
import { Widget } from "./Widget.jsx";

const StandardWidget = styled(Widget)`
  .trigger {
    cursor: pointer;
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    width: ${({ size }) => size || "50px"};
    height: ${({ size }) => size || "50px"};
    border: 3px solid transparent;
    padding: 8px;
    border-radius: 50%;
    background-color: var(--grey-base);
  }

  .trigger[data-state="open"] {
    opacity: 0.8;
  }

  .tooltip {
    padding: 7px 12px;
    border: 1px solid var(--grey-light);
    border-radius: var(--br-sm);
    font-size: var(--tx-nl);
    letter-spacing: 1.5px;
    text-transform: lowercase;
    text-align: center;
    z-index: 100;
    background-color: white;
    box-shadow: var(--sd-0);
  }
`;

export { StandardWidget };

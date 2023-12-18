import styled from "styled-components";

const StandardDataTuple = styled("div")`
  color: black;
  box-sizing: border-box;
  padding: 0 5px;
  letter-spacing: 1px;
  font-size: var(--tx-xxs);

  .key {
    font-weight: 600;
  }

  .key::after {
    content: ":";
    margin: 0 3px 0 1px;
  }

  .value {
    font-size: var(--tx-xxs);
    word-break: break-all;
    overflow-wrap: anywhere;
  }
`;

export { StandardDataTuple };

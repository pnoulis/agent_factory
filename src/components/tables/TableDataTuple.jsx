import styled from "styled-components";

const TableDataTuple = styled("div")`
  color: black;
  box-sizing: border-box;
  padding: 0 5px;
  letter-spacing: 1px;
  font-size: var(--tx-xs);
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  cursor: default;
  pointer-events: none;

  .key {
    font-weight: 600;
    color: var(--primary-base);
  }

  .value {
    font-weight: 500;
    font-size: var(--tx-xxs);
  }
`;

export { TableDataTuple };

import styled from "styled-components";
function Empty() {
  return (
    <tr>
      <EmptyCell>Wow, so empty!!!</EmptyCell>
    </tr>
  );
}

const EmptyCell = styled("td")`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: Saira;
  font-size: var(--tx-hg);
  color: var(--primary-base);
  letter-spacing: 2px;
`;

export { Empty };

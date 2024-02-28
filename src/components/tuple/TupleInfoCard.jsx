import { StandardDataTuple } from "./StandardDataTuple.jsx";
import { styled } from "styled-components";

const TupleInfoCard = styled(StandardDataTuple)`
  .key {
    background-color: red;
  }
  .value {
    background-color: blue;
  }
`;

export { TupleInfoCard };

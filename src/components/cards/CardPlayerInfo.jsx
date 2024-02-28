import { Card } from "./Card.jsx";
import styled from "styled-components";

const CardPlayerInfo = styled(Card)`
  display: flex;
  flex-flow: row nowrap;
  gap: 30px;

  .keys {
    display: flex;
    flex-flow: column nowrap;
    align-items: start;
    font-weight: 550;
  }

  .keys .key::after {
    content: ":";
    font-weight: 600;
    margin: 0 3px 0 3px;
  }

  .values {
    display: flex;
    flex-flow: column nowrap;
    align-items: start;
  }
`;

export { CardPlayerInfo };

import styled from "styled-components";
import { StandardPlayerActionCard } from "../player/StandardPlayerActionCard.jsx";

const ListPlayerActionCards = styled("div")`
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: start;
  gap: 5px;

  ${StandardPlayerActionCard} {
    background-color: inherit;
    justify-content: start;
    min-width: 150px;

    .widget-wristband {
      margin-bottom: 10px;
    }

    .widget-remove {
      margin-top: auto;
    }
  }
`;

export { ListPlayerActionCards };

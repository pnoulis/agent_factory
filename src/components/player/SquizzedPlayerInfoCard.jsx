import { StandardPlayerInfoCard } from "./StandardPlayerInfoCard.jsx";
import styled from "styled-components";

const SquizzedPlayerInfoCard = styled(StandardPlayerInfoCard)`
  gap: 0;

  .wristband-info-card {
    padding: 0;
    font-size: var(--tx-sm);
    gap: 5px;
    padding: 10px;
  }

  .wristband-info-card .bracelet {
    padding: 6px;
    width: 40px;
    height: 40px;
  }
`;

export { SquizzedPlayerInfoCard };

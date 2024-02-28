import { PackageInfoCard } from "./PackageInfoCard.jsx";
import styled from "styled-components";

const StandardPackageInfoCard = styled(PackageInfoCard)`
  background-color: var(--grey-light);
  border-radius: var(--br-lg);
  padding: 15px;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: max-content;
  justify-content: space-between;
  align-content: space-between;
  column-gap: 20px;

  .key {
    font-weight: 550;
    justify-self: start;
  }

  .value {
    justify-self: start;
  }

  & > .value {
    text-wrap: wrap;
    overflow-wrap: anywhere;
  }

  .key::after {
    content: ":";
    font-weight: 600;
    margin: 0 3px 0 3px;
  }

  .value.state {
    font-weight: 600;
    color: var(--info-base);
  }
`;

export { StandardPackageInfoCard };

import styled from "styled-components";
import IconWristbandGear from "/assets/icons/wristband-gear.svg";

const ListPlayers = styled("ul")`
  width: max-content;
  margin: auto;
  overflow-y: auto;
  overflow-x: none;
  display: grid;
  grid-template-columns: repeat(3, 200px);
  grid-auto-rows: 200px;
  gap: 20px;
  padding: 20px;
  border-radius: var(--br-lg);
  box-shadow: var(--sd-14), var(--sd-4);
  background-image: url(${IconWristbandGear});
  background-repeat: no-repeat;
  background-size: 50%;
  background-position: center;
`;

export { ListPlayers };

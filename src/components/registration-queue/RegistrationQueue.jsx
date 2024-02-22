import * as React from "react";
import styled from "styled-components";
import BackgroundWrisband from "/assets/icons/wristband-gear.svg";

function RegistrationQueue({ className, style, children }) {
  return (
    <List className={className} style={style}>
      {children}
    </List>
  );
}

const List = styled("ul")`
  border-radius: var(--br-lg);
  background-color: white;
  box-shadow: var(--sd-14), var(--sd-4);
  background-image: url(${BackgroundWrisband});
  background-repeat: no-repeat;
  background-size: 50%;
  background-position: center;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 170px);
  grid-auto-rows: minmax(190px, max-content);
  overflow-y: scroll;
  gap: 40px 30px;
  padding: 30px 20px;
  justify-content: space-between;
`;

export { RegistrationQueue };

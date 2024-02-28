import IconPerson from "/assets/icons/person-filled.svg?react";
import { useHover } from "/src/hooks/useHover.jsx";
import { ButtonLogout } from "#components/buttons/ButtonLogout.jsx";
import styled from "styled-components";
import { Svg } from "react_utils/svgs";

function WidgetAccount({ username, onLogout, className, style}) {
  const [hovering, onHover] = useHover();

  return (
    <Dropdown className={className} style={style}>
      <DropdownTrigger {...onHover}>
        <p>{username}</p>
        <Svg size="25">
          <IconPerson />
        </Svg>
        <DropdownWrapper open={hovering}>
          <DropdownList>
            <DropdownOption>
              <ButtonLogout onLogout={onLogout} />
            </DropdownOption>
          </DropdownList>
        </DropdownWrapper>
      </DropdownTrigger>
    </Dropdown>
  );
}

const Dropdown = styled("ul")`
  display: flex;
  flex-flow: column nowrap;
  z-index: 100;
`;

const DropdownTrigger = styled("li")`
  z-index: 100;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 10px;
  padding: 5px;
  & > p {
    font-size: var(--tx-md);
    font-weight: 500;
    padding: 0 5px;
    letter-spacing: 0.5px;
    margin-bottom: 2px;
  }
  & > svg {
    box-sizing: border-box;
    padding: 4px 3px 0 3px;
    background-color: black;
    border-radius: 50%;
    fill: white;
  }
`;

const DropdownWrapper = styled("div")`
  display: ${({ open }) => (open ? "flex" : "none")};
  z-index: 100;
  position: absolute;
  top: 35px;
  padding-top: 10px;
  right: 0;
`;

const DropdownList = styled("ul")`
  display: flex;
  flex-flow: column nowrap;
  min-width: 200px;
  background-color: var(--grey-light);
  border-radius: var(--br-nl);
`;

const DropdownOption = styled("li")`
  z-index: 100;
  border-radius: var(--br-nl);
  &:hover {
    background-color: var(--grey-subtle);
  }
`;

export { WidgetAccount };

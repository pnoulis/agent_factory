import styled from "styled-components";
import { NavLink } from "react-router-dom";

const SidebarNavLink = styled(NavLink)`
  background-color: hsl(var(--base-primary), 53%, 0.6);
  padding: 20px 0;
  border-radius: var(--br-md);
  text-align: center;
  font-size: var(--tx-md);
  font-weight: 600;
  text-transform: capitalize;
  color: white;
  letter-spacing: 0.5px;

  &:hover {
    background-color: var(--primary-base);
  }

  &:focus,
  &.active {
    background-color: var(--primary-base);
  }
`;

export { SidebarNavLink };

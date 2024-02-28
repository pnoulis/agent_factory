import * as React from "react";
import styled from "styled-components";
import { home } from "/src/links.jsx";
import { NavLink } from "react-router-dom";
import BrandLogo from "/assets/brand/logo_1.png";

function SidebarLogo({ className }) {
  return (
    <section className={className}>
      <StyledNavLink to={home.path}>
        <img src={BrandLogo} alt="agent-factory-logo" />
      </StyledNavLink>
    </section>
  );
}

const StyledNavLink = styled(NavLink)`
  display: flex;
  margin: auto;
  justify-content: center;
  align-items: center;
  img {
    margin-left: -2.5px;
  }
`;

export { SidebarLogo };

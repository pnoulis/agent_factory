import { Panel } from "#components/panel/Panel.jsx";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

function Component() {
  return (
    <PageCashiers>
      <Outlet />
    </PageCashiers>
  );
}

const PageCashiers = styled(Panel)`
  max-width: 70%;
  margin: auto;
  gap: 30px;
`;

export { Component };

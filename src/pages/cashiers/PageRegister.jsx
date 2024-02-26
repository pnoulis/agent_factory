import { FormRegisterCashier } from "#components/forms/FormRegisterCashier";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { WidgetBack } from "#components/widgets/WidgetBack.jsx";
import { useNavigate } from "react-router-dom";
import { AwaitCommand } from "#components/await-command/AwaitCommand.jsx";
import { cashiers } from "/src/links.jsx";
import { FollowState } from "#components/await-command/FollowState.jsx";
import styled from "styled-components";
import { registerCashier } from "/src/controllers/registerCashier.jsx";

function Component() {
  const navigate = useNavigate();

  return (
    <Page className="page-cashier-register">
      <PanelActionbar>
        <PanelNavbar style={{ justifyContent: "end" }}>
          <WidgetBack
            color="var(--primary-base)"
            fill="white"
            onClick={() => navigate(-1)}
          />
        </PanelNavbar>
      </PanelActionbar>
      <FollowState cmd={afm.registerCashier}>
        <Content className="content-cashier-register">
          <FormRegisterCashier
            onSubmit={({ fields }, onError) => {
              registerCashier(navigate, fields).catch(onError);
            }}
          />
        </Content>
      </FollowState>
    </Page>
  );
}

const Page = styled("div")`
  width: 100%;
  height: 100%;
`;

const Content = styled("div")`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  > form {
    max-width: 350px;
  }
`;

export { Component };

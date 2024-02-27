import { FormRegisterCashier } from "#components/forms/FormRegisterCashier";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { WidgetBack } from "#components/widgets/WidgetBack.jsx";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { registerCashier } from "/src/controllers/registerCashier.jsx";
import { cashiers as linkCashiers } from "/src/links.jsx";
import { ViewCommand } from "#components/await-command/ViewCommand.jsx";

function Component() {
  const navigate = useNavigate();

  return (
    <ViewCommand noRejected noFulfilled cmd={afm.registerCashier}>
      <Page className="page-cashier-register">
        <PanelActionbar>
          <PanelNavbar style={{ justifyContent: "end" }}>
            <WidgetBack
              color="var(--primary-base)"
              fill="white"
              onClick={() => navigate(linkCashiers.path)}
            />
          </PanelNavbar>
        </PanelActionbar>
        <Content className="content-cashier-register">
          <FormRegisterCashier
            onSubmit={({ fields, setForm }, onError) => {
              registerCashier(navigate, fields)
                .catch(onError)
                .catch(() => {
                  setForm("reset");
                });
            }}
          />
        </Content>
      </Page>
    </ViewCommand>
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

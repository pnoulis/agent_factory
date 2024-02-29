import { FormRegisterCashier } from "#components/forms/FormRegisterCashier";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { WidgetBack } from "#components/widgets/WidgetBack.jsx";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { cashiers as linkCashiers } from "/src/links.jsx";
import { ViewCommand } from "#components/await-command/ViewCommand.jsx";
import { register } from "../../controllers/cashiers.jsx";

function Component() {
  const navigate = useNavigate();

  const registerCashier = async (form, onError) => {
    try {
      await register(form.fields);
      navigate(linkCashiers.path);
    } catch (err) {
      try {
        onError(err);
      } catch (err) {
        form.setForm("reset");
      }
    }
  };

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
          <FormRegisterCashier onSubmit={registerCashier} />
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

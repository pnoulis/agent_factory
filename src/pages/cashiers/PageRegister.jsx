import { Center } from "#components/Center.jsx";
import { FormRegisterCashier } from "#components/forms/FormRegisterCashier";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { WidgetBack } from "#components/widgets/WidgetBack.jsx";
import { useNavigate } from "react-router-dom";
import { AwaitCommand } from "#components/await-command/AwaitCommand.jsx";

function Component() {
  const navigate = useNavigate();

  return (
    <>
      <PanelActionbar>
        <PanelNavbar style={{ justifyContent: "end" }}>
          <WidgetBack
            color="var(--primary-base)"
            fill="white"
            onClick={() => navigate(-1)}
          />
        </PanelNavbar>
      </PanelActionbar>
      <Center>
        <AwaitCommand cmd={afm.registerCashier}>
          <FormRegisterCashier
            onSubmit={async ({ fields }, onError) => {
              const cashier = await parsecmd(
                afm.registerCashier(fields, fields.password),
              ).catch(onError);
            }}
          />
        </AwaitCommand>
      </Center>
    </>
  );
}

export { Component };

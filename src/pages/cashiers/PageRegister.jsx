import { Center } from "#components/Center.jsx";
import { FormRegisterCashier } from "#components/forms/FormRegisterCashier";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { WidgetBack } from "#components/widgets/WidgetBack.jsx";
import { useNavigate } from "react-router-dom";

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
        <FormRegisterCashier
          onSubmit={async ({ fields }, onError) => {
            const cashier = await parsecmd(
              afm.registerCashier(fields, fields.password),
            ).catch(onError);
          }}
        />
      </Center>
    </>
  );
}

export { Component };

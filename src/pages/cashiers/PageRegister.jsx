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
          onSubmit={async (fields, setForm) => {
            try {
              const cashier = await afmResponse(
                afm.registerCashier(fields, fields.password),
              );
            } catch (err) {
              if (err.code === ERR_CODES.EVALIDATION) {
                setForm("setErrors", err.cause.validationErrors);
              }
            } finally {
              setForm("setSubmit", false);
            }
          }}
        />
      </Center>
    </>
  );
}

export { Component };

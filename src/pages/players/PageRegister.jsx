import { styled } from "styled-components";
import { FormRegisterPlayer } from "#components/forms/FormRegisterPlayer.jsx";
import { ViewCommand } from "#components/await-command/ViewCommand.jsx";
import { renderDialog } from "#components/dialogs/renderDialog.jsx";
import { DialogAlertStandard } from "../../components/dialogs/alerts/DialogAlertStandard.jsx";

function Component() {
  return (
    <Page className="page-login">
      <ViewCommand
        noRejected
        noFulfilled
        onSettled={(cmd) => {
          renderDialog(
            <DialogAlertStandard
              initialOpen
              heading={cmd.verb}
              msg={cmd.msg}
            />,
          );
        }}
        cmd={afm.registerPlayer}
      >
        <Content>
          <FormRegisterPlayer
            onSubmit={({ fields, setForm }, onError) =>
              afm
                .registerPlayer(fields, fields.password)
                .parse()
                .then(() => setForm("reset"))
                .catch(onError)
            }
          />
        </Content>
      </ViewCommand>
    </Page>
  );
}

const Page = styled("div")`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Content = styled("div")`
  width: 350px;
`;

export { Component };

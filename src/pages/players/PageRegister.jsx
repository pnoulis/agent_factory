import { styled } from "styled-components";
import { FormRegisterPlayer } from "../../components/forms/FormRegisterPlayer.jsx";
import { ViewCommand } from "../../components/await-command/ViewCommand.jsx";
import { register } from "../../controllers/player.jsx";

function Component() {
  const registerPlayer = async (form, onError) => {
    try {
      await register(form.fields);
      form.setForm("reset");
    } catch (err) {
      try {
        onError(err);
      } catch (err) {
        form.setForm("reset");
      }
    }
  };

  return (
    <Page className="page-login">
      <ViewCommand noRejected noFulfilled cmd={afm.registerPlayer}>
        <Content>
          <FormRegisterPlayer onSubmit={registerPlayer} />
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

import styled from "styled-components";
import { FormLoginCashier } from "#components/forms/FormLoginCashier.jsx";
import BrandText from "/assets/brand/logo-white.png";
import BrandFigure from "/assets/brand/logo-agent-white.png";
import BackgroundFactory from "/assets/backgrounds/homepage-background-1920x1080px.png";
import { useSession } from "/src/hooks/useSession.jsx";
import { ViewCommand } from "#components/await-command/ViewCommand.jsx";

function Component() {
  const { login } = useSession();

  const loginCashier = async (form, onError) => {
    try {
      await login(form.fields);
    } catch (err) {
      try {
        onError(err);
      } catch (err) {
        setForm("reset");
      }
    }
  };

  return (
    <ViewCommand cmd={afm.loginCashier}>
      <Page className="page-login">
        <header>
          <img src={BrandText} alt="agent factory logo" />
        </header>
        <section>
          <FormLoginCashier
            style={{ width: "350px" }}
            onSubmit={loginCashier}
          />
        </section>
        <VerticalRule />
        <footer>
          <img src={BrandFigure} alt="agent factory logo" />
        </footer>
      </Page>
    </ViewCommand>
  );
}

const Page = styled("div")`
  background-image: url(${BackgroundFactory});
  background-size: auto;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr max-content 1fr;
  grid-template-rows: 32% max-content;
  row-gap: 60px;
  padding: 50px;
  column-gap: 80px;

  > header {
    grid-column: 1 / 4;
    width: 100%;
    height: 100%;
  }

  > section {
    width: max-content;
    justify-self: end;
    align-self: center;
  }

  > footer {
    width: max-content;
    justify-self: start;
    align-self: center;
  }
`;

const VerticalRule = styled("div")`
  height: 400px;
  top: 50%;
  left: 50%;
  width: 3px;
  background-color: white;
  border-radius: 20px;
  opacity: 0.8;
  margin-left: 3px;
`;

export { Component };

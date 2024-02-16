import styled from "styled-components";
import { FormLoginCashier } from "#components/forms/FormLoginCashier.jsx";
import BrandText from "/assets/brand/logo-white.png";
import BrandFigure from "/assets/brand/logo-agent-white.png";
import BackgroundFactory from "/assets/backgrounds/homepage-background-1920x1080px.png";

function Component() {
  return (
    <Wrapper>
      <header>
        <img src={BrandText} alt="agent factory logo" />
      </header>
      <section>
        <FormLoginCashier
          onSubmit={async ({ fields }, onError) => {
            const cashier = await afmResponse(
              afm.loginCashier(fields, fields.password),
            ).catch(onError);
            debug(cashier);
          }}
        />
      </section>
      <VerticalRule />
      <footer>
        <img src={BrandFigure} alt="agent factory logo" />
      </footer>
    </Wrapper>
  );
}

const Wrapper = styled("div")`
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

import * as React from "react";
import styled from "styled-components";
import { FormGrouPartySize } from "../../components/forms/FormGrouPartySize";

function GrouPartySize({ onSubmit }) {
  return (
    <Page>
      <FormGrouPartySize onSubmit={onSubmit} />
    </Page>
  );
}

const Page = styled("div")`
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  max-width: 350px;
  margin: auto;
`;

const Label = styled("label")`
  color: var(--primary-base);
  font-size: var(--tx-xxh);
  letter-spacing: 1.5px;
  text-transform: capitalize;
  letter-spacing: 2px;
`;

export { GrouPartySize };

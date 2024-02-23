import * as React from "react";
import { Center } from "#components/Center.jsx";
import styled from "styled-components";
import { FormGrouPartySize } from "#components/forms/FormGrouPartySize";

function Component() {
  return (
    <Center>
      <Page>
        <Label id="form-groupartySize-label" htmlFor="partysize">
          Group party size
        </Label>
        <FormGrouPartySize />
      </Page>
    </Center>
  );
}

const Page = styled("div")`
  display: flex;
  flex-flow: column nowrap;
  gap: 30px;
  width: 400px;
  align-items: center;
`;

const Label = styled("label")`
  color: var(--primary-base);
  font-size: var(--tx-xxh);
  letter-spacing: 1.5px;
  text-transform: capitalize;
  letter-spacing: 2px;
`;

export { Component };

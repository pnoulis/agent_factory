import { PanelActionbar } from "#components/panel/PanelActionbar";
import { AwaitPlayers } from "/src/loaders/loadPlayers.jsx";
import { TablePlayers } from "#components/tables/TablePlayers.jsx";
import { Center } from "#components/Center.jsx";
import { Page } from "#components/Page.jsx";
import styled from "styled-components";

function Component() {
  return (
    <Page>
      <Center>
        <AwaitPlayers>
          {({ players }) => {
            debug(players, "players");
            return <TablePlayers players={players} />;
          }}
        </AwaitPlayers>
      </Center>
    </Page>
  );
}

export { Component };

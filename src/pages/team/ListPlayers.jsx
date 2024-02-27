import { Overflow } from "#components/Overflow.jsx";
import styled from "styled-components";
import { Panel } from "#components/panel/Panel.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { WidgetRoster } from "#components/widgets/WidgetRoster.jsx";
import { SquizzedPlayerInfoCard } from "#components/player/SquizzedPlayerInfoCard.jsx";

function ListPlayers({ team }) {
  return (
    <>
      <PanelActionbar>
        <ThisPanelNavbar>
          <WidgetRoster color="var(--primary-base)" fill="white" />
        </ThisPanelNavbar>
      </PanelActionbar>
      <Overflow>
        <List>
          {team.roster.map((player, i) => (
            <SquizzedPlayerInfoCard ctx={player} key={player + i} />
          ))}
        </List>
      </Overflow>
    </>
  );
}

const List = styled("div")`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 30px;
  align-content: start;
`;

const ThisPanelNavbar = styled(PanelNavbar)``;

export { ListPlayers };

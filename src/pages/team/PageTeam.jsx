import * as React from "react";
import { Panel } from "#components/panel/Panel.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { PanelNavLink } from "#components/links/PanelNavLink";
import styled from "styled-components";
import { Outlet, useNavigate, Navigate, useLocation } from "react-router-dom";
import { AwaitTeam } from "/src/loaders/loadTeam.jsx";
import { Center } from "/src/components/Center.jsx";
import { renderDialog } from "#components/dialogs/renderDialog.jsx";
import { DialogAlertStandard } from "#components/dialogs/alerts/DialogAlertStandard.jsx";
import { liveView, teamPackage, teamRoster } from "/src/links.jsx";
import { RegistrationQueue } from "#components/registration-queue/RegistrationQueue.jsx";
import { StandardPlayerInfoCard } from "#components/player/StandardPlayerInfoCard.jsx";
import { SquizzedPlayerInfoCard } from "#components/player/SquizzedPlayerInfoCard.jsx";
import { Overflow } from "#components/Overflow.jsx";
import { DataTuple } from "#components/tuple/DataTuple.jsx";
import { WidgetRoster } from "#components/widgets/WidgetRoster.jsx";

function Component() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Page className="page">
        <Panel className="panel">
          <AwaitTeam>
            {({ team }) => {
              if (!team) {
                debug(team, "team");
                return (
                  <DialogAlertStandard
                    initialOpen
                    heading="Team page"
                    msg="Missing team!"
                    onClose={() => navigate(liveView.path)}
                  />
                );
              } else if (
                !team.packages.length &&
                !new RegExp(teamPackage.path).test(location.pathname)
              ) {
                return <Navigate relative to={teamPackage.path} />;
              } else {
                return (
                  <>
                    <PanelActionbar>
                      <StyledNavbar>
                        <TeamName>
                          <DataTuple nok src={team} name="name" />
                        </TeamName>
                        <TeamState>
                          <DataTuple nok src={team} name="state" />
                        </TeamState>
                      </StyledNavbar>
                    </PanelActionbar>
                    <Content>
                      <section className="team-roster">
                        <header>
                          <WidgetRoster
                            color="var(--primary-base)"
                            fill="white"
                            content="pair wristbands"
                            onClick={() => navigate(teamRoster.path)}
                          />
                        </header>
                        <Overflow>
                          <ul className="list-roster">
                            {team.roster.map((player, i) => (
                              <SquizzedPlayerInfoCard
                                ctx={player}
                                key={player + i}
                              />
                            ))}
                          </ul>
                        </Overflow>
                      </section>
                      <section className="team-subpages">
                        <Outlet context={{ team }} />
                      </section>
                    </Content>
                  </>
                );
              }
            }}
          </AwaitTeam>
        </Panel>
      </Page>
    </>
  );
}

const Page = styled("div")`
  width: 100%;
  height: 100%;
  padding: 0 20px;

  > .panel {
    gap: 60px;
  }
`;

const Content = styled("div")`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-template-rows: 1fr;
  gap: 80px;

  .team-roster {
    order: 2;
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
  }

  .team-subpages {
  }

  .list-roster {
    display: flex;
    flex-flow: column nowrap;
    gap: 30px;
  }
`;

const StyledNavbar = styled(PanelNavbar)`
  gap: 30px;
  justify-content: end;
`;

const TeamName = styled("div")`
  color: black;
  box-sizing: border-box;
  letter-spacing: 1px;
  font-weight: 550;
  font-size: var(--tx-hg);
  font-family: Saira;
  overflow-wrap: anywhere;
`;

const TeamState = styled("div")`
  color: var(--info-base);
  box-sizing: border-box;
  letter-spacing: 1px;
  font-weight: 550;
  font-size: var(--tx-hg);
  font-family: Saira;
  overflow-wrap: anywhere;

  &::before {
    content: "(";
    font-weight: 700;
  }

  &::after {
    content: ")";
    font-weight: 700;
  }
`;

export { Component };

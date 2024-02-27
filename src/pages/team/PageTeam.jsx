import * as React from "react";
import { Panel } from "#components/panel/Panel.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { PanelNavLink } from "#components/links/PanelNavLink";
import styled from "styled-components";
import { Outlet, useNavigate, Navigate, useLocation } from "react-router-dom";
import { DialogAlertStandard } from "#components/dialogs/alerts/DialogAlertStandard";
import { liveView, teamPackage } from "/src/links.jsx";
import { ListPlayers } from "./ListPlayers.jsx";
import { ListPackages } from "./ListPackages.jsx";
import { PairWristbands } from "./PairWristbands.jsx";
import { AwaitTeam } from "/src/loaders/loadTeam.jsx";
import { DataTuple } from "#components/tuple/DataTuple.jsx";
import { WidgetRoster } from "#components/widgets/WidgetRoster.jsx";
import { SquizzedPlayerInfoCard } from "#components/player/SquizzedPlayerInfoCard.jsx";
import { Overflow } from "#components/Overflow.jsx";
import { renderDialog } from "#components/dialogs/renderDialog.jsx";
import { renderDialogPromise } from "#components/dialogs/renderDialogPromise.jsx";
import { confirmAddTeamPackage } from "#components/dialogs/confirms/confirmAddTeamPackage.jsx";
import { ViewCommand } from "#components/await-command/ViewCommand.jsx";
import { useRevalidator } from "react-router-dom";
import { smallid } from "js_utils/uuid";

const isPackageRoute = (location) =>
  new RegExp(teamPackage.path).test(location.pathname);

function Component() {
  const navigate = useNavigate();
  const [pairWristbands, setPairWristbands] = React.useState(false);
  const [selectedPkg, setSelectedPkg] = React.useState({});
  const teamRef = React.useRef();
  const revalidator = useRevalidator();
  const [id, setId] = React.useState(() => smallid());

  const registerPackage = async () => {
    if (!selectedPkg.name) {
      return renderDialogPromise(
        <DialogAlertStandard
          initialOpen
          heading="register package"
          msg="No package selected"
        />,
      );
    } else if (selectedPkg.state === "registered") {
      return renderDialogPromise(
        <DialogAlertStandard
          heading="register package"
          msg="Package is already registered"
        />,
      );
    } else if (await confirmAddTeamPackage()) {
      afm.addTeamPackage(teamRef.current, selectedPkg);
    }
  };
  const activatePackage = () => {};
  const removePackage = () => {};
  const addPackage = () => {};

  return (
    <ViewCommand
      onFulfilled={() => {
        revalidator.revalidate();
        setId(smallid());
      }}
      onSettled={(cmd) => {
        renderDialog(
          <DialogAlertStandard initialOpen heading={cmd.verb} msg={cmd.msg} />,
        );
      }}
      noRejected
      noFulfilled
      cmd={afm.addTeamPackage}
    >
      <Page key={id} className="page-team">
        <AwaitTeam>
          {({ team }) => {
            teamRef.current = team;
            return !team ? (
              <DialogAlertStandard
                heading="Team page"
                msg="Missing team"
                onClose={() => navigate(liveView.path)}
              />
            ) : team.packages.length < 1 && !isPackageRoute(location) ? (
              <Navigate relative to={teamPackage.path} />
            ) : (
              <>
                <Panel className="panel-team">
                  <PanelActionbar>
                    <ThisPanelNavbar>
                      <TeamName>
                        <DataTuple nok src={team} name="name" />
                      </TeamName>
                      <TeamState>
                        <DataTuple nok src={team} name="state" />
                      </TeamState>
                    </ThisPanelNavbar>
                  </PanelActionbar>

                  <Content className="content-team">
                    <section className="roster">
                      <Panel className="roster-panel">
                        <PanelActionbar>
                          <PanelNavbar>
                            <WidgetRoster
                              color="var(--primary-base)"
                              fill="white"
                              content={
                                pairWristbands ? "roster" : "pair wristbands"
                              }
                              onClick={() => setPairWristbands((prev) => !prev)}
                            />
                          </PanelNavbar>
                        </PanelActionbar>
                        <div className="content-roster">
                          {pairWristbands ? (
                            <PairWristbands team={team} />
                          ) : (
                            <Overflow>
                              <List>
                                {team.roster.map((player, i) => (
                                  <SquizzedPlayerInfoCard
                                    ctx={player}
                                    key={player + i}
                                  />
                                ))}
                              </List>
                            </Overflow>
                          )}
                        </div>
                      </Panel>
                    </section>

                    <section className="packages">
                      <Panel className="packages-panel">
                        <PanelActionbar />
                        {isPackageRoute(location) ? (
                          <Outlet
                            context={{
                              team,
                              registerPackage,
                              selectedPkg,
                              setSelectedPkg,
                            }}
                          />
                        ) : (
                          <ListPackages />
                        )}
                      </Panel>
                    </section>
                  </Content>
                </Panel>
              </>
            );
          }}
        </AwaitTeam>
      </Page>
    </ViewCommand>
  );
}

const Page = styled("div")`
  width: 100%;
  height: 100%;
  padding: 40px 40px 40px 40px;
  .panel-team {
    gap: 40px;
  }

  .panel-header .widget {
    width: 55px;
    height: 55px;
  }
`;
const Content = styled("div")`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: minmax(max-content, 800px) minmax(max-content, 650px);
  grid-template-rows: 1fr;
  justify-content: space-between;

  .roster {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }

  .content-roster {
    height: 100%;
    max-width: 650px;
    margin-left: auto;
  }

  .packages {
    grid-column: 1 / 2;
    grid-row: 1/ 2;
  }
  .roster .roster-panel {
    gap: 80px;
  }

  .packages .packages-panel {
    gap: 80px;
  }
`;

const ContentRightPanel = styled("div")`
  width: 100%;
  height: 100%;
`;

const ThisPanelNavbar = styled(PanelNavbar)`
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

const List = styled("div")`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 30px;
  align-content: start;
  padding-right: 20px;
`;

export { Component };

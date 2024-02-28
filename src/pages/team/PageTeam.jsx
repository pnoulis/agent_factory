import { Overflow } from "#components/Overflow.jsx";
import { ViewCommand } from "#components/await-command/ViewCommand.jsx";
import { DialogAlertStandard } from "#components/dialogs/alerts/DialogAlertStandard";
import { confirmActivateTeamPackage } from "#components/dialogs/confirms/confirmActivateTeamPackage.jsx";
import { confirmAddTeamPackage } from "#components/dialogs/confirms/confirmAddTeamPackage.jsx";
import { confirmRemoveteamPackage } from "#components/dialogs/confirms/confirmRemoveTeamPackage.jsx";
import { renderDialog } from "#components/dialogs/renderDialog.jsx";
import { Panel } from "#components/panel/Panel.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { SquizzedPlayerInfoCard } from "#components/player/SquizzedPlayerInfoCard.jsx";
import { DataTuple } from "#components/tuple/DataTuple.jsx";
import { WidgetLock } from "#components/widgets/WidgetLock.jsx";
import { WidgetRoster } from "#components/widgets/WidgetRoster.jsx";
import * as React from "react";
import {
  Navigate,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
  useRevalidator,
} from "react-router-dom";
import styled from "styled-components";
import { ListPackages } from "./ListPackages.jsx";
import { PairWristbands } from "./PairWristbands.jsx";
import { Package as PackageController } from "/src/controllers/Package.js";
import { liveView, teamPackage } from "/src/links.jsx";
import { AwaitTeam } from "/src/loaders/loadTeam.jsx";

const isPackageRoute = (location) =>
  new RegExp(teamPackage.path).test(location.pathname);

function Component() {
  const navigate = useNavigate();
  const location = useLocation();
  const revalidator = useRevalidator();
  const [pairWristbands, setPairWristbands] = React.useState(false);
  const [selectedPkg, setSelectedPkg] = React.useState({});
  const loader = useLoaderData();

  const getTeam = () => loader.team.then(({ team }) => team);
  const registerPackage = async () => {
    let msg;
    try {
      const team = await getTeam();
      await PackageController.registerPackage(team, selectedPkg);
      if (!(await confirmAddTeamPackage())) return;
      const cmd = await afm.addTeamPackage(team, selectedPkg);
      msg = cmd.msg;
      const url = new URL("..", window.origin + location.pathname + "/");
      navigate(url.pathname, { replace: true });
    } catch (err) {
      msg = err.message;
      debug(err);
    } finally {
      if (msg) {
        renderDialog(
          <DialogAlertStandard
            initialOpen
            heading="register package"
            msg={msg}
          />,
        );
      }
    }
  };

  const activatePackage = async () => {
    let msg;
    try {
      const team = await getTeam();
      await PackageController.activatePackage(team);
      if (!(await confirmActivateTeamPackage())) return;
      const cmd = await afm.startTeam(team);
      msg = cmd.msg;
      setSelectedPkg({});
      revalidator.revalidate();
    } catch (err) {
      msg = err.message;
      debug(err);
    } finally {
      if (msg) {
        renderDialog(
          <DialogAlertStandard
            initialOpen
            heading="activate package"
            msg={msg}
          />,
        );
      }
    }
  };

  const removePackage = async () => {
    let msg;
    try {
      const team = await getTeam();
      await PackageController.deregisterPackage(team, selectedPkg);
      if (!(await confirmRemoveteamPackage())) return;
      const cmd = await afm.removeTeamPackage(team, selectedPkg);
      msg = cmd.msg;
      setSelectedPkg({});
      revalidator.revalidate();
    } catch (err) {
      msg = err.message;
      debug(err);
    } finally {
      if (msg) {
        renderDialog(
          <DialogAlertStandard
            initialOpen
            heading="remove package"
            msg={msg}
          />,
        );
      }
    }
  };

  const addPackage = async () => {
    let msg;
    try {
      const team = await getTeam();
      await PackageController.addPackage(team, selectedPkg);
      setSelectedPkg({});
      navigate(teamPackage.path, { relative: true });
    } catch (err) {
      msg = err.message;
      debug(err);
    } finally {
      if (msg) {
        renderDialog(
          <DialogAlertStandard initialOpen heading="add package" msg={msg} />,
        );
      }
    }
  };

  return (
    <ViewCommand noRejected noFulfilled cmd={afm.startTeam}>
      <ViewCommand noRejected noFulfilled cmd={afm.removeTeamPackage}>
        <ViewCommand noRejected noFulfilled cmd={afm.addTeamPackage}>
          <Page className="page-team">
            <AwaitTeam>
              {({ team, id }) =>
                !team ? (
                  <DialogAlertStandard
                    heading="Team page"
                    msg="Missing team"
                    onClose={() => navigate(liveView.path)}
                  />
                ) : (
                  <Panel id={id} className="panel-team">
                    <PanelActionbar>
                      <ThisPanelNavbar>
                        <WidgetLock
                          locked={!PackageController.isTodaysTeam(team)}
                          content={
                            PackageController.isTodaysTeam(team)
                              ? "todays team"
                              : "inactive team"
                          }
                          fill="black"
                          style={{ marginRight: "auto" }}
                        />
                        <TeamName>
                          <DataTuple nok src={team} name="name" />
                        </TeamName>
                        <TeamState>
                          <DataTuple nok src={team} name="state" />
                        </TeamState>
                        {team.isTemporary && <TeamState>group party</TeamState>}
                      </ThisPanelNavbar>
                    </PanelActionbar>

                    <Content key={id} className="content-team">
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
                                onClick={async () => {
                                  if (
                                    await blockInactiveTeam(
                                      team,
                                      "pair wristbands",
                                    )
                                  ) {
                                    return;
                                  } else if (team.isTemporary) {
                                    return renderDialog(
                                      <DialogAlertStandard
                                        initialOpen
                                        heading="pair wristbands"
                                        msg="Group party teams cannot change their roster"
                                      />,
                                    );
                                  } else {
                                    setPairWristbands((prev) => !prev);
                                  }
                                }}
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
                          ) : team.packages.length === 0 ? (
                            <Navigate relative to={teamPackage.path} />
                          ) : (
                            <ListPackages
                              team={team}
                              addPackage={addPackage}
                              selectedPkg={selectedPkg}
                              setSelectedPkg={setSelectedPkg}
                              removePackage={removePackage}
                              activatePackage={activatePackage}
                            />
                          )}
                        </Panel>
                      </section>
                    </Content>
                  </Panel>
                )
              }
            </AwaitTeam>
          </Page>
        </ViewCommand>
      </ViewCommand>
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
  grid-template-rows: minmax(auto, 700px);
  justify-content: space-between;
  align-content: center;
  gap: 40px;

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
    width: 700px;
  }
  .roster .roster-panel {
    gap: 80px;
  }

  .packages .packages-panel {
    gap: 80px;
  }
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

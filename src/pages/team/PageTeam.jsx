import * as React from "react";
import { Panel } from "#components/panel/Panel.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import styled from "styled-components";
import {
  Outlet,
  useNavigate,
  Navigate,
  useLocation,
  useLoaderData,
  useRevalidator,
} from "react-router-dom";
import { DialogAlertStandard } from "#components/dialogs/alerts/DialogAlertStandard";
import { liveView, teamPackage, team as linkTeam } from "/src/links.jsx";
import { ListPackages } from "./ListPackages.jsx";
import { PairWristbands } from "./PairWristbands.jsx";
import { AwaitTeam } from "/src/loaders/loadTeam.jsx";
import { DataTuple } from "#components/tuple/DataTuple.jsx";
import { WidgetRoster } from "#components/widgets/WidgetRoster.jsx";
import { WidgetLock } from "#components/widgets/WidgetLock.jsx";
import { SquizzedPlayerInfoCard } from "#components/player/SquizzedPlayerInfoCard.jsx";
import { Overflow } from "#components/Overflow.jsx";
import { renderDialog } from "#components/dialogs/renderDialog.jsx";
import { renderDialogPromise } from "#components/dialogs/renderDialogPromise.jsx";
import { confirmAddTeamPackage } from "#components/dialogs/confirms/confirmAddTeamPackage.jsx";
import { ViewCommand } from "#components/await-command/ViewCommand.jsx";
import { confirmRemoveteamPackage } from "#components/dialogs/confirms/confirmRemoveTeamPackage.jsx";
import { confirmActivateTeamPackage } from "#components/dialogs/confirms/confirmActivateTeamPackage.jsx";
import dayjs from "dayjs";

const isPackageRoute = (location) =>
  new RegExp(teamPackage.path).test(location.pathname);

const today = dayjs().startOf("day");

const isTodaysTeam = (team) => team.t_created > today;

const blockInactiveTeam = (team, action) =>
  isTodaysTeam(team)
    ? Promise.resolve(false)
    : renderDialogPromise(
        <DialogAlertStandard
          initialOpen
          heading={action}
          msg="Cannot update inactive teams"
        />,
      ).then(() => true);

function Component() {
  const navigate = useNavigate();
  const location = useLocation();
  const [pairWristbands, setPairWristbands] = React.useState(false);
  const [selectedPkg, setSelectedPkg] = React.useState({});
  const tt = useLoaderData();
  const teamRef = React.useRef();
  const revalidator = useRevalidator();

  const getTeam = () => tt.team.then(({ team }) => team);
  const registerPackage = async () => {
    const team = await getTeam();
    if (await blockInactiveTeam(team, "register package")) {
      return;
    } else if (!selectedPkg.name) {
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
    } else if (team.packages.find((pkg) => pkg.state === "playing")) {
      return renderDialogPromise(
        <DialogAlertStandard
          initialOpen
          heading="register package"
          msg="Cannot register a new package while playing"
        />,
      );
    } else if (
      team.packages.filter((pkg) => pkg.state === "registered").length >= 1
    ) {
      return renderDialogPromise(
        <DialogAlertStandard
          initialOpen
          heading="register package"
          msg="Registered package exists already"
        />,
      );
    } else if (
      team.roster.filter(
        (player) =>
          player.wristband.inState?.("paired") ||
          player.wristband.state === "paired",
      ).length !== team.roster.length
    ) {
      return renderDialogPromise(
        <DialogAlertStandard
          initialOpen
          heading="register package"
          msg="Team players missing wristbands"
        />,
      );
    }
    if (await confirmAddTeamPackage()) {
      await afm.addTeamPackage(team, selectedPkg);
      setSelectedPkg({});
      const url = new URL("..", window.origin + location.pathname + "/");
      navigate(url.pathname);
    }
  };
  const activatePackage = async () => {
    const team = await getTeam();
    if (await blockInactiveTeam(team, "start team")) {
      return;
    } else if (
      !teamRef.current.packages.find((pkg) => pkg.state === "registered")
    ) {
      return renderDialog(
        <DialogAlertStandard
          initialOpen
          heading="start team"
          msg="Missing registered package"
        />,
      );
    }
    if (await confirmActivateTeamPackage()) {
      afm.startTeam(teamRef.current);
    }
  };
  const removePackage = async () => {
    const team = await getTeam();
    if (await blockInactiveTeam(team, "remove package")) {
      return;
    } else if (!selectedPkg.name) {
      return renderDialogPromise(
        <DialogAlertStandard
          initialOpen
          heading="remove package"
          msg="No package selected"
        />,
      );
    } else if (selectedPkg.state !== "registered") {
      return renderDialog(
        <DialogAlertStandard
          initialOpen
          heading="remove package"
          msg={`Cannot remove a ${selectedPkg.state} package`}
        />,
      );
    } else if (await confirmRemoveteamPackage()) {
      await afm.removeTeamPackage(teamRef.current, selectedPkg);
      setSelectedPkg({});
      navigate(linkTeam(teamRef.current.name).path, { replace: true });
    }
  };
  const addPackage = async () => {
    const team = await getTeam();
    if (await blockInactiveTeam(team, "add package")) {
      return;
    } else {
      {
        setSelectedPkg({});
        navigate(teamPackage.path, { relative: true });
      }
    }
  };

  return (
    <ViewCommand
      onFulfilled={(cmd) => {
        revalidator.revalidate();
      }}
      onSettled={(cmd) => {
        renderDialog(
          <DialogAlertStandard initialOpen heading={cmd.verb} msg={cmd.msg} />,
        );
      }}
      noRejected
      noFulfilled
      cmd={afm.startTeam}
    >
      <ViewCommand
        onSettled={(cmd) => {
          renderDialog(
            <DialogAlertStandard
              initialOpen
              heading={cmd.verb}
              msg={cmd.msg}
            />,
          );
        }}
        noRejected
        noFulfilled
        cmd={afm.removeTeamPackage}
      >
        <ViewCommand
          onSettled={(cmd) => {
            renderDialog(
              <DialogAlertStandard
                initialOpen
                heading={cmd.verb}
                msg={cmd.msg}
              />,
            );
          }}
          noRejected
          noFulfilled
          cmd={afm.addTeamPackage}
        >
          <Page className="page-team">
            <AwaitTeam>
              {({ team, id }) => {
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
                          <WidgetLock
                            locked={!isTodaysTeam(team)}
                            content={
                              isTodaysTeam(team)
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
                          {team.isTemporary && (
                            <TeamState>group party</TeamState>
                          )}
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
                                    pairWristbands
                                      ? "roster"
                                      : "pair wristbands"
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
                  </>
                );
              }}
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

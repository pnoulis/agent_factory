import * as React from "react";
import { Panel } from "#components/panel/Panel.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import styled from "styled-components";
import { useOutletContext, useNavigate } from "react-router-dom";
import { FollowState } from "#components/await-command/FollowState.jsx";
import { renderDialog } from "#components/dialogs/renderDialog.jsx";
import { renderDialogPromise } from "#components/dialogs/renderDialogPromise.jsx";
import { confirmAddTeamPackage } from "#components/dialogs/confirms/confirmAddTeamPackage.jsx";
import { DialogAlertStandard } from "#components/dialogs/alerts/DialogAlertStandard.jsx";
import { WidgetRegister } from "#components/widgets/WidgetRegister.jsx";
import { WidgetBack } from "#components/widgets/WidgetBack.jsx";
import { DataTuple } from "../../components/tuple/DataTuple.jsx";
import { AwaitPackages } from "../../loaders/loadPackages.jsx";
import { ComboboxSelectPackage } from "#components/comboboxes/ComboboxSelectPackage.jsx";
import { WidgetPackage } from "#components/widgets/WidgetPackage.jsx";
import { team as linkTeam } from "/src/links.jsx";

function Component() {
  const navigate = useNavigate();
  const [selectedPkg, setSelectedPkg] = React.useState({});
  const { team } = useOutletContext();

  async function handleRegisterClick() {
    if (await confirmAddTeamPackage(selectedPkg.name)) {
      afm.addTeamPackage(team, selectedPkg).then(() => {
        debug("team package resolved");
        navigate(linkTeam(team.name).path, { replace: true });
      });
    }
  }

  return (
    <Page className="page">
      <AwaitPackages>
        {({ packages }) => (
          <>
            <FollowState
              cmd={afm.addTeamPackage}
              delayPending={200}
              onSettled={(cmd) => {
                return renderDialogPromise(
                  <DialogAlertStandard
                    initialOpen
                    heading="new team package"
                    msg={cmd.msg}
                  />,
                );
              }}
            >
              <Panel className="panel">
                <PanelActionbar>
                  <PanelNavbar style={{ gap: "40px" }}>
                    <WidgetPackage
                      color="var(--primary-base)"
                      fill="white"
                      content="packages"
                      onClick={() => {
                        if (team.packages.length) {
                          return navigate(-1);
                        }
                        renderDialog(
                          <DialogAlertStandard
                            initialOpen
                            heading="List team packages"
                            msg="Team does not have any packages!"
                          />,
                        );
                      }}
                    />
                    <WidgetRegister
                      color="var(--primary-base)"
                      fill="white"
                      content="add package"
                      onClick={handleRegisterClick}
                    />
                    <Cost>
                      <DataTuple src={selectedPkg} name="cost" dval="0" />
                    </Cost>
                  </PanelNavbar>
                </PanelActionbar>
                <Content className="content">
                  {packages.map((pkg, i) => (
                    <Package key={i} $selected={pkg.type === selectedPkg.type}>
                      <Label
                        id={`select-${pkg.type}-label`}
                        htmlFor={`select-${pkg.type}-package-trigger`}
                      >
                        {`Select ${pkg.type} package`}
                      </Label>
                      <Heading>{pkg.description}</Heading>
                      <ComboboxSelectPackage
                        labelledBy={`select-${pkg?.type}-label`}
                        pkg={pkg}
                        onSelect={(pkg) => {
                          setSelectedPkg({ ...pkg });
                        }}
                      />
                    </Package>
                  ))}
                </Content>
              </Panel>
            </FollowState>
          </>
        )}
      </AwaitPackages>
    </Page>
  );
}

const Package = styled("article")`
  border-radius: var(--br-xl);
  box-shadow: var(--sd-14), var(--sd-4);
  background-color: white;
  text-transform: uppercase;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;

  > input {
    background-color: ${({ $selected }) => $selected && "var(--primary-base)"};
    color: ${({ $selected }) => $selected && "white"};
    font-weight: ${({ $selected }) => $selected && "600"};
  }
`;

const Label = styled("label")`
  color: var(--primary-base);
  letter-spacing: 1.5px;
  letter-spacing: 2px;
`;

const Heading = styled("h2")`
  letter-spacing: 1.5px;
  letter-spacing: 2px;
`;

const Page = styled("div")`
  width: 100%;
  height: 100%;

  .panel {
    padding: 0;
    gap: 100px;
  }
`;

const Cost = styled("div")`
  display: flex;
  align-items: center;
  width: 150px;
  justify-content: center;
  gap: 10px;
  background-color: var(--grey-light);
  border-radius: var(--br-sm);
  padding: 10px 20px;
  text-transform: capitalize;
  font-weight: 450;
  line-height: 3px;

  .key::after {
    content: ":";
    margin-left: 3px;
  }

  .value {
    font-weight: 550;
  }
  .value::after {
    position: relative;
    top: 1.5px;
    font-size: var(--tx-xl);
    content: "\u20AC";
    margin-left: 5px;
  }
`;

const Content = styled("div")`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 300px 300px;
  grid-template-rows: 200px;
  justify-content: space-around;
`;

export { Component };

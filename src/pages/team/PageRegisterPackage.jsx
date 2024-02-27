import * as React from "react";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import styled from "styled-components";
import { useOutletContext, useNavigate } from "react-router-dom";
import { AwaitPackages } from "../../loaders/loadPackages.jsx";
import { WidgetRegister } from "#components/widgets/WidgetRegister.jsx";
import { WidgetPackage } from "#components/widgets/WidgetPackage.jsx";
import { DataTuple } from "#components/tuple/DataTuple.jsx";
import { Overflow } from "#components/Overflow.jsx";
import { renderDialog } from "#components/dialogs/renderDialog.jsx";
import { DialogAlertStandard } from "#components/dialogs/alerts/DialogAlertStandard.jsx";
import { team as linkTeam } from "/src/links.jsx";
import { ComboboxSelectPackage } from "#components/comboboxes/ComboboxSelectPackage.jsx";

function Component() {
  const navigate = useNavigate();
  const { team, registerPackage, selectedPkg, setSelectedPkg } =
    useOutletContext();

  return (
    <Page className="page-register-package">
      <AwaitPackages>
        {({ packages }) => (
          <>
            <PanelActionbar>
              <ThisPanelNavbar>
                <Cost>
                  <DataTuple src={selectedPkg} name="cost" dval="0" />
                </Cost>

                <WidgetPackage
                  color="var(--primary-base)"
                  fill="white"
                  content="packages"
                  onClick={() =>
                    team.packages.length >= 1
                      ? navigate(linkTeam(team.name).path)
                      : renderDialog(
                          <DialogAlertStandard
                            initialOpen
                            heading="List team packages"
                            msg="Team does not have any packages!"
                          />,
                        )
                  }
                />
                <WidgetRegister
                  color="var(--primary-base)"
                  fill="white"
                  content="add package"
                  onClick={registerPackage}
                />
              </ThisPanelNavbar>
            </PanelActionbar>
            <Overflow>
              <Content className="content-register-package">
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
            </Overflow>
          </>
        )}
      </AwaitPackages>
    </Page>
  );
}

const Page = styled("div")`
  height: 100%;
  width: 100%;
`;
const Content = styled("div")`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: 200px;
  align-content: start;
  justify-content: space-between;
`;
const Cost = styled("div")`
  display: flex;
  align-items: center;
  width: 180px;
  height: 60px;
  justify-content: center;
  gap: 10px;
  background-color: var(--grey-light);
  border-radius: var(--br-sm);
  padding: 10px 20px;
  text-transform: uppercase;
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

const Package = styled("article")`
  padding: 10px 20px;
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

const ThisPanelNavbar = styled(PanelNavbar)`
  gap: 40px;
  align-items: center;
`;

export { Component };

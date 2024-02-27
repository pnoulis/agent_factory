import * as React from "react";
import { Panel } from "#components/panel/Panel.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { WidgetPlay } from "#components/widgets/WidgetPlay.jsx";
import { WidgetAdd } from "#components/widgets/WidgetAdd.jsx";
import { WidgetRemove } from "#components/widgets/WidgetRemove.jsx";
import { StandardPackageInfoCard } from "#components/package/StandardPackageInfoCard.jsx";
import { teamPackage } from "/src/links.jsx";
import { Overflow } from "#components/Overflow.jsx";
import { renderDialog } from "#components/dialogs/renderDialog.jsx";
import { DialogAlertStandard } from "../../components/dialogs/alerts/DialogAlertStandard.jsx";

function PageListPackages({ team }) {
  const [selectedPkg, setSelectedPkg] = React.useState(null);
  const navigate = useNavigate();

  function removePackage() {
    if (!selectedPkg) {
      renderDialog(
        <DialogAlertStandard
          initialOpen
          heading="remove package"
          msg="No package selected!"
        />,
      );
    }
  }

  function activatePackage() {
    if (!selectedPkg) {
      renderDialog(
        <DialogAlertStandard
          initialOpen
          heading="remove package"
          msg="No package selected!"
        />,
      );
    }
  }

  return (
    <Page className="page">
      <Panel className="panel">
        <PanelActionbar>
          <PanelNavbar style={{ gap: "30px" }}>
            <WidgetAdd
              color="var(--primary-base)"
              fill="white"
              content="add package"
              onClick={() => navigate(teamPackage.path, { relative: true })}
            />
            <WidgetRemove
              color="var(--primary-base)"
              fill="white"
              content="remove package"
              onClick={removePackage}
            />
            <WidgetPlay
              color="var(--primary-base)"
              fill="white"
              content="active package"
              onClick={removePackage}
            />
          </PanelNavbar>
        </PanelActionbar>
        <Content>
          <Overflow style={{ maxWidth: "650px" }}>
            <List>
              {team.packages.map((pkg, i) => {
                return (
                  <Package
                    $selected={pkg.id === selectedPkg?.id}
                    key={i}
                    onClick={() => setSelectedPkg(pkg)}
                    ctx={pkg}
                  />
                );
              })}
            </List>
          </Overflow>
        </Content>
      </Panel>
    </Page>
  );
}

const Page = styled("div")`
  width: 100%;
  height: 100%;

  .panel {
    padding: 0;
    gap: 100px;
  }
`;

const Content = styled("div")`
  width: 100%;
  height: 100%;
`;
const List = styled("ul")`
  display: flex;
  flex-flow: column nowrap;
  gap: 30px;
  padding-right: 20px;
`;

const Package = styled(StandardPackageInfoCard)`
  cursor: pointer;

  ${({ $selected }) =>
    $selected &&
    css`
      background-color: var(--secondary-base);
      .value.state {
        color: white;
      }
    `}

  &:hover {
    background-color: var(--secondary-light);
  }

  &:hover .value.state {
    color: white;
  }
`;

export { PageListPackages };

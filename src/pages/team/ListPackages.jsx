import * as React from "react";
import styled, { css } from "styled-components";
import { Overflow } from "../../components/Overflow.jsx";
import { PanelActionbar } from "../../components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "../../components/panel/PanelNavbar.jsx";
import { WidgetPlay } from "../../components/widgets/WidgetPlay.jsx";
import { WidgetAdd } from "../../components/widgets/WidgetAdd.jsx";
import { WidgetRemove } from "../../components/widgets/WidgetRemove.jsx";
import { StandardPackageInfoCard } from "../../components/package/StandardPackageInfoCard.jsx";
import { createComparatorPackageState } from "../../misc/sort.js";

const comparator = createComparatorPackageState({
  registered: 2,
  playing: 1,
  completed: 0,
});

const sortPackages = (pkgs) => [...pkgs].sort(comparator);

function ListPackages({
  team,
  addPackage,
  removePackage,
  activatePackage,
  setSelectedPkg,
  selectedPkg,
}) {
  return (
    <Page>
      <PanelActionbar>
        <ThisPanelNavbar>
          <WidgetAdd
            color="var(--primary-base)"
            fill="white"
            content="add package"
            onClick={addPackage}
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
            content="activate team"
            onClick={activatePackage}
          />
        </ThisPanelNavbar>
      </PanelActionbar>
      <Overflow style={{ maxWidth: "max-content" }}>
        <Content>
          <List>
            {sortPackages(team.packages).map((pkg, i) => (
              <Package
                $selected={pkg.id === selectedPkg?.id}
                key={i}
                onClick={() => setSelectedPkg(pkg)}
                ctx={pkg}
              />
            ))}
          </List>
        </Content>
      </Overflow>
    </Page>
  );
}

const Page = styled("div")`
  width: 100%;
  height: 100%;
`;

const Content = styled("div")`
  width: 100%;
  height: 100%;
`;

const ThisPanelNavbar = styled(PanelNavbar)`
  gap: 40px;
  align-items: center;
`;

const List = styled("ul")`
  padding-right: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  max-width: 600px;
  gap: 30px;
  align-items: start;
  justify-content: start;
`;

const Package = styled(StandardPackageInfoCard)`
  cursor: pointer;
  height: min-content;

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

export { ListPackages };

import { Panel } from "#components/panel/Panel.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { PanelButton } from "#components/buttons/PanelButton.jsx";
import IconGrouparty from "/assets/icons/players-three.svg?react";
import IconAddTeam from "/assets/icons/add-team.svg?react";
import IconRegister from "/assets/icons/merge.svg?react";
import IconDistribute from "/assets/icons/distribute.svg?react";
import { useContextApp } from "/src/contexts/ContextApp";

function Component() {
  const { t } = useContextApp();

  return (
    <Panel>
      <PanelActionbar>
        <PanelNavbar as="section">
          <PanelButton.Button>
            <PanelButton.Icon>
              <IconGrouparty />
            </PanelButton.Icon>
            <PanelButton.Text>{t("new group party")}</PanelButton.Text>
          </PanelButton.Button>
          <PanelButton.Button>
            <PanelButton.Icon>
              <IconAddTeam />
            </PanelButton.Icon>
            <PanelButton.Text>{t("add team")}</PanelButton.Text>
          </PanelButton.Button>
          <PanelButton.Button>
            <PanelButton.Icon>
              <IconRegister />
            </PanelButton.Icon>
            <PanelButton.Text>{t("merge")}</PanelButton.Text>
          </PanelButton.Button>
          <PanelButton.Button>
            <PanelButton.Icon>
              <IconDistribute />
            </PanelButton.Icon>
            <PanelButton.Text>{t("distribute")}</PanelButton.Text>
          </PanelButton.Button>
        </PanelNavbar>
      </PanelActionbar>
    </Panel>
  );
}

export { Component };

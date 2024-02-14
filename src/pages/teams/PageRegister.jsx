import { Panel } from "#components/panel/Panel.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { PanelButton } from "#components/buttons/PanelButton.jsx";
import IconRegister from "/assets/icons/merge.svg?react";
import { useContextApp } from "/src/contexts/ContextApp";

function Component() {
  const { t } = useContextApp();

  return (
    <Panel>
      <PanelActionbar>
        <PanelNavbar as="section">
          <PanelButton.Button>
            <PanelButton.Icon>
              <IconRegister />
            </PanelButton.Icon>
            <PanelButton.Text>{t("merge")}</PanelButton.Text>
          </PanelButton.Button>
        </PanelNavbar>
      </PanelActionbar>
    </Panel>
  );
}

export { Component };

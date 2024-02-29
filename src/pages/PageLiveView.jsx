import * as React from "react";
import { PanelNavLink } from "../components/links/PanelNavLink";
import { Panel } from "../components/panel/Panel.jsx";
import { PanelActionbar } from "../components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "../components/panel/PanelNavbar.jsx";
import { TableTeams } from "../components/tables/TableTeams.jsx";
import { useNavigate, useRevalidator } from "react-router-dom";
import styled from "styled-components";
import IconLiveView from "/assets/icons/liveView.svg?react";
import { useContextApp } from "/src/contexts/ContextApp";
import { liveView, team } from "/src/links.jsx";
import { AwaitTeams } from "/src/loaders/loadTeams.jsx";
import { ComboboxSelectStandard } from "../components/comboboxes/ComboboxSelectStandard.jsx";
import { useFilter } from "/src/hooks/useFilter.jsx";
import { useSubscription } from "../hooks/useSubscription.jsx";

function Component() {
  const { t } = useContextApp();
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const { filters, setFilter } = useFilter({
    defaultFilter: {
      type: "time",
      value: "today",
    },
  });

  useSubscription(
    afm.subscribeTeams,
    { skip: 3, withMsg: false, revalidator: true },
    (err, teams) => {
      revalidator.revalidate();
    },
  );

  return (
    <Page className="page-liveview">
      <AwaitTeams>
        {({ teams, id }) => (
          <>
            <Panel className="panel-liveview">
              <PanelActionbar>
                <ThisPanelNavbar>
                  <section className="links">
                    <PanelNavLink.Anchor end to={liveView.path}>
                      <PanelNavLink.Icon>
                        <IconLiveView />
                      </PanelNavLink.Icon>
                      <PanelNavLink.Text>{t(liveView.label)}</PanelNavLink.Text>
                    </PanelNavLink.Anchor>
                  </section>
                  <Filterbar id={id}>
                    <ComboboxSelectStandard
                      className="filter"
                      data-selected={filters.has("type", "time")}
                      name="filter-time"
                      options={[
                        "today",
                        "yesterday",
                        "week",
                        "month",
                        "year",
                        "all",
                      ]}
                      value={
                        filters.has("type", "time") && filters.get("value")
                      }
                      label="filter by time"
                      onSelect={(time) => {
                        setFilter({ type: "time", value: time });
                      }}
                    />
                    <ComboboxSelectStandard
                      className="filter"
                      data-selected={filters.has("type", "state")}
                      name="filter-state"
                      options={["registered", "playing"]}
                      value={
                        filters.has("type", "state") && filters.get("value")
                      }
                      label="filter by status"
                      onSelect={(state) => {
                        setFilter({ type: "state", value: state });
                      }}
                    />
                  </Filterbar>
                </ThisPanelNavbar>
              </PanelActionbar>
              <Content className="content-liveview">
                <TableTeams
                  key={id}
                  teams={teams}
                  onRowClick={(row) => {
                    navigate(team(row.name).path);
                  }}
                />
              </Content>
            </Panel>
          </>
        )}
      </AwaitTeams>
    </Page>
  );
}

const Page = styled("div")`
  width: 100%;
  height: 100%;
  padding: 20px;

  .panel-liveview {
    gap: 20px;
  }
`;

const Content = styled("div")`
  height: 100%;
  width: 100%;
  padding: 40px 40px 20px 40px;
`;

const ThisPanelNavbar = styled(PanelNavbar)`
  .links {
    display: flex;
    flex-flow: row nowrap;
    gap: 10px;
  }
`;

const Filterbar = styled("section")`
  margin-left: auto;
  display: flex;
  align-items: center;
  padding-right: 50px;
  gap: 20px;
  .filter[data-selected="true"] input {
    font-weight: 600;
    background-color: var(--primary-base);
    color: white;
  }
  .filter[data-selected="true"] label {
    background-color: var(--primary-base);
    font-weight: 500;
    color: white;
  }
  .filter[data-selected="true"] svg {
    fill: white;
  }
`;

export { Component };

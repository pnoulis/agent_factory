import { ButtonFilter } from "#components/buttons/ButtonFilter.jsx";
import { ComboboxRooms } from "#components/comboboxes/ComboboxRooms.jsx";
import { PanelNavLink } from "#components/links/PanelNavLink";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { TableScoreboardTop10 } from "#components/tables/TableScoreboardTop10";
import { WidgetElementAir } from "#components/widgets/WidgetElementAir.jsx";
import { WidgetElementEarth } from "#components/widgets/WidgetElementEarth.jsx";
import { WidgetElementFire } from "#components/widgets/WidgetElementFire.jsx";
import { WidgetElementWater } from "#components/widgets/WidgetElementWater.jsx";
import * as React from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import IconTop10 from "/assets/icons/scoreboard-top-10.svg?react";
import IconScoreboard from "/assets/icons/scoreboard.svg?react";
import { useContextApp } from "/src/contexts/ContextApp";
import { useFilter } from "/src/hooks/useFilter.jsx";
import {
  scoreboard as linkScoreboard,
  scoreboardTop10 as linkScoreboardTop10,
} from "/src/links.jsx";
import { AwaitScoreboardTop10 } from "/src/loaders/loadScoreboardTop10.jsx";
import { useSubscription } from "../../hooks/useSubscription.jsx";
import { useRevalidator } from "react-router-dom";

function Component() {
  const { t } = useContextApp();
  const { filters, setFilter } = useFilter({
    defaultFilter: {
      type: "element",
      value: "air",
    },
  });
  const revalidator = useRevalidator();
  useSubscription(
    afm.subscribeScoreboard,
    {
      skip: 3,
      withMsg: false,
      revalidator: true,
    },
    (err, scoreboard) => {
      revalidator.revalidate();
    },
  );

  return (
    <Page className="page">
      <AwaitScoreboardTop10>
        {({ scoreboard, rooms, id }) => (
          <>
            <PanelActionbar>
              <ThisPanelNavbar>
                <section className="links">
                  <PanelNavLink.Anchor end to={linkScoreboard.path}>
                    <PanelNavLink.Icon>
                      <IconScoreboard />
                    </PanelNavLink.Icon>
                    <PanelNavLink.Text>live</PanelNavLink.Text>
                  </PanelNavLink.Anchor>
                  <PanelNavLink.Anchor end to={linkScoreboardTop10.path}>
                    <PanelNavLink.Icon>
                      <IconTop10 />
                    </PanelNavLink.Icon>
                    <PanelNavLink.Text>
                      {linkScoreboardTop10.label}
                    </PanelNavLink.Text>
                  </PanelNavLink.Anchor>
                </section>
                <Filterbar key={id}>
                  <section className="filter-element">
                    <WidgetElementAir
                      className="filter"
                      data-selected={filters.has("value", "air")}
                      onClick={() =>
                        setFilter({ type: "element", value: "air" })
                      }
                    />
                    <WidgetElementFire
                      className="filter"
                      data-selected={filters.has("value", "fire")}
                      onClick={() =>
                        setFilter({ type: "element", value: "fire" })
                      }
                    />
                    <WidgetElementEarth
                      className="filter"
                      data-selected={filters.has("value", "earth")}
                      onClick={() => {
                        setFilter({ type: "element", value: "earth" });
                      }}
                    />
                    <WidgetElementWater
                      className="filter"
                      data-selected={filters.has("value", "water")}
                      onClick={() =>
                        setFilter({ type: "element", value: "water" })
                      }
                    />
                  </section>
                  <section className="filter-time">
                    <ButtonFilter
                      className="filter"
                      data-selected={filters.has("value", "allTime")}
                      onClick={() =>
                        setFilter({ type: "time", value: "allTime" })
                      }
                    >
                      all time
                    </ButtonFilter>
                    <ButtonFilter
                      className="filter"
                      data-selected={filters.has("value", "daily")}
                      onClick={() =>
                        setFilter({ type: "time", value: "daily" })
                      }
                    >
                      today
                    </ButtonFilter>
                    <ButtonFilter
                      className="filter"
                      data-selected={filters.has("value", "weekly")}
                      onClick={() =>
                        setFilter({ type: "time", value: "weekly" })
                      }
                    >
                      this week
                    </ButtonFilter>
                    <ButtonFilter
                      className="filter"
                      data-selected={filters.has("value", "monthly")}
                      onClick={() =>
                        setFilter({ type: "time", value: "monthly" })
                      }
                    >
                      this month
                    </ButtonFilter>
                  </section>
                  <section className="filter-room">
                    <ComboboxRooms
                      data-selected={filters.has("type", "room")}
                      className="filter"
                      value={
                        filters.has("type", "room") && filters.get("value")
                      }
                      style={{ height: "100%" }}
                      rooms={rooms}
                      onSelect={(room) => {
                        setFilter({ type: "room", value: room });
                      }}
                    />
                  </section>
                </Filterbar>
              </ThisPanelNavbar>
            </PanelActionbar>
            <Content>
              <TableScoreboardTop10 key={id} scoreboard={scoreboard} />
            </Content>
          </>
        )}
      </AwaitScoreboardTop10>
    </Page>
  );
}

const Page = styled("div")`
  width: 100%;
  height: 100%;
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
  margin: auto;
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: 1fr 1fr;
  row-gap: 15px;

  .filter-element {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    display: flex;
    flex-flow: row nowrap;
    gap: 15px;
  }

  .filter-time {
    grid-row: 2 / 3;
    grid-column: 1 / 3;
    display: flex;
    flex-flow: row nowrap;
    gap: 15px;
  }

  .filter-room {
    grid-column: 2 / 3;
    justify-self: end;
  }

  .filter[data-selected="true"] {
    background-color: var(--primary-base);
    color: white;
  }
  .filter[data-selected="true"] svg {
    fill: white;
  }
`;

const Content = styled("div")`
  width: 100%;
  height: 100%;
`;

export { Component };

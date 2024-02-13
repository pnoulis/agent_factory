import * as React from "react";
import * as links from "/src/links.jsx";
import styled from "styled-components";
import { Header } from "./Header.jsx";
import { WidgetDate } from "#components/widgets/WidgetDate.jsx";
import { WidgetTime } from "#components/widgets/WidgetTime.jsx";
import { WidgetAccount } from "#components/widgets/WidgetAccount.jsx";
import { WidgetLanguage } from "#components/widgets/WidgetLanguage.jsx";
import { Sidebar } from "./Sidebar.jsx";
import { SidebarLogo } from "./SidebarLogo.jsx";
import { SidebarNavigation } from "./SidebarNavigation.jsx";
import { SidebarNavLink } from "./SidebarNavLink.jsx";
import { Main } from "./Main.jsx";

function Site({ children, language, onLanguageChange, onLogout, t }) {
  return (
    <Div>
      <Header>
        <WidgetDate
          style={{ marginRight: "auto", flex: "1 0 100px" }}
          separator=","
        />
        <WidgetTime style={{ width: "max-content" }} />
        <WidgetLanguage
          language={language}
          onChange={onLanguageChange}
          style={{ width: "40px" }}
        />
        <WidgetAccount onLogout={onLogout} />
      </Header>
      <Sidebar>
        <SidebarLogo />
        <SidebarNavigation>
          <SidebarNavLink to={links.registration.path}>
            {t(links.registration.label)}
          </SidebarNavLink>
          <SidebarNavLink to={links.merge.path}>
            {t(links.merge.label)}
          </SidebarNavLink>
          <SidebarNavLink to={links.groupParty.path}>
            {t(links.groupParty.label)}
          </SidebarNavLink>
          <SidebarNavLink to={links.liveView.path}>
            {t(links.liveView.label)}
          </SidebarNavLink>
          <SidebarNavLink to={links.scoreboard.path}>
            {t(links.scoreboard.label)}
          </SidebarNavLink>
          <SidebarNavLink to={links.admin.path}>
            {t(links.admin.label)}
          </SidebarNavLink>
        </SidebarNavigation>
      </Sidebar>
      <Main>{children}</Main>
    </Div>
  );
}

const Div = styled("div")`
  all: unset;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: minmax(40px, max-content) 1fr;
  grid-template-columns: 200px 1fr;
  grid-template-areas: "sidebar header" "sidebar main";
`;

export { Site };

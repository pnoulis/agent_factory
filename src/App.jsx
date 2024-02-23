import * as React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
// import { fmagent } from "#components/flash-messages/fmagent.js";
import { Site } from "#components/site/Site.jsx";
import { ContextApp } from "./contexts/ContextApp.jsx";
import { translate } from "/src/translate.js";
// import { TaskProgress } from "./components/TaskProgress.jsx";

// import { AwaitTask } from "#components/AwaitTask.jsx";
// import { loginCashier } from "/src/links.jsx";

function Component() {
  const location = useLocation();
  const [language, setLanguage] = React.useState(navigator.language);

  const t = React.useMemo(() => {
    globalThis.t = translate.bind(null, language);
    return globalThis.t;
  }, [language, setLanguage]);

  return (
    <ContextApp
      ctx={{
        t,
        language,
        setLanguage,
        location,
        afm,
        createGroupTeam: afm.createTeamFactory("grouparty"),
        createTeam: afm.createTeamFactory("commander"),
        createGroupPlayer: afm.createPlayerFactory("grouparty"),
        createPlayerCommander: afm.createPlayerFactory("commander"),
      }}
    >
      <Site language={language} onLanguageChange={setLanguage} t={t}>
        <Outlet />
      </Site>
    </ContextApp>
  );
}

export { Component };

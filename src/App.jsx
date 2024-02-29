import * as React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Site } from "./components/site/Site.jsx";
import { ContextApp } from "./contexts/ContextApp.jsx";
import { translate } from "/src/translate.js";
import { useSession } from "/src/hooks/useSession.jsx";

function Component() {
  const location = useLocation();
  const [language, setLanguage] = React.useState(navigator.language);
  const { logout } = useSession();

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
      }}
    >
      <Site
        onLogout={logout}
        language={language}
        onLanguageChange={setLanguage}
        t={t}
      >
        <Outlet />
      </Site>
    </ContextApp>
  );
}

export { Component };

import * as React from "react";
import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import { Site } from "./components/site/Site.jsx";
import { ContextApp } from "./contexts/ContextApp.jsx";
import { useSession } from "/src/hooks/useSession.jsx";

function Component() {
  const location = useLocation();
  const { logout } = useSession();
  const ctx = useOutletContext();

  return (
    <ContextApp
      ctx={{
        ...ctx,
        location,
        afm,
      }}
    >
      <Site
        onLogout={logout}
        language={ctx.language}
        onLanguageChange={ctx.setLanguage}
        t={ctx.t}
      >
        <Outlet />
      </Site>
    </ContextApp>
  );
}

export { Component };

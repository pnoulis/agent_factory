import * as React from "react";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
// import { fmagent } from "#components/flash-messages/fmagent.js";
import { Site } from "#components/site/Site.jsx";
import { ContextApp } from "./contexts/ContextApp.jsx";
import { translate } from "/src/translate.js";
import { confirmLogoutCashier } from "#components/dialogs/confirms/confirmLogoutCashier.jsx";
import { confirmLogoutSession } from "./components/dialogs/confirms/confirmLogoutSession.jsx";
import { home, cashoutCashier } from "/src/links.jsx";
import { DialogAlertStandard } from "./components/dialogs/alerts/DialogAlertStandard.jsx";
import { renderDialog } from "./components/dialogs/renderDialog.jsx";
import { renderDialogPromise } from "./components/dialogs/renderDialogPromise.jsx";
import { useSession } from "/src/hooks/useSession.jsx";
// import { TaskProgress } from "./components/TaskProgress.jsx";

// import { AwaitTask } from "#components/AwaitTask.jsx";
// import { loginCashier } from "/src/links.jsx";

function Component() {
  const location = useLocation();
  const navigate = useNavigate();
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

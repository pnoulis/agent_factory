import * as React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
// import { fmagent } from "#components/flash-messages/fmagent.js";
import { Site } from "#components/site/Site.jsx";
import { ContextApp } from "./contexts/ContextApp.jsx";
import { translate } from "/src/translate.js";
import { removeIndex } from "/src/misc/misc.js";
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
      }}
    >
      {/* <TaskProgress /> */}
      <Site language={language} onLanguageChange={setLanguage} t={t}>
        <Outlet />
      </Site>
    </ContextApp>
  );
}

// afm.on("cmdend", (cmd) => {
//   if (cmd.res.ok) {
//     fmagent.info({ message: cmd.msg });
//   } else {
//     fmagent.warn({ message: cmd.msg });
//   }
// });
// logafm(afm);

// function App() {
//   const location = useLocation();
//   const [language, setLanguage] = React.useState(navigator.language);
//   const [currentTask, setCurrentTask] = React.useState({
//     wait: true,
//     manage: true,
//     run: !booted,
//     task: globalThis.afm.boot,
//     state: booted && "render",
//     delay: 500,
//   });

//   React.useEffect(() => {
//     registerListener("cmdcreate", "propagate", (cmd) => {
//       cmd.propagate = true;
//     });
//     registerListener("cmdcreate", "renderCmdState", (cmd) => {
//       trace(`Propagate ${cmd.propagate} cmd: ${cmd.taskname}`);
//       if (cmd.propagate && currentTask !== cmd.taskname) {
//         trace("Will render cmd state");
//         setCurrentTask({
//           wait: false,
//           manage: true,
//           run: false,
//           task: globalThis.afm[cmd.taskname],
//           delay: 500,
//         });
//       }
//     });
//     return () => deregisterListener();
//   }, []);

//   return (
//     <>
//       <ContextApp
//         ctx={{
//           t,
//           language,
//           setLanguage,
//           location,
//           registerListener,
//           deregisterListener,
//         }}
//       >
//         <AwaitTask {...currentTask}>
//           <Authorize as="cashier">
//             {(authorized) =>
//               authorized ? (
//                 location.pathname === loginCashier.path ? (
//                   <Outlet />
//                 ) : (
//                   <Site
//                     language={language}
//                     onLanguageChange={setLanguage}
//                     t={t}
//                   >
//                     <Outlet />
//                   </Site>
//                 )
//               ) : location.pathname === loginCashier.path ? (
//                 <Outlet />
//               ) : (
//                 <Navigate to={loginCashier.path} />
//               )
//             }
//           </Authorize>
//         </AwaitTask>
//       </ContextApp>
//     </>
//   );
// }

// import * as React from "react";
// import { Outlet } from "react-router-dom";
// import { FlashMessages } from "./components/flash-messages/FlashMessages.jsx";
// import { uuid } from "js_utils/uuid";
// import { FM_TIMEOUT } from "./constants.js";
// import { RenderDialogs } from "./components/dialogs/RenderDialogs.jsx";
// import { StandardAlertDialog } from "./components/dialogs/alerts/StandardAlertDialog.jsx";
// import { isFunction } from "js_utils/misc";
// import { PlayerInfoCard } from "./components/player/PlayerInfoCard.jsx";
// import { ProvidePlayer } from "./components/player/ProvidePlayer.jsx";
// import { ProvideWristband } from "./components/wristband/ProvideWristband.jsx";
// import { WristbandInfoCard } from "./components/wristband/WristbandInfoCard.jsx";
// import { WidgetWristband } from "./components/widgets/WidgetWristband.jsx";
// import { WidgetAdd } from "./components/widgets/WidgetAdd.jsx";
// import { PlayerActionCard } from "./components/player/PlayerActionCard.jsx";
// import { ContextApp } from "./contexts/ContextApp.jsx";
// import { BackendRegistration } from "./backend/registration/BackendRegistration.js";

// const backend = new BackendRegistration();
// backend.boot();

// function App() {
//   const [ctx, setCtx] = React.useState({});
//   const [fms, setfms] = React.useState([]);
//   const [dialogs, setDialogs] = React.useState([]);

//   function addFm(msg, type) {
//     setfms(fms.concat([{ msg, type, timeout: Date.now() + FM_TIMEOUT }]));
//   }

//   function addDialog(Dialog, props = {}, handleClose) {
//     setDialogs(
//       dialogs.concat([
//         {
//           Dialog,
//           props: {
//             ...props,
//             onClose: function (...args) {
//               setDialogs(dialogs.slice(dialogs.length, 1));
//               isFunction(handleClose) && handleClose(...args);
//             },
//           },
//         },
//       ]),
//     );
//   }

//   return (
//     <ContextApp ctx={ctx}>
//       <button onClick={() => addFm(uuid(), "error")}>add fm</button>
//       <button
//         style={{ display: "block" }}
//         onClick={() =>
//           addDialog(StandardAlertDialog, { msg: "hello", title: "world" })
//         }
//       >
//         add dialog
//       </button>
//       <Outlet />
//       <FlashMessages fms={fms} setfms={setfms} />
//       <RenderDialogs dialogs={dialogs} />
//     </ContextApp>
//   );
// }

export { Component };

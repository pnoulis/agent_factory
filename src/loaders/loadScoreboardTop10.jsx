import { Suspense } from "react";
import { defer, Await, useLoaderData } from "react-router-dom";
import { getafm } from "/src/getafm.js";
import { parsecmd } from "#afm/parsecmd.js";
import { Pending } from "../components/await-command/Pending2.jsx";
import { smallid } from "js_utils/uuid";
import { renderDialog } from "../components/dialogs/renderDialog.jsx";
import { DialogAlertStandard } from "../components/dialogs/alerts/DialogAlertStandard";

const loadScoreboardTop10 = (props) => {
  const { searchParams } = new window.URL(props.request.url);

  const type = searchParams.get("type");
  const value = searchParams.get("value");

  let filter;
  switch (type) {
    case "room":
      filter = ({ scoreboard }) => ({
        scoreboard: scoreboard.perRoom[value.toUpperCase()],
        rooms: Object.keys(scoreboard.roomElementAssociations),
      });
      break;
    case "time":
      filter = ({ scoreboard }) => ({
        scoreboard:
          scoreboard[`team${value.at(0).toUpperCase()}${value.slice(1)}`],
        rooms: Object.keys(scoreboard.roomElementAssociations),
      });
      break;
    case "element":
      filter = ({ scoreboard }) => ({
        scoreboard: scoreboard.perElement[value.toUpperCase()],
        rooms: Object.keys(scoreboard.roomElementAssociations),
      });
      break;
    default:
      filter = ({ scoreboard }) => ({
        scoreboard: scoreboard.perElement.AIR,
        rooms: Object.keys(scoreboard.roomElementAssociations),
      });
      break;
  }

  return defer({
    scoreboard: getafm(false)
      .then((afm) => parsecmd(afm.listScoreboard({ queue: false })))
      .then((res) => {
        const filtered = filter(res);
        filtered.id = smallid();
        if (!filtered.scoreboard) {
          filtered.scoreboard ??= [];
          renderDialog(
            <DialogAlertStandard
              initialOpen
              heading="list scoreboard"
              msg={`Missing scoreboard filter type: '${type}', key: '${value}'`}
            />,
          );
        }
        return filtered;
      }),
  });
};

function AwaitScoreboardTop10({ children }) {
  const pending = useLoaderData();
  return (
    <Suspense fallback={<Pending />}>
      <Await resolve={pending.scoreboard}>{children}</Await>
    </Suspense>
  );
}

export { loadScoreboardTop10, AwaitScoreboardTop10 };

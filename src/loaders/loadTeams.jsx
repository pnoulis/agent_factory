import { Suspense } from "react";
import { defer, Await, useLoaderData } from "react-router-dom";
import { getafm } from "/src/getafm.js";
import { parsecmd } from "#afm/parsecmd.js";
import { Pending } from "../components/await-command/Pending2.jsx";
import dayjs from "dayjs";
import { smallid } from "js_utils/uuid";
import { renderDialog } from "../components/dialogs/renderDialog.jsx";
import { DialogAlertStandard } from "../components/dialogs/alerts/DialogAlertStandard";

const time = {
  today: dayjs().startOf("day"),
  yesterday: dayjs().startOf("day").subtract(1, "day"),
  week: dayjs()
    .startOf("day")
    .subtract(1, "day")
    .isBefore(dayjs().startOf("week"))
    ? dayjs().startOf("week").subtract(1, "week")
    : dayjs().startOf("week"),
  month: dayjs().startOf("M"),
  year: dayjs().startOf("y"),
  all: 0,
};

const loadTeams = (props) => {
  const { searchParams } = new window.URL(props.request.url);

  const type = searchParams.get("type");
  const value = searchParams.get("value");
  let filter;

  switch (type) {
    case "state":
      filter = ({ teams }) => ({
        teams: teams.filter((team) => team.state === value),
      });
      break;
    case "time":
      switch (value) {
        case "yesterday":
          filter = ({ teams }) => ({
            teams: teams.filter(
              (team) =>
                team.t_created > time.yesterday && team.t_created < time.today,
            ),
          });
          break;
        default:
          filter = ({ teams }) => ({
            teams: teams.filter((team) => team.t_created > time[value]),
          });
          break;
      }
      break;
    default:
      filter = ({ teams }) => ({
        teams: teams.filter((team) => team.t_created > time.today),
      });
      break;
  }

  const teams = getafm(false)
    .then((afm) => parsecmd(afm.listTeams({ queue: false })))
    .then((res) => {
      const filtered = filter(res);
      if (!filtered.teams) {
        filtered.teams = [];
        renderDialog(
          <DialogAlertStandard
            initialOpen
            heading="list teams"
            msg={`Missing teams filter type: '${type}', key: '${value}'`}
          />,
        );
      }
      return filtered;
    })
    .then((res) => ({
      id: smallid(),
      teams: res.teams.map((team) => {
        const activePkg = team.packages.find((pkg) => pkg.state === "playing");
        debug(activePkg, "ACTIVE PKG");
        team.activePkg = activePkg;
        return team;
      }),
    }));
  return defer({ teams });
};

function AwaitTeams({ children }) {
  const pending = useLoaderData();
  return (
    <Suspense fallback={<Pending />}>
      <Await resolve={pending.teams}>{children}</Await>
    </Suspense>
  );
}

export { AwaitTeams, loadTeams };

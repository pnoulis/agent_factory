import { Team } from "../team/Team.js";
import { isFunction } from "js_utils/misc";

async function subscribeTeams(options, listener) {
  if (isFunction(options)) {
    listener = options;
  }
  const _options = {
    revalidator: options.revalidator ?? true,
  };

  const afm = this || subscribeTeams.afm;
  const unsub = await afm.adminScreen.mqtt.subscribe(
    "list/teams",
    (unsubed, err, res) => {
      if (err) {
        listener(err);
      } else if (unsubed) {
        listener(globalThis.craterr(({ UNSUB }) => UNSUB()));
      } else {
        listener(
          null,
          !_options.revalidator &&
            res.teams.map((team) =>
              Team.normalize(team, {
                defaultState: "registered",
                package: { defaultState: "registered" },
                player: { defaultState: "inTeam" },
                wristband: { defaultState: "paired", stage2: true },
              }),
            ),
        );
      }
    },
  );
  return unsub;
}

export { subscribeTeams };

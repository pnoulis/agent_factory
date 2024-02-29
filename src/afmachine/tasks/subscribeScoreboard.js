import { Team } from "../team/Team.js";
import { isFunction } from "js_utils/misc";

async function subscribeScoreboard(options, listener) {
  if (isFunction(options)) {
    listener = options;
  }
  const _options = {
    revalidator: options.revalidator ?? true,
  };

  const afm = this || subscribeScoreboard.afm;
  const unsub = await afm.adminScreen.mqtt.subscribe(
    "list/scoreboard",
    (unsubed, err, res) => {
      if (err) {
        listener(err);
      } else if (unsubed) {
        listener(globalThis.craterr(({ UNSUB }) => UNSUB()));
      } else {
        listener(
          null,
          !_options.revalidator && {
            roomElementAssociations: res.roomElementAssociations,
            live: res.live,
            teamAllTime: res.teamAllTime,
            teamMonthly: res.teamMonthly,
            teamWeekly: res.teamWeekly,
            teamDaily: res.teamDaily,
            perRoom: res.perRoom,
            perElement: res.perElement,
          },
        );
      }
    },
  );
  return unsub;
}

export { subscribeScoreboard };

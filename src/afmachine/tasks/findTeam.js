import { Task } from "../Task.js";
import { Team } from "../team/Team.js";
import { parsecmd } from "../parsecmd.js";

new Task("findTeam", Command);

function Command(team, opts) {
  const afm = this || Command.afm;
  const promise = Command.createCommand(
    afm,
    { args: { team }, opts },
    (cmd) => {
      afm.runCommand(cmd);
    },
  );
  return promise;
}
Command.verb = "find team";
Command.middleware = [
  async (ctx, next) => {
    const { teams } = await parsecmd(ctx.afm.listTeams({ queue: false }));
    const team =
      teams.find((team) => team.name === ctx.args.team?.name) || null;
    ctx.res.team = team;
    if (!team) {
      throw globalThis.craterr(({ ETEAM }) =>
        ETEAM(`Missing team: '${ctx.args.team?.name}'`),
      );
    }
    // Is it temporary?
    if (!team.roster.length) {
      // If the team has no roster it does not matter if
      // it is temporary or not, so assume it is.
      team.isTemporary = true;
      return next();
    }

    const { players } = await parsecmd(
      ctx.afm.searchPlayer(team.roster.at(0).username, { queue: false }),
    );

    // A temporary player is not returned by searchPlayer,
    // therefore the team is a group team.
    team.isTemporary = !players.length;
    return next();
  },
];
Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.msg = "Failed to find team";
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = "Successfully found team";
};

export { Command as findTeam };

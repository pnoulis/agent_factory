import { Eventful } from "../Eventful.js";
import createListPkgsTask from "./routes/listPkgs.js";
import { BackendRegistration } from "../backend/registration/BackendRegistration.js";

class Afm extends Eventful {
  constructor() {
    super([
      "connected",
      "disconnected",
      "error",
      "newCommand",
      "commandStarted",
      "commandFinished",
    ]);
    this.commandQueue = [];
    this.state = "idle";
    this.backend = new BackendRegistration();
  }
}

createListPkgsTask(Afm);

Afm.prototype.createCommand = async function (task) {
  return new Promise((resolve, reject) => {
    const command = {
      ...task,
      afm: this,
      req: {},
      res: {},
      error: null,
      resolve,
      reject,
    };
    this.commandQueue.push(command);
    command.listeners.emit("queued", command);
    this.emit("newCommand", command);
    if (this.state !== "idle") return;
    async function run(afm, command) {
      if (!command) {
        afm.state === "idle";
        return Promise.resolve();
      }
      try {
        command.listeners.emit("pending", command);
        command.listeners.emit("stateChange", "queued", "pending", command);
        afm.emit("commandStarted", command);
        await Promise.resolve(command.middleware(command));
        command.resolve(command);
        command.listeners.emit("fulfilled", command);
        command.listeners.emit("stateChange", "pending", "fulfilled", command);
      } catch (err) {
        command.error = err;
        reject(command);
        command.listeners.emit("rejected");
        command.listeners.emit("stateChange", "pending", "rejected", command);
        afm.emit("error", command);
      } finally {
        command.listeners.emit("settled", command);
        command.listeners.emit(
          "stateChange",
          command.error ? "rejected" : "fulfilled",
          'settled',
        );
        afm.emit("commandFinished", command);
        run(afm, afm.commandQueue.shift());
      }
    }
    setTimeout(() => run(this, this.commandQueue.shift()), 0);
    // Promise.resolve(run(this, this.commandQueue.shift()));
  });
};

// Afm.prototype.listPkgs = createTask('listPkgs')

// function Afm() {
//   this.commands = {
//     boot: {},
//     registerPlayer: {},
//     loginPlayer: {},
//     scanWristband: {},
//     pairWristband: {},
//     unpairWristband: {},
//     mergeTeam: {},
//     mergeGroupTeam: {},
//     isValidWristband: {},
//     getWristbandInfo: {},
//     addTeamPkg: {},
//     removeTeamPkg: {},
//     activateTeamPkg: {},
//     registerCashier: {},
//     loginCashier: {},
//     removeCashier: {},
//     startSession: {},
//     stopSession: {},
//     updateDevice: {},
//     updateDeviceScoreboardView: {},
//     listPlayers: {},
//     listPlayersWristbanded: {},
//     listPkgs: {},
//     listTeams: {},
//     listCashiers: {},
//     listDevices: {},
//     listDevicesScoreboard: {},
//     listDevicesScoreboardViews: {},
//     listScoreboard: {},
//     searchPlayers: {},
//   };
// }

export { Afm };

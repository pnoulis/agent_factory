import { MqttProxy } from "mqtt_proxy";
import { toClient } from "../../backend_topics.js";
import { TaskRunner } from "js_utils/task_runners";
import { boot } from "./api/boot.js";
import { loginPlayer } from "./api/loginPlayer.js";
import { registerPlayer } from "./api/registerPlayer.js";
import {
  registerWristband,
  onRegisterWristband,
  onceRegisterWristband,
} from "./api/registerWristband.js";
import {
  unregisterWristband,
  onUnregisterWristband,
  onceUnregisterWristband,
} from "./api/unregisterWristband.js";
import { mergeTeam, onMergeTeam, onceMergeTeam } from "./api/mergeTeam.js";
import { addPackage, onAddPackage, onceAddPackage } from "./api/addPackage.js";
import {
  removePackage,
  onRemovePackage,
  onceRemovePackage,
} from "./api/removePackage.js";
import { listRegisteredPlayers } from "./api/listRegisteredPlayers.js";
import { listWristbandPlayers } from "./api/listPairedWristbandPlayers.js";
import { listPackages } from "./api/listPackages.js";
import { startTeam, onStartTeam, onceStartTeam } from "./api/startTeam.js";
import { mergeGroupTeam } from "./api/mergeGroupTeam.js";
import { listTeams } from "./api/listTeams.js";
import { searchPlayer } from "./api/searchPlayer.js";
import { infoWristband } from "./api/infoWristband.js";
import {
  getWristbandScan,
  onWristbandScan,
  onceWristbandScan,
} from "./api/subscribeWristbandScan.js";

class BackendService {
  constructor(mqttClient, roomName, deviceType, clientId) {
    this.id = clientId;
    this.roomName = roomName;
    this.deviceType = deviceType;
    this.booted = false;
    this.tr = new TaskRunner({
      timeout: 30000,
      isConnected: () => {
        return this.booted;
      },
    });

    this.proxy = new MqttProxy({
      server: mqttClient,
      registry: {
        routes: toClient,
        params: { clientId: this.id },
        strict: true,
      },
    });
  }

  start() {
    return this.boot();
  }
  stop(cb) {
    this.mqttClient.end(cb);
  }
  publish(topic, message, options) {
    return this.tr.run(() => this.proxy.publish(topic, message, options));
  }

  subscribe(topic, listener, options) {
    return this.tr.run(() => this.proxy.subscribe(topic, listener, options));
  }
}

BackendService.prototype.boot = boot;
BackendService.prototype.loginPlayer = loginPlayer;
BackendService.prototype.registerPlayer = registerPlayer;

// --------------------------  REGISTER WRISTBAND  -------------------------- //
BackendService.prototype.registerWristband = registerWristband;
BackendService.prototype.onRegisterWristband = onRegisterWristband;
BackendService.prototype.onceRegisterWristband = onceRegisterWristband;
// -------------------------  UNREGISTER WRISTBAND  ------------------------- //

BackendService.prototype.unregisterWristband = unregisterWristband;
BackendService.prototype.onUnregisterWristband = onUnregisterWristband;
BackendService.prototype.onceUnregisterWristband = onceUnregisterWristband;
BackendService.prototype.mergeTeam = mergeTeam;
BackendService.prototype.onMergeTeam = onMergeTeam;
BackendService.prototype.onceMergeTeam = onceMergeTeam;
BackendService.prototype.addPackage = addPackage;
BackendService.prototype.onAddPackage = onAddPackage;
BackendService.prototype.onceAddPackage = onceAddPackage;
BackendService.prototype.removePackage = removePackage;
BackendService.prototype.onRemovePackage = onRemovePackage;
BackendService.prototype.onceRemovePackage = onceRemovePackage;
BackendService.prototype.listRegisteredPlayers = listRegisteredPlayers;
BackendService.prototype.listWristbandPlayers = listWristbandPlayers;
BackendService.prototype.listPackages = listPackages;
BackendService.prototype.startTeam = startTeam;
BackendService.prototype.onStartTeam = onStartTeam;
BackendService.prototype.onceStartTeam = onceStartTeam;
BackendService.prototype.mergeGroupTeam = mergeGroupTeam;
BackendService.prototype.listTeams = listTeams;
BackendService.prototype.searchPlayer = searchPlayer;
BackendService.prototype.infoWristband = infoWristband;
BackendService.prototype.getWristbandScan = getWristbandScan;
BackendService.prototype.onWristbandScan = onWristbandScan;
BackendService.prototype.onceWristbandScan = onceWristbandScan;

export { BackendService };

import { MqttProxy } from "mqtt_proxy";
import { toClient } from "../../backend_topics.js";
import { TaskRunner } from "js_utils/task_runners";
import { boot } from "./api/boot.js";
import { loginPlayer } from "./api/loginPlayer.js";
import { registerPlayer } from "./api/registerPlayer.js";
import { registerWristband } from "./api/registerWristband.js";
import { unregisterWristband } from "./api/unregisterWristband.js";
import { mergeTeam } from "./api/mergeTeam.js";
import { addPackage } from "./api/addPackage.js";
import { removePackage } from "./api/removePackage.js";
import { listRegisteredPlayers } from "./api/listRegisteredPlayers.js";
import { listWristbandPlayers } from "./api/listPairedWristbandPlayers.js";
import { listPackages } from "./api/listPackages.js";
import { startTeam } from "./api/startTeam.js";
import { mergeGroupTeam } from "./api/mergeGroupTeam.js";
import { listTeams } from "./api/listTeams.js";
import { searchPlayer } from "./api/searchPlayer.js";
import { infoWristband } from "./api/infoWristband.js";
import { subscribeWristbandScan } from "./api/subscribeWristbandScan.js";

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
BackendService.prototype.registerWristband = registerWristband;
BackendService.prototype.unregisterWristband = unregisterWristband;
BackendService.prototype.mergeTeam = mergeTeam;
BackendService.prototype.addPackage = addPackage;
BackendService.prototype.removePackage = removePackage;
BackendService.prototype.listRegisteredPlayers = listRegisteredPlayers;
BackendService.prototype.listWristbandPlayers = listWristbandPlayers;
BackendService.prototype.listPackages = listPackages;
BackendService.prototype.startTeam = startTeam;
BackendService.prototype.mergeGroupTeam = mergeGroupTeam;
BackendService.prototype.listTeams = listTeams;
BackendService.prototype.searchPlayer = searchPlayer;
BackendService.prototype.infoWristband = infoWristband;
BackendService.prototype.subscribeWristbandScan = subscribeWristbandScan;

export { BackendService };

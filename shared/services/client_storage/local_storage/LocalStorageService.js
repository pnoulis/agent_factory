import { smallid } from "js_utils/uuid";
import { StorageProvider } from "./StorageProvider.js";

class LocalStorageService {
  constructor(masterId, slaveId) {
    this.masterId = masterId || smallid();
    this.slaveId = slaveId || smallid();

    // Global shared storage
    this.global = new StorageProvider(globalThis.window.localStorage);

    // Master session
    // initialized at start
    this.master;

    // Slave session
    this.slave = new StorageProvider(
      globalThis.window.sessionStorage,
      this.slaveId,
    );
  }
}

LocalStorageService.prototype.start = function start() {
  const masterSession = this.global.get("sessionId");
  if (!masterSession) {
    // Initialize master session
    this.global.set("sessionId", this.masterId);
    this.global.set(this.masterId, {});
  } else {
    this.masterId = masterSession;
  }
  this.master = new StorageProvider(
    globalThis.window.localStorage,
    this.masterId,
  );
  this.master.set("slaves", []);

  const slaveSession = this.master
    .get("slaves")
    .find((slave) => slave === this.slaveId);
  if (!slaveSession) {
    // Register slave to master
    this.master.set((store) => {
      store.slaves.push(this.slaveId);
      return store;
    });
    // Initialize slave session
    globalThis.window.sessionStorage.setItem(this.slaveId, JSON.stringify({}));
  }
};

LocalStorageService.prototype.stop = function stop() {
  // Drop slave session
  this.slave.drop();
  // Unregister slave from master's records
};

export { LocalStorageService };

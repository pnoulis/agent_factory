import { smallid }from "js_utils/uuid";
import { StorageProvider } from "./StorageProvider.js";

class LocalStorageService {
  constructor(sessionId, clientId) {
    this.sessionId = sessionId || smallid();
    this.clientId = clientId || smallid();

    // Global shared storage
    this.global = new StorageProvider(globalThis.window.localStorage);

    // session
    this.session;

    // client initialization
    this.client = new StorageProvider(
      globalThis.window.sessionStorage,
      this.clientId,
    );
  }
}

LocalStorageService.prototype.start = function start() {
  const session = this.global.get("sessionId");
  if (!session) {
    // Initialize session
    this.global.set("sessionId", this.sessionId);
    this.global.set(this.sessionId, {});
  } else {
    this.sessionId = session;
  }
  this.session = new StorageProvider(
    globalThis.window.localStorage,
    this.sessionId,
  );
  this.global.set('clients', []);

  const clientSession = this.global
    .get("clients")
    .find((client) => client === this.clientId);
  if (!clientSession) {
    // Register client to session
    this.global.set((store) => {
      store.clients.push(this.clientId);
      return store;
    });
    // Initialize client session
    globalThis.window.sessionStorage.setItem(this.clientId, JSON.stringify({}));
  }
};

LocalStorageService.prototype.stop = function stop() {
  // Drop client session
  this.client.drop();
  // Unregister client from session's records
};

export { LocalStorageService };

import { smallid } from "js_utils/uuid";
import { StorageProvider } from "./StorageProvider.js";

/**
 * LocalStorageService
 * A wrapper to the window.localStorage and window.sessionStorage
 *
 * Client: A client of the localStorageService is a window in a browser.
 *
 */

class LocalStorageService {
  constructor(db = null) {
    this.persistent = new StorageProvider(window.localStorage, db);
    this.temporary = new StorageProvider(window.sessionStorage, db);
    this.db = db;
  }

  get(key) {
    return this.persistent.get(key);
  }
  set(key, value) {
    return this.persistent.set(key, value);
  }
  remove(key) {
    return this.persistent.remove(key);
  }
  drop() {
    return this.persistent.drop();
  }
  getCache(key, value) {
    return this.temporary.get(key, value);
  }
  setCache(key, value) {
    return this.temporary.set(key, value);
  }
  removeCache(key) {
    return this.temporary.remove(key);
  }
  dropCache() {
    return this.temporary.drop();
  }
}

export { LocalStorageService };

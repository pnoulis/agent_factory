class StorageProvider {
  constructor(storageProvider, db = null) {
    this.storageProvider = storageProvider;
    this.db = db;
  }
}

/**
 * Set value of key in storage
 * @param {string} key
 * @param {any} value
 * @returns {(null|Object|any)} store
 * @throws {Error}
 */
StorageProvider.prototype.set = function set(key, value) {
  try {
    if (typeof key === "function") {
      const store = key(this.get()) || {};
      if (this.db) {
        this.storageProvider.setItem(this.db, JSON.stringify(store));
      } else {
        for (const [k, v] of Object.entries(store)) {
          this.storageProvider.setItem(k, JSON.stringify(v));
        }
      }
      return this.get();
    }

    if (this.db) {
      const store = this.get() || {};
      store[key] = value;
      this.storageProvider.setItem(this.db, JSON.stringify(store));
      return store;
    }
    this.storageProvider.setItem(key, JSON.stringify(value));
    return this.get();
  } catch (err) {
    throw new Error(`localStorageProvider.set(${key} ${value}) failed!`, {
      cause: err,
    });
  }
};

/**
 * Get value of key in storage
 * @param {string} key
 * @returns {(null|Object|any)} store
 * @throws {Error}
 */
StorageProvider.prototype.get = function get(key) {
  let store;
  try {
    if (this.db) {
      store = JSON.parse(this.storageProvider.getItem(this.db));
      return !store ? null : key ? store[key] : store;
    }

    if (key) {
      return JSON.parse(this.storageProvider.getItem(key));
    }

    store = {};
    for (const [k, v] of Object.entries(this.storageProvider)) {
      store[k] = JSON.parse(v);
    }
    return store;
  } catch (err) {
    throw new Error(`StorageProvider.get(${key}) failed!`, { cause: err });
  }
};

/**
 * Remove property identified by key
 * @param {string} key
 */
StorageProvider.prototype.remove = function remove(key) {
  if (this.db) {
    const store = this.get() || {};
    delete store[key];
    this.storageProvider.setItem(db, JSON.stringify(store));
  } else {
    this.storageProvider.removeItem(key);
  }
};

/**
 * Drop database
 */
StorageProvider.prototype.drop = function drop() {
  if (this.db) {
    this.storageProvider.removeItem(db);
  } else {
    this.storageProvider.clear();
  }
};

export { StorageProvider };

#!/usr/bin/env node

/*
  make run file=scripts/listDevices.js
*/

import { BackendRegistration } from "../src/backend/registration/BackendRegistration.js";

const b = new BackendRegistration();

let err;
try {
  const devices = await b.listDevices();
  console.log(devices);
} catch (err) {
  console.error(err);
  err = err;
} finally {
  await b.stop();
  process.exit(err ? 1 : 0);
}

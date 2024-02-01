import "../src/debug.js";
import { BackendRegistration } from "../src/backend/registration/BackendRegistration.js";
import { deleteUserRows } from "../src/mysqldb/deleteUserRows.js";
import { DEFAULT_CASHIER } from "../src/constants.js";
import { registrationTopics } from "../backend-topics.js";
import { afm } from "../src/afmachine/afm.js";

globalThis.backend;

if (globalThis.backend === undefined) {
  debug("Test-setup task: Started BackendRegistration");
  const b = new BackendRegistration();
  globalThis.backend = b;

  await deleteUserRows();
  await b.registerCashier(DEFAULT_CASHIER);
  const { cashiers } = await b.listCashiers();
  globalThis.defaultCashier = cashiers.find(
    (cashier) => cashier.username === DEFAULT_CASHIER.username,
  );
  if (globalThis.defaultCashier === undefined) {
    throw new Error(
      `Could not locate DEFAULT_CASHIER: ${DEFAULT_CASHIER.username}`,
    );
  }
  const { jwtResponse } = await b.loginCashier({
    ...defaultCashier,
    password: "mindtr@p",
  });
  defaultCashier.jwt = jwtResponse.jwt;
  globalThis.afm = afm;
  globalThis.topics = registrationTopics;
}

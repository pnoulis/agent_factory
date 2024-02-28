import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import { SCOREBOARD_VIEWS } from "../src/constants.js";

const task = "updateScoreboardDeviceView";
const b = globalThis.backend;
const afm = globalThis.afm;
const topics = globalThis.topics;
const modelRequest = {
  timestamp: 1707072209571,
  deviceId: "scor1",
  status: "WEEKLY",
};
const modelResponse = {
  timestamp: 1707072209641,
  result: "OK",
};

describe(task, () => {
  it("Should validate the Model Request", () => {
    const validate = topics[task].schema.req;
    if (validate === null) return;
    validate(modelRequest);
    if (validate.errors) {
      console.log(validate.errors);
    }
    expect(validate.errors).toBeNull();
    validate({});
    expect(validate.errors).not.toBeNull();
  });
  it("Should validate the Model Response", () => {
    const validate = topics[task].schema.res;
    validate(modelResponse);
    if (validate.errors) {
      console.log(validate.errors);
    }
    expect(validate.errors).toBeNull();
    validate({});
    expect(validate.errors).not.toBeNull();
  });
  it("Should validate and normalize the Backend response", async () => {
    const validate = topics[task].schema.res;
    const { scoreboardDevices } = await b.listScoreboardDevices();
    const device = scoreboardDevices.at(0);
    if (device == null) throw new Error(`Missing scoreboard devices`);
    const view = SCOREBOARD_VIEWS.filter(
      (view) => view !== device.status,
    ).pop();
    const response = await b[task]({
      timestamp: Date.now(),
      deviceId: device.deviceId,
      status: view,
    });
    validate(response);
    if (validate.errors) {
      console.log(validate.errors);
    }
    expect(validate.errors).toBeNull();
    validate({});
    expect(validate.errors).not.toBeNull();
  });
  it("Should have an Afmachine Task", async () => {
    const { scoreboardDevices } = await b.listScoreboardDevices();
    const device = scoreboardDevices.at(0);
    if (device == null) throw new Error(`Missing scoreboard devices`);
    const view = SCOREBOARD_VIEWS.filter(
      (view) => view !== device.status,
    ).pop();
    await expect(afm[task](device, view)).resolves.toMatchObject({ ok: true });
  });
});

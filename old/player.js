import "../src/debug.js";
import { describe, it, expect, beforeAll } from "vitest";
import { ENV } from "../src/config.js";
import { PlayerCommander } from "../src/player/thin/PlayerCommander.js";
import { PlayerTarget } from "../src/player/thin/PlayerTarget.js";
import { afm } from "../src/afmachine/afm.js";

ENV.LOGLEVEL = "trace";
logafm(afm);

describe("player", () => {
  it.skip("Should only register() when in Unregistered state", async () => {
    let p = new PlayerCommander(afm);

    // registered player cannot register
    p.setState("registered");
    expect(p.getState()?.name).toEqual("registered");
    try {
      await p.register();
    } catch (err) {
      expect(err).toBeTypeOf("object");
      expect(err.errs).toBeInstanceOf(Array);
      expect(err.errs.length).toBeGreaterThanOrEqual(1);
      expect(err.errs[0]).toBeInstanceOf(Error);
    }

    // inTeam player cannot register
    p.setState("inTeam");
    expect(p.getState()?.name).toEqual("inTeam");
    try {
      await p.register();
    } catch (err) {
      expect(err).toBeTypeOf("object");
      expect(err.errs).toBeInstanceOf(Array);
      expect(err.errs.length).toBeGreaterThanOrEqual(1);
      expect(err.errs[0]).toBeInstanceOf(Error);
    }

    // playing player cannot register
    p.setState("playing");
    expect(p.getState()?.name).toEqual("playing");
    try {
      await p.register();
    } catch (err) {
      expect(err).toBeTypeOf("object");
      expect(err.errs).toBeInstanceOf(Array);
      expect(err.errs.length).toBeGreaterThanOrEqual(1);
      expect(err.errs[0]).toBeInstanceOf(Error);
    }
  });
  it("Should only pairWristband() when in Unregistered or Registered state", async () => {
    const p = new PlayerCommander(afm);

    // inTeam player cannot pair a wristband
    p.setState("inTeam");
    expect(p.getState()?.name).toEqual("inTeam");
    try {
      await p.pairWristband();
    } catch (err) {
      expect(err).toBeTypeOf("object");
      expect(err.errs).toBeInstanceOf(Array);
      expect(err.errs.length).toBeGreaterThanOrEqual(1);
      expect(err.errs[0]).toBeInstanceOf(Error);
    }
    // playing player cannot pair a wristband
    p.setState("playing");
    expect(p.getState()?.name).toEqual("playing");
    try {
      await p.pairWristband();
    } catch (err) {
      expect(err).toBeTypeOf("object");
      expect(err.errs).toBeInstanceOf(Array);
      expect(err.errs.length).toBeGreaterThanOrEqual(1);
      expect(err.errs[0]).toBeInstanceOf(Error);
    }
  });
  it("Should only unpairWristband() when in Unregistered or Registered state", async () => {
    const p = new PlayerCommander(afm);

    // inTeam player cannot unpair a wristband
    p.setState("inTeam");
    expect(p.getState()?.name).toEqual("inTeam");
    try {
      await p.unpairWristband();
    } catch (err) {
      expect(err).toBeTypeOf("object");
      expect(err.errs).toBeInstanceOf(Array);
      expect(err.errs.length).toBeGreaterThanOrEqual(1);
      expect(err.errs[0]).toBeInstanceOf(Error);
    }
    // playing player cannot unpair a wristband
    p.setState("playing");
    expect(p.getState()?.name).toEqual("playing");
    try {
      await p.unpairWristband();
    } catch (err) {
      expect(err).toBeTypeOf("object");
      expect(err.errs).toBeInstanceOf(Array);
      expect(err.errs.length).toBeGreaterThanOrEqual(1);
      expect(err.errs[0]).toBeInstanceOf(Error);
    }
  });
});

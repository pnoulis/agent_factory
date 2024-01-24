import "../src/debug.js";
import { ENV } from "../src/config.js";
import { PlayerCommander } from "../src/player/thin/PlayerCommander.js";
import { PlayerTarget } from "../src/player/thin/PlayerTarget.js";
import { afm } from "../src/afmachine/afm.js";

ENV.LOGLEVEL = "trace";

const p = new PlayerCommander(afm).fill();
logent(p);
logafm(afm);
logevents(p);
await p.register();
logent(p);

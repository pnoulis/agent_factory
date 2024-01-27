import "../src/debug.js";
import { afm } from "../src/afmachine/afm.js";
import { PlayerCommander } from "../src/player/thin/PlayerCommander.js";
import { Wristband } from "../src/wristband/thin/Wristband.js";
import { WristbandCommander } from "../src/wristband/thin/WristbandCommander.js";
import { WristbandTarget } from "../src/wristband/thin/WristbandTarget.js";

logafm(afm);
const w = new WristbandCommander(afm);
const pc = new PlayerCommander(afm, {}, w).fill();
pc.pairWristband().then(() => {
  console.log(pc);
});

// pc.pairWristband();
// pc.unpairWristband();

// const w2 = new Wristband();
// const pc2 = new PlayerCommander(afm, {}, w2).fill();
// pc2.pairWristband();

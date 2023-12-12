import { stateful } from "js_utils/stateful";
import { eventful } from "js_utils/eventful";

class Wristband {
  constructor(wristband) {
    this.id = "";
    this.color = "";
    this.colorCode = "";
  }
}

class WristbandFrontend {
  constructor(wristband) {
    super(wristband);
    this.yolo = "yolo";
  }
}

export { Wristband, WristbandFrontend };

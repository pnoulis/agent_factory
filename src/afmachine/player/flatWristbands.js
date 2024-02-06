import { isArray, unique } from "js_utils/misc";

function gatherWristbands(car, src) {
  if (isArray) {
    for (let i = 0; i < src.length; i++) {
      gatherWristbands(car, src[i]);
    }
  }

  if ("wristband" in src) {
    car.push(src.wristband);
  } else if ("wristbandNumber" in src) {
    car.push({
      wristbandNumber: src.wristbandNumber,
      wristbandColor: src.wristbandColor,
      active: src.active,
    });
  }
  return car;
}

function flatWristbands(...sources) {
  return unique(gatherWristbands([], sources));
}

export { flatWristbands };

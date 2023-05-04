function mapWristbandColor(from, color) {
  if (!color) return "";
  if (from === "color") {
    switch (color) {
      case "black":
        return 0;
      case "red":
        return 1;
      case "purple":
        return 2;
      case "green":
        return 3;
      case "yellow":
        return 4;
      case "blue":
        return 5;
      case "orange":
        return 6;
      default:
        throw new Error(`Unknown wristband color code:${color}`);
    }
  } else if (from === "colorCode") {
    switch (color) {
      case 0:
        return "black";
      case 1:
        return "red";
      case 2:
        return "purple";
      case 3:
        return "green";
      case 4:
        return "yellow";
      case 5:
        return "blue";
      case 6:
        return "orange";
      default:
        throw new Error(`Unknown wristband color code:${color}`);
    }
  } else {
    throw new Error(`Unknown wristband map:${from}`);
  }
}

export { mapWristbandColor };

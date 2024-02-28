import { MoonLoader } from "react-spinners";
import { mergec } from "/src/misc/misc.js";

function Spinner({ className, style, size, color }) {
  return (
    <div className={mergec("spinner", className)} style={style}>
      <MoonLoader loading color={color} size={size} />
    </div>
  );
}

export { Spinner };

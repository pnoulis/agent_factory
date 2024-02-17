import { MoonLoader } from "react-spinners";

function Spinner({ className, style, size, color }) {
  return (
    <div className={className} style={style}>
      <MoonLoader loading color={color} size={size} />
    </div>
  );
}

export { Spinner };

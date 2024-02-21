import { Spinner } from "#components/misc/Spinner.jsx";
import styled from "styled-components";

function Pending({ className, style, size }) {
  return (
    <Spinner
      className={className}
      style={style}
      color="var(--info-strong)"
      size={size || "40px"}
    />
  );
}

export { Pending };

import { Spinner } from "#components/misc/Spinner.jsx";
import styled from "styled-components";

function Pending({ className, style }) {
  return (
    <Spinner
      className={className}
      style={style}
      color="var(--info-strong)"
      size="40px"
    />
  );
}

export { Pending };

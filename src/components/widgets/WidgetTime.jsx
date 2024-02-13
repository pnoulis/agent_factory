import { useTime } from "/src/hooks/useTime.jsx";
import styled from "styled-components";

function WidgetTime({ separator, className, style }) {
  const { hour, minute, second, literal } = useTime({ eachSec: true });
  return (
    <Time className={className} style={style}>
      <span className="hour">{hour}</span>
      <span className="separator">{separator || literal}</span>
      <span className="minute">{minute}</span>
      <span className="separator">{separator || literal}</span>
      <span className="second">{second}</span>
    </Time>
  );
}

const Time = styled("p")`
  font-size: var(--tx-nl);
  font-weight: 400;
  text-align: center;

  .hour,
  .minute,
  .second {
    display: inline-block;
    width: 35px;
  }
`;

export { WidgetTime };

import { useTime } from "/src/hooks/useTime.jsx";
import styled from "styled-components";

function WidgetDate({ separator, className, style }) {
  const { weekday, day, month, literal } = useTime();
  return (
    <Date className={className} style={style}>
      <span className="weekday">{weekday}</span>
      <span className="separator">{separator || literal}</span>
      <span className="day">{day}</span>
      <span className="separator">{separator || literal}</span>
      <span className="month">{month}</span>
    </Date>
  );
}

const Date = styled("p")`
  font-size: var(--tx-nl);
  font-weight: 400;

  .separator {
    margin: 0 5px 0 2px;
  }
`;

export { WidgetDate };

import styled from "styled-components";
import { WidgetTime } from "#components/widgets/WidgetTime.jsx";

const SiteWidgetTime = styled(WidgetTime)`
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

export { SiteWidgetTime };

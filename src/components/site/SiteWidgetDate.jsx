import styled from "styled-components";
import { WidgetDate } from "#components/widgets/WidgetDate.jsx";

const SiteWidgetDate = styled(WidgetDate)`
  margin-right: auto;
  font-size: var(--tx-nl);
  font-weight: 400;

  .separator {
    margin: 0 5px 0 2px;
  }
`;

export { SiteWidgetDate };

import styled from "styled-components";
import { Svg } from "react_utils/svgs";

/**
 * ButtonIconText
 * @example
 *```
 * import * as ButtonIconText from '/src/components/buttons/ButtonIconText.jsx';
 *
 * function ButtonIconText({ className, Icon, children }) {
 * return (
 *   <ButtonIconText.Button>
 *     <ButtonIconText.Icon>
 *       <PersonIcon />
 *     </ButtonIconText.Icon>
 *     <ButtonIconText.Text>
 *        some text
 *     </ButtonIconText.Text>
 *   </ButtonIconText.Button>
 * );
 * }
 *
 *`
 *
 */
const ButtonIconText = {};
ButtonIconText.Button = styled("button")`
  border: 2px solid black;
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  width: 160px;
  gap: 5px;
  height: 50px;
  padding: 10px;
  cursor: pointer;
`;
ButtonIconText.Icon = styled(Svg)`
  flex: 0 1 30%;
`;
ButtonIconText.Text = styled("p")`
  margin: auto;
  text-transform: uppercase;
  font-weight: 550;
`;

export { ButtonIconText };

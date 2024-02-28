import styled from "styled-components";
import BackgroundFactory from "/assets/backgrounds/sidebar-background-250x1080px.png";

const Sidebar = styled("aside")`
  box-sizing: border-box;
  grid-area: sidebar;
  background-image: url(${BackgroundFactory});
  background-size: fill;
  padding: 10px 5px;
  display: flex;
  flex-flow: column nowrap;
  gap: 50px;
`;

export { Sidebar };

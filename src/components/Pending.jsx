import styled from "styled-components";
import { MoonLoader } from "react-spinners";

function Pending({ className }) {
  return (
    <Wrapper className={className}>
      <MoonLoader loading color="var(--info-strong)" size="70px" />
    </Wrapper>
  );
}

const Wrapper = styled("div")`
  box-sizing: border-box;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: var(--grey-light);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export { Pending };

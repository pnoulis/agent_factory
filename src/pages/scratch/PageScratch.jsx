import styled from "styled-components";

const cmds = [
  {
    status: "rejected",
    reason: {
      res: { msg: 'updated', device: { id: "scor1 " } },
    },
  },
  {
    status: "fulfilled",
    value: {
      res: { msg: "updated tohunteuh touh oenuth", device: { id: "scor2 " } },
    },
  },
];

function PageScratch() {
  return (
    <>
      <h1>page scratch</h1>
      <div>
      </div>
    </>
  );
}

const Wrapper = styled("div")``;

const Div = styled("div")``;

export { PageScratch };

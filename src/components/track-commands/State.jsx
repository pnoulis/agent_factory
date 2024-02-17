import { Pending } from "./Pending.jsx";
import { Rejected } from "./Rejected.jsx";
import { Fulfilled } from "./Fulfilled.jsx";

function State({ cmd }) {
  switch (cmd.state) {
    case "rejected":
      return (
        <>
          <Rejected className="state" />
          <span className="msg">{cmd.errs.at(-1).message}</span>
        </>
      );
    case "fulfilled":
      return <Fulfilled className="state" />;
    default:
      return <Pending className="state" />;
  }
}

export { State };

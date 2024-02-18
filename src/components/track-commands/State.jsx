import { Pending } from "./Pending.jsx";
import { Rejected } from "./Rejected.jsx";
import { Fulfilled } from "./Fulfilled.jsx";

function State({ cmd }) {
  switch (cmd.state) {
    case "rejected":
      const messages = [cmd.msg];
      const { message, cause } = cmd.errs.at(-1);
      messages.push(message);
      if (cause.message) {
        messages.push(cause.message);
      }
      return (
        <>
          <Rejected className="state" />
          {messages.map((msg, i) => (
            <span key={i} className="msg">
              {msg}
            </span>
          ))}
        </>
      );
    case "fulfilled":
      return <Fulfilled className="state" />;
    default:
      return <Pending className="state" />;
  }
}

export { State };

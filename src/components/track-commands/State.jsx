import { Pending } from "./Pending.jsx";
import { Rejected } from "./Rejected.jsx";
import { Fulfilled } from "./Fulfilled.jsx";
import { Info } from "./Info.jsx";
import { Message } from "./Message.jsx";

function State({ cmd }) {
  switch (cmd.state) {
    case "rejected":
      const messages = [cmd.msg];
      const { message, cause, severity } = cmd.errs.at(-1);
      messages.push(message);
      if (cause?.message) {
        messages.push(cause.message);
      }
      return (
        <>
          {severity === "info" ? (
            <Info className="state" />
          ) : (
            <Rejected className="state" />
          )}
          {messages.map((msg, i) => (
            <Message severity={severity} key={i} className="msg">
              {t(msg)}
            </Message>
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

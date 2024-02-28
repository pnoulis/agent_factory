import * as React from "react";

const Command = React.forwardRef((props, ref) => {
  const [state, setState] = React.useState(props.cmd.state);

  React.useLayoutEffect(() => {
    const followState = (s) => setState(s);
    props.cmd.on("stateChange", followState);

    return () => {
      props.cmd.removeListener("stateChange", followState);
    };
  }, [props.cmd]);

  switch (state) {
    case "rejected":
      return React.isValidElement(children)
        ? children
        : children({ cmd, rejected: true, pending: false });
    case "fulfilled":
      return React.isValidElement(children)
        ? children
        : children({ cmd, rejected: false, pending: false });
    case "pending":
      return <Pending />;
    default:
      return wait
        ? null
        : React.isValidElement(children)
          ? children
          : children({ cmd, rejected: false, pending: true });
  }

  return <div ref={ref}>{props.children}</div>;
});

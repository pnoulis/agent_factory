import * as React from "react";

function RenderDialogs({ dialogs = [] }) {
  return (
    <>
      {dialogs.map(({ Dialog, props }, i) => (
        <Dialog key={i} {...props} />
      ))}
    </>
  );
}

export { RenderDialogs };

import * as React from "react";
import { delay } from "js_utils/misc";
import { ListCommands } from "./ListCommands.jsx";
import { Command } from "./Command.jsx";

function waitForUi(cb) {
  return cb() ? Promise.resolve() : delay(50).then(() => waitForUi(cb));
}

function TrackCommands({ cmds: initial = [] }) {
  const [cmds, setCmds] = React.useState(0);
  const cmdRefs = React.useRef(initial);

  React.useEffect(() => {
    afm.registerListener("cmdcreate", "fms", async (cmd) => {
      const index = cmdRefs.current.length;
      setCmds(index + 1);
      cmdRefs.current.push({
        cmd,
        node: null,
      });
      await waitForUi(() => cmdRefs.current[index]?.node);
    });

    return () => afm.deregisterListener("cmdcreate", "fms");
  }, []);

  const umountCommand = (cmd) => {
    const newCmds = [];
    for (let i = 0; i < cmdRefs.current.length; i++) {
      if (cmd === cmdRefs.current[i].cmd) continue;
      newCmds.push(cmdRefs.current[i]);
    }
    cmdRefs.current = newCmds;
    setCmds(newCmds.length);
  };

  return (
    <ListCommands>
      {cmdRefs.current.map((cmd, i) => (
        <Command
          key={i}
          cmd={cmd.cmd}
          umount={umountCommand}
          ref={(node) => (cmd.node = node)}
        />
      ))}
    </ListCommands>
  );
}

export { TrackCommands };

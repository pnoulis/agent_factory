import styled from "styled-components";
import { Submit } from "#components/forms/Submit.jsx";
import { TextInput } from "#components/forms/TextInput.jsx";
import { Form } from "#components/forms/Form.jsx";
import { ComboboxCashierPrivilege } from "#components/comboboxes/ComboboxCashierPrivilege";
import { TableCashiers } from "#components/tables/TableCashiers.jsx";
import { AwaitCommand } from "#components/await-command/AwaitCommand.jsx";

const cmds = [
  {
    taskname: "cmd 1",
    state: "pending",
    error: "tehunetuh",
  },
  {
    taskname: "cmd 2",
    state: "fulfilled",
    error: "tehunetuh",
  },
  {
    taskname: "cmd 3",
    state: "rejected",
    error: "tehunetuh",
  },
];

const ListCommands = styled("ul")`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  pointer-events: none;
  z-index: 3;
  display: flex;
  flex-flow: column-reverse nowrap;
  gap: 20px;
  padding: 30px;
`;

function getState(state) {
  switch (state) {
    case "rejected":
      return <Fail />;
    case "fulfilled":
      return <Success />;
    default:
      return <MoonLoader loading color="var(--info-strong)" size="40px" />;
  }
}

function PageScratch() {
  return (
    <>
      <h1>page scratch</h1>
      <Div>
        <ListCommands>
          {cmds.map((cmd, i) => (
            <AwaitCommand key={i} cmd={cmd}>
              {({ cmd }) => <p>{cmd.taskname}</p>}
            </AwaitCommand>
          ))}
        </ListCommands>
        {/* <Wrapper> */}
        {/*   <span id="taskname">taskname</span> */}
        {/*   <span id="state"> */}
        {/*     <MoonLoader size="35px" loading color="var(--info-strong)" /> */}
        {/*   </span> */}
        {/*   <span id="error">error</span> */}
        {/* </Wrapper> */}

        {/* <Wrapper> */}
        {/*   <span id="taskname">taskname</span> */}
        {/*   <span id="state"> */}
        {/*     <Success /> */}
        {/*   </span> */}
        {/*   <span id="error">error</span> */}
        {/* </Wrapper> */}

        {/* <Wrapper> */}
        {/*   <span id="taskname">taskname</span> */}
        {/*   <span id="state"> */}
        {/*     <Fail /> */}
        {/*   </span> */}
        {/*   <span id="error">error</span> */}
        {/* </Wrapper> */}
      </Div>
    </>
  );
}

const Wrapper = styled("div")`
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-auto-rows: auto;
  align-items: center;
  gap: 20px;

  #taskname {
    background-color: yellow;
  }

  #state {
  }

  #error {
    background-color: green;
    grid-column: 1 / -1;
  }
`;

const Div = styled("div")``;

export { PageScratch };
// import { Player } from "../player/Player.js";
// import { ProvidePlayer } from "../components/player/ProvidePlayer.jsx";
// import { useContextPlayer } from "../contexts/ContextPlayer.jsx";
// import { DataTuple } from "../components/tuple/DataTuple.jsx";
// import { StandardDataTuple } from "../components/tuple/StandardDataTuple.jsx";

// function PlayerInfoCard() {
//   const ctx = useContextPlayer();
//   debug("ctx:", ctx);
//   return (
//     <>
//       <div>
//         <StandardDataTuple>
//           <DataTuple src={ctx} name="username" />
//         </StandardDataTuple>
//         <StandardDataTuple>
//           <DataTuple src={ctx} name="name" />
//         </StandardDataTuple>
//         <StandardDataTuple>
//           <DataTuple src={ctx} name="surname" />
//         </StandardDataTuple>
//         <StandardDataTuple>
//           <DataTuple src={ctx} name="email" />
//         </StandardDataTuple>
//         <StandardDataTuple>
//           <DataTuple src={ctx} name="password" />
//         </StandardDataTuple>
//       </div>
//     </>
//   );
// }

// function PageScratch() {
//   return (
//     <div>
//       <h1>scratch page</h1>
//       <div>
//         <ProvidePlayer player={new Player().fill()}>
//           <PlayerInfoCard />
//         </ProvidePlayer>
//       </div>
//     </div>
//   );
// }

// export { Scratch };

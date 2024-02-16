import styled from "styled-components";
import { Submit } from "#components/forms/Submit.jsx";
import { TextInput } from "#components/forms/TextInput.jsx";
import { Form } from "#components/forms/Form.jsx";
import { ComboboxCashierPrivilege } from "#components/comboboxes/ComboboxCashierPrivilege";
import { TableCashiers } from "#components/tables/TableCashiers.jsx";
import { Pending } from "#components/Pending.jsx";
import { MoonLoader } from "react-spinners";

function PageScratch() {
  return (
    <>
      <h1>page scratch</h1>
      <Div>
        <Wrapper>
          <p id="taskname">some taskname</p>
          <MoonLoader loading color="var(--info-strong)" size='35px' />
        </Wrapper>
      </Div>
    </>
  );
}

const Wrapper = styled("div")`
  background-color: white;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 5px 20px;
  height: 50px;
  box-shadow: var(--sd-9);
  gap: 40px;
  text-transform: capitalize;

  #taskname::after {
    content: "...";
    margin-left: 5px;
    letter-spacing: 1px;
    font-weight: 500;
  }

  // position: fixed;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  // box-sizing: border-box;
  // width: 150px;
  // height: 150px;
  // border-radius: 50%;
  // ::backdrop {
  //   background-color: rgba(0, 0, 0, 0.2);
  // }
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

import styled from "styled-components";
// import { Dialog } from "#components/dialogs/Dialog.jsx";
// import { Heading } from "#components/dialogs/confirm/Heading.jsx";
// import { Description } from "#components/dialogs/confirm/Description.jsx";
// import { DialogConfirm } from "#components/dialogs/DialogConfirm.jsx";
import { DialogConfirmStandard } from "#components/dialogs/confirms/DialogConfirmStandard.jsx";
import { DialogAlertStandard } from "#components/dialogs/alerts/DialogAlertStandard.jsx";
import { DialogInputStandard } from "../../components/dialogs/inputs/DialogInputStandard";
// import { StandardAlertDialog } from "../../components/dialogs/alerts/StandardAlertDialog.jsx";
// import { BasicDialog } from "react_utils/dialogs";
import { FormLoginCashier } from "#components/forms/FormLoginCashier.jsx";
import { renderDialog } from "#components/dialogs/renderDialog.jsx";

// const DialogContent = styled(BasicDialog.Content)``;
// const DialogHeading = styled(BasicDialog.Heading)``;
// const DialogMsg = styled(BasicDialog.Description)``;
// const DialogClose = styled(BasicDialog.Close)``;
// const DialogConfirm = styled(BasicDialog.Confirm)``;

// function Dialog({ msg, heading, onClose }) {
//   return (
//     <BasicDialog.Provider initialOpen={true} onClose={onClose}>
//       <DialogContent>
//         <DialogHeading>{heading}</DialogHeading>
//         <DialogMsg>{msg}</DialogMsg>
//         <DialogClose>close</DialogClose>
//         <DialogConfirm>confirm</DialogConfirm>
//       </DialogContent>
//     </BasicDialog.Provider>
//   );
// }

// const StyledDialog = styled(Dialog)`
//   min-width: 450px;
//   max-width: 600px;
//   min-height: 150px;
//   font-family: Saira;
//   box-sizing: border-box;
//   z-index: 4;
//   gap: 15px 20px;
//   padding: 20px 35px;
//   border: none;
//   box-shadow: var(--sd-9);
//   text-align: center;

//   display: grid;
//   grid-template-columns: 1fr auto;
//   grid-template-rows: auto auto minmax(70px, auto);
//   justify-items: center;
// `;

// const StyledHeading = styled(Heading)`
//   grid-column: 1 / -1;
//   text-transform: uppercase;
//   color: var(--primary-base);
//   letter-spacing: 1px;
//   font-weight: 550;
// `;

// const StyledDescription = styled(Description)`
//   grid-column: 1 / -1;
// `;

// const StyledNo = styled(No)`
//   ${ButtonDialog}
//   align-self: end;
// `;

// const StyledYes = styled(Yes)`
//   ${ButtonDialog}
//   align-self: end;
//   justify-self: end;
// `;

function PageScratch() {
  return (
    <>
      <h1>page scratch</h1>
      <Div>
        <button
          onClick={() => {
            renderDialog(
              DialogAlertStandard,
              {
                heading: "heading",
                msg: "description",
              },
              (c) => {
                debug("dialog closed");
              },
            );
          }}
        >
          render dialog
        </button>
        {/* <DialogInputStandard */}
        {/*   initialOpen */}
        {/*   heading="login cashier" */}
        {/*   form="loginCashier" */}
        {/* > */}
        {/*   {(closeDialog) => ( */}
        {/*     <FormLoginCashier */}
        {/*       onSubmit={() => { */}
        {/*         debug("submitting"); */}
        {/*         closeDialog(); */}
        {/*       }} */}
        {/*     /> */}
        {/*   )} */}
        {/* </DialogInputStandard> */}
        {/* <DialogConfirmStandard */}
        {/*   initialOpen */}
        {/*   heading="heading" */}
        {/*   msg="otuhoenuh thoeun etouhonetu hoeustoheu soethuoes utoehu soeuthoeu stoehus oetuoesut hoeusthoe ush" */}
        {/*   yes="confirm" */}
        {/*   no="close" */}
        {/* /> */}
        {/* <DialogConfirmStandard */}
        {/*   initialOpen={true} */}
        {/*   onClose={(...args) => { */}
        {/*     debug(args); */}
        {/*     debug("let me know"); */}
        {/*   }} */}
        {/* > */}
        {/*   <Heading>heading</Heading> */}
        {/*   <Description> */}
        {/*     description tohusoet uoestuhoe sutoehu oesuthoeus oeutoeahs oetsunh */}
        {/*     oeaustoeahu soeauhtoesu toeahusthoesuth oeustohu */}
        {/*   </Description> */}
        {/*   <Yes autoFocus>yes</Yes> */}
        {/*   <No>no</No> */}
        {/* </DialogConfirmStandard> */}
        <ul>
          {new Array(50)
            .fill(
              "one otuhnoeuh oeutnh oeutnhoeu ntoeh noetuhoentu oentuhoenuthoeunt oeunt",
            )
            .map((k, i) => (
              <li key={i}>
                <p>{k}</p>
              </li>
            ))}
        </ul>
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

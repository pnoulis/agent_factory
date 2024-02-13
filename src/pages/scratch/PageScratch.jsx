import { Submit } from "#components/forms/Submit.jsx";
import { TextInput } from "#components/forms/TextInput.jsx";
import { Form } from "#components/forms/Form.jsx";

function PageScratch() {
  return (
    <>
      <h1>page scratch</h1>
      <Form
        id="loginCashier"
        fields={{ username: "", password: "" }}
        onSubmit={(fields, setForm) => {
          setForm("setErrors", { username: "toolong" });
          setForm("setSubmit", false);
        }}
      >
        <TextInput name="username" />
        <TextInput name="password" type="password" />
        <Submit>login</Submit>
      </Form>
    </>
  );
}

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

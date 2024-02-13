import * as React from "react";
import { delay } from "js_utils/misc";

function Component() {
  React.useEffect(() => {
    afm.listPackages();
  }, []);
  return (
    <>
      <h1>page merge</h1>
    </>
  );
}
// import { useContextApp } from "../../contexts/ContextApp.jsx";
// import { RegistrationQueue } from "../../components/registration-queue/RegistrationQueue.jsx";
// import { PlayerPersistent } from "../../player/PlayerPersistent.js";
// import { StandardPlayerActionCard } from "../../components/player/StandardPlayerActionCard.jsx";
// import { ProvidePlayer } from "../../components/player/ProvidePlayer.jsx";
// import { ProvideWristband } from "../../components/wristband/ProvideWristband.jsx";

// const players = new Array(6)
//   .fill(null)
//   .map((_) => new PlayerPersistent().fill());

// function PageMerge() {
//   const ctx = useContextApp();
//   return (
//     <div>
//       <RegistrationQueue
//         players={players}
//         renderPlayer={(props) => (
//           <ProvidePlayer player={props.player} {...props}>
//             <ProvideWristband wristband={props.player.wristband}>
//               <StandardPlayerActionCard forwardedAs="li" />
//             </ProvideWristband>
//           </ProvidePlayer>
//         )}
//       />
//     </div>
//   );
// }

export { Component };

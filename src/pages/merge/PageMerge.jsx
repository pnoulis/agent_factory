function Component() {
  return <div>page merge</div>;
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

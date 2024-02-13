import { FlashMessages } from "react_utils/flashMessages";
import { RootFm } from "./RootFm.jsx";
import { InfoFm } from "./InfoFm.jsx";
import { SuccessFm } from "./SuccessFm.jsx";
import { WarnFm } from "./WarnFm.jsx";
import { ErrorFm } from "./ErrorFm.jsx";

const fmagent = new FlashMessages({
  id: "afadmin-client-fms",
  Info: InfoFm,
  Warn: WarnFm,
  Error: ErrorFm,
  Success: SuccessFm,
  FmRoot: RootFm,
});


export { fmagent };

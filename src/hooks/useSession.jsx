import { useNavigate } from "react-router-dom";
import { login, logout, cashout } from "../session.jsx";

function useSession() {
  const navigate = useNavigate();
  const cashier = JSON.parse(window.localStorage.getItem("cashier")) || null;

  const setSession = (session) =>
    window.localStorage.setItem("cashier", JSON.stringify(session));

  return {
    cashier,
    setSession,
    login: login.bind(null, navigate),
    logout: logout.bind(null, navigate),
    cashout: cashout.bind(null, navigate),
  };
}

export { useSession };

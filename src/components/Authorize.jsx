import { Navigate } from "react-router-dom";
import { isFunction } from "js_utils/misc";
import { loginCashier } from "/src/links.jsx";

function Authorize({ as, level = "cashier", children }) {
  const user = as || "";
  return isFunction(children) ? (
    children(user === level)
  ) : user === level ? (
    children
  ) : (
    <Navigate to={loginCashier.path} />
  );
}

export { Authorize };

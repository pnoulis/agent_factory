import { Navigate } from "react-router-dom";
import { isFunction } from "js_utils/misc";
import { login } from "/src/links.jsx";

function Authorize({ as, level = "cashier", children }) {
  const user = as || "";
  return isFunction(children) ? (
    children(user === level)
  ) : user === level ? (
    children
  ) : (
    <Navigate to={login.path} />
  );
}

export { Authorize };

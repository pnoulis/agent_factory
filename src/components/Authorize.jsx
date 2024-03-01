import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isFunction } from "js_utils/misc";
import { loginCashier } from "/src/links.jsx";

function Authorize({ as, level = "cashier", children }) {
  const { pathname } = useLocation();

  const user = as || JSON.parse(window.localStorage.getItem("cashier"));
  const authorized = user && user?.role === level;
  return isFunction(children) ? (
    children({ user, level, authorized })
  ) : authorized ? (
    children
  ) : pathname === loginCashier.path ? (
    <Outlet />
  ) : (
    <Navigate replace to={loginCashier.path} />
  );
}

export { Authorize };

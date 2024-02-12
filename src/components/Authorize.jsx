import { Navigate } from "react-router-dom";
function Authorize({ as, level = "cashier", children }) {
  const user = as || "";
  return user === level ? children : <Navigate to="/login" />;
}

export { Authorize };

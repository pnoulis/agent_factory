import { Outlet, useNavigate } from "react-router-dom";
import { WidgetAdd } from "#components/widgets/WidgetAdd.jsx";

function Component() {
  const navigate = useNavigate();

  return (
    <>
      <WidgetAdd
        onClick={(e) => navigate("register")}
        color="var(--primary-base)"
        fill="white"
      />
      <Outlet />
    </>
  );
}

export { Component };

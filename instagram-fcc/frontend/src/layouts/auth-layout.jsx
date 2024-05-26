import { Outlet, useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/local-storage";
import { useEffect } from "react";
import { ACCESS_TOKEN } from "../constants";

function AuthLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!getAccessToken()) navigate("/login");
  }, [navigate]);
  return <Outlet />;
}

export default AuthLayout;

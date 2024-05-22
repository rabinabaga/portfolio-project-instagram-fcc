import { Outlet, useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/local-storage";
import { useEffect } from "react";

function AuthLayout() {
    const navigate = useNavigate();
    const accessToken = getAccessToken();

    useEffect(() => {if(!accessToken) navigate("/login")},[navigate, accessToken])
    return ( <Outlet/> );
}

export default AuthLayout;
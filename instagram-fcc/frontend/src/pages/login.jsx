import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { GlobalDataState } from "../context/GlobalDataProvider";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = GlobalDataState();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = emailAddress === "" || password === "";

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:8001/api/v1/auth/login",
        { email:emailAddress, password },
        config
      );
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      console.log("error", error);
      setEmailAddress("");
      setPassword("");
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = "Login - Instagram";
  }, []);

  return (
    <div className="container mx-auto flex items-center h-screen max-w-screen-md">
      <div className="flex flex-col w-3/5">
        <img
          src="/imges/iphone-with-profile.jpg"
          alt="iphone with profile picture"
        />
      </div>
      <div className="flex flex-col w-2/5  justify-center p-2  rounded">
        <div className="flex flex-col w-full mb-4  shadow-lg bg-white p-3">
          <img src="/imges/logo.png" alt="instagram logo" />
          {error && <p className="text-red-primary">{error}</p>}
          <form className="flex flex-col" action="" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Email Address"
              className="p-2 mb-2 border border-gray-primary rounded focus:border-blue-500 focus:outline-none"
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="p-2 mb-2 border border-gray-primary rounded focus:border-blue-500 focus:outline-none"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <button
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
                isInvalid && "opacity-50"
              }`}
            >
              Log In
            </button>
          </form>
        </div>
        <div className="flex flex-col justify-center shadow-lg items-center p-3 w-full  bg-white">
          <p className="text-sm font-bold">
            Don't have an account?
            <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
              {" "}
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

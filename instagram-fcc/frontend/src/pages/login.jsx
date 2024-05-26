import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { GlobalDataState } from "../context/GlobalDataProvider";
import axios from "axios";
import * as yup from 'yup';
import ValidationErrorMessage from "../components/validation-error-message";
import {getAccessToken} from "../utils/local-storage"

const schema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();
export default function Login() {
  const navigate = useNavigate();
  const { setUser } = GlobalDataState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log("errors", errors);
  const handleLogin = async (input_data) => {
   
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:8001/api/v1/auth/login",
        input_data,
        config
      );

      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if(getAccessToken()){
      navigate("/")
    }
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

          <form
            className="flex flex-col"
            action=""
            onSubmit={handleSubmit(handleLogin)}
          >
            <input
              type="text"
              placeholder="Email Address"
              {...register("email", { required: true })}
              className="p-2 mb-2 border border-gray-primary rounded focus:border-blue-500 focus:outline-none"
            />
            {errors["email"]?<ValidationErrorMessage msg={errors["email"].message}></ValidationErrorMessage>:""}
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
              className="p-2 mb-2 border border-gray-primary rounded focus:border-blue-500 focus:outline-none"
            />
             {errors["password"]?<ValidationErrorMessage msg={errors["password"].message}></ValidationErrorMessage>:""}
            <button
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold `}
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

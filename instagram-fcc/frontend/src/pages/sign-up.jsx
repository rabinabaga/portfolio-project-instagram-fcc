import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as ROUTES from "../constants/routes";

export default function SignUp() {
  const navigate = useNavigate();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState();
  const [fullName, setFullName] = useState();

  const [error, setError] = useState("");
  const isInvalid =
    emailAddress === "" ||
    password === "" ||
    fullName === "" ||
    username === "";

  const handleSignup = async (event) => {
    event.preventDefault();
    const usernameExists = await doesUsernameExist(username);
    if (!usernameExists) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);

        //authentication
        // -> emailAddress and password and username (displayName)
        await createdUserResult.user.updateProfile({
          displayName: username,
        });

        //firebase user collection (create a document)
        await firebase.firestore().collection("users").add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          emailAddres: emailAddress.toLowerCase(),
          following: [],
          dateCreated: Date.now(),
        });
        navigate(ROUTES.DASHBOARD)
      } catch (error) {
        setError(error.message)
        setEmailAddress('');
        setPassword(''),
        setFullName(''),
        setUsername('')
      }
    }else{
      setEmailAddress('');
      setPassword(''),
      setFullName(''),
      setUsername('')
    }
  };

  useEffect(() => {
    document.title = "Sign Up - Instagram";
  }, []);

  return (
    <div className="container mx-auto flex items-center h-screen max-w-screen-md">
      <div className="flex flex-col w-3/5">
        <img
          src="/images/iphone-with-profile.jpg"
          alt="iphone with profile picture"
        />
      </div>
      <div className="flex flex-col w-2/5  justify-center p-2  rounded">
        <div className="flex flex-col w-full mb-4  shadow-lg bg-white p-3">
          <img src="/images/logo.png" alt="instagram logo" />
          {error && <p className="text-red-primary">{error}</p>}
          <form className="flex flex-col" action="" onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Enter your full name"
              className="p-2 mb-2 border border-gray-primary rounded focus:border-blue-500 focus:outline-none"
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
            />
            <input
              type="text"
              placeholder="Enter your username"
              className="p-2 mb-2 border border-gray-primary rounded focus:border-blue-500 focus:outline-none"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
            <input
              type="text"
              placeholder="Enter your email address"
              className="p-2 mb-2 border border-gray-primary rounded focus:border-blue-500 focus:outline-none"
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <input
              type="password"
              placeholder="Enter your password"
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
              Sign up
            </button>
          </form>
        </div>
        <div className="flex flex-col justify-center shadow-lg items-center p-3 w-full  bg-white">
          <p className="text-sm font-bold">
            Already have an account ?
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              {" "}
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

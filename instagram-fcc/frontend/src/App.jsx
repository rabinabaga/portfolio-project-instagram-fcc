import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login.jsx";
import "./index.css";
import SignUp from "./pages/sign-up.jsx";
import Dashboard from "./pages/dashboard.jsx";
import SocketContext from "./context/socket.js";
import { socket } from "./socket.js";
import { useEffect, useState } from "react";
import Profile from "./pages/profile.jsx";
// import Notfound from "./pages/not-found.jsx";
// import useAuthListener from "./hooks/use-auth-listener.js";
// import UserContext from "./context/user.js";
// import Profile from "./pages/profile.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  // {
  //   path: "/p/:username",
  //   element: <Profile />,
  // },
  // {
  //   element: <Notfound />,
  // },
]);
function App() {
   const [socketConnected, setSocketConnected] = useState(socket.connected);
   useEffect(() => {
     function onConnect() {
       setSocketConnected(true);
     }
     socket.on("connect", onConnect);
   }, []);
  return (
    <SocketContext.Provider value={{socketConnectionState:socket.connected}}>
      <RouterProvider router={router} />
    </SocketContext.Provider>
  );
}

export default App;

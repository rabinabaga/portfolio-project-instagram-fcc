import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login.jsx";
import "./index.css";
import SignUp from "./pages/sign-up.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Test from "./pages/test.jsx";
// import Notfound from "./pages/not-found.jsx";
// import useAuthListener from "./hooks/use-auth-listener.js";
// import UserContext from "./context/user.js";
// import Profile from "./pages/profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  // {
  //   path: "/p/:username",
  //   element: <Profile />,
  // },
  // {
  //   element: <Notfound />,
  // },
]);
import { socket } from "./socket.js";
import SocketContext from "./context/socket.js";
function App() {
  return (
    <>
      <SocketContext.Provider value={socket.connected}>
        <RouterProvider router={router} />
      </SocketContext.Provider>
    </>
  );
}

export default App;

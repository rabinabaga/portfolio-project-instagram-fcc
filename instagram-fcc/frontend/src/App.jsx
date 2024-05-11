import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login.jsx";
import "./index.css";
import SignUp from "./pages/sign-up.jsx";
import Dashboard from "./pages/dashboard.jsx";
// import Notfound from "./pages/not-found.jsx";
// import useAuthListener from "./hooks/use-auth-listener.js";
// import UserContext from "./context/user.js";
// import Profile from "./pages/profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
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
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

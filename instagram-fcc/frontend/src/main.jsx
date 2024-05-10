import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import GlobalDataProvider from "./context/GlobalDataProvider";
import { SocketProvider } from "./context/socket.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GlobalDataProvider>
    <SocketProvider url="http://localhost:8001">
      <App />
    </SocketProvider>
    ,
  </GlobalDataProvider>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import GlobalDataProvider from "./context/GlobalDataProvider";
import { Provider } from "react-redux";
import { store } from "./state/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GlobalDataProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </GlobalDataProvider>
);

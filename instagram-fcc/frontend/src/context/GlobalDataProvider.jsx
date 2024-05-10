import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GlobalDataContext = createContext();

const GlobalDataProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  // const [notification, setNotification] = useState([]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) {
      // navigate("/login");
      console.log("unauthorized");
    }
  }, []);

  return (
    <GlobalDataContext.Provider
      value={{
        // selectedChat,
        // setSelectedChat,
        user,
        socketConnected,
        setSocketConnected,
        setUser,
        // notification,
        // setNotification,
        // chats,
        // setChats,
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
};

export const GlobalDataState = () => {
  return useContext(GlobalDataContext);
};

export default GlobalDataProvider;

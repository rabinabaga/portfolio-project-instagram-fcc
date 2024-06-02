import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GlobalDataContext = createContext();

const GlobalDataProvider = ({ children }) => {
  const [user, setUser] = useState();

  const [notification, setNotification] = useState([]);
  const [showNotificationAlert, setShowNotificationAlert] = useState(false);

  useEffect(() => {
    let userInfo;
    try {
     userInfo = JSON.parse(localStorage.getItem("userInfo"));
      
    } catch (exception) {
      console.log("exception", exception);
    }
    setUser(userInfo);
  }, []);

  return (
    <GlobalDataContext.Provider
      value={{
        // selectedChat,
        // setSelectedChat,
        user,

        setUser,
        notification,
        setNotification,
        setShowNotificationAlert,
        showNotificationAlert
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

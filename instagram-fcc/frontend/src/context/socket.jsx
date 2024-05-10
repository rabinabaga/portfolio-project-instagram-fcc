import React, { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";

// Create a context to hold the socket instance
const SocketContext = createContext();

// Custom hook to access the socket instance
export const useSocket = () => useContext(SocketContext);

// Socket provider component
export const SocketProvider = ({ url, children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(url);
setSocket(newSocket);
    // Clean up function to disconnect the socket when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, [url]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

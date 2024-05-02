import { useEffect, useState } from "react";
import io from 'socket.io-client';
import { GlobalDataState } from "../context/GlobalDataProvider";

export default function useSocket(){
    const [socket, setSocket] = useState(null);
    
    
    useEffect(() => {
      console.log("here");
      const {_id} = JSON.parse(localStorage.getItem("userInfo"));
      console.log(_id);
        const newSocket = io('http://localhost:8001');  // Replace with your server URL
        setSocket(newSocket);
    
        newSocket.on('connect', 
          ()=>{newSocket.emit("hook-socket", {message:"this is socket from hook", userId:_id, socketID:newSocket.id, photoUserId:"662fdcacd6883005eaeaf6df"})}


        );
    
        // Cleanup function
        return () => {
          if (socket) {
            socket.disconnect();
          }
        };
      }, []);

      return {socket};
}
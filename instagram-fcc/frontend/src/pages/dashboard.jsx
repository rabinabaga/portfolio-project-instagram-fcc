import { useContext, useEffect, useRef, useState } from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Timeline from "../components/timeline";
import { useSocket } from "../context/socket";
import { GlobalDataState } from "../context/GlobalDataProvider";


export default function Dashboard() {
  const {user} = GlobalDataState();
  const socket = useSocket();
useEffect(()=>{
    if (socket) {
      console.log("user in dashboard", user);
      console.log("frontend", user._id, socket.id);
      socket.emit("loggedIn", {userId:user._id, socketID:socket.id})

      return () => {
        if (socket) {
          socket.off("notification"); // Unsubscribe from specific event
        }
      };
    }

},[socket])
 //see if user is here,
 //if present, get the instance of socket,
 //and send socketID and loggedinuser id
  return (
    <>
      <Header></Header>
      <div className="grid grid-cols-3 gap-4  justify-between mx-auto max-w-screen-lg ">
        <Timeline></Timeline>
        <Sidebar></Sidebar>
      </div>
    </>
  );
}

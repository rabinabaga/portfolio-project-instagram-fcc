import { useEffect, useRef, useState } from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Timeline from "../components/timeline";
import useSocket from "../hooks/use-socket";
import { GlobalDataState } from "../context/GlobalDataProvider";


export default function Dashboard() {
 const {socket} = useSocket();
useEffect(()=>{
  if(socket){
    socket.on('notification', (data)=>{
      console.log("received notification", data);
    })
  }
  return () => {
    if (socket) {
      socket.off('notification'); // Unsubscribe from specific event
    }
  };
},[socket])
 
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

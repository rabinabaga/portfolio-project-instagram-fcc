import { useContext, useEffect, useRef, useState } from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Timeline from "../components/timeline";
import { GlobalDataState } from "../context/GlobalDataProvider";

import io from "socket.io-client";
import { socket } from "../socket";
import SocketContext from "../context/socket";
const ENDPOINT = "http://localhost:8001";
export default function Dashboard() {
  const { user } = GlobalDataState();
  const { socketConnectionState } = useContext(SocketContext);
console.log("socketConnection State", socketConnectionState);
  useEffect(() => {
    if (user && socketConnectionState) {
      socket.emit("setup", user);
    }
  }, [user]);

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

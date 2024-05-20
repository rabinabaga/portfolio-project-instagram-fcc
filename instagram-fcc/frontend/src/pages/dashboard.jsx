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
  const { user, setNotification } = GlobalDataState();
  const { socketConnectionState } = useContext(SocketContext);

  useEffect(() => {
    socket.on("likeReceived", (msg) => {
      setNotification([msg]);
    });
    if (user && socketConnectionState) {
      socket.emit("setup", user);
    }
  }, [user, socketConnectionState]);

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

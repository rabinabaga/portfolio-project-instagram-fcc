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
  const { user, setNotification,notification, setShowNotificationAlert } = GlobalDataState();
  const { socketConnectionState } = useContext(SocketContext);

  useEffect(() => {
    socket.on("likeReceived", (msg) => {
      console.log(msg?.userDocId?.username);
      setNotification([msg]);
      setShowNotificationAlert(true);
    });
    if (user && socketConnectionState) {
      socket.emit("setup", user);
    }
  }, [user, socketConnectionState, notification]);

  return (
    <>
      <Header></Header>
      <div className="grid grid-cols-7 gap-2.5 px-36  justify-between mx-auto max-w-screen-lg ">
        <Timeline></Timeline>
        <div className="col-span-1"></div>
        <Sidebar></Sidebar>
      </div>
    </>
  );
}

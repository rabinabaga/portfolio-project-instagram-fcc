import { useContext, useEffect, useRef, useState } from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Timeline from "../components/timeline";
import { useSocket } from "../context/socket";
import { GlobalDataState } from "../context/GlobalDataProvider";
var socket;
import io from "socket.io-client";
const ENDPOINT = "http://localhost:8001";
export default function Dashboard() {
  const { user } = GlobalDataState();
  console.log("user in dashboard", user);

  useEffect(() => {
    socket = io(ENDPOINT);
    console.log("here");
    socket.emit("setup", user);
    socket.on("connected", console.log("socket connected successfully"));
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

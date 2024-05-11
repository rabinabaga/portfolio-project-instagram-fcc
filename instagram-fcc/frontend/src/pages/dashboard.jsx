import { useEffect, useRef, useState } from "react";
import { socket } from "../socket";

function Dashboard() {
  const [chatMsgs, setChatMsgs] = useState([]);
  const inputVal = useRef();
  const sayHi = () => {
  };
  const handleKeyDown = (e)=>{
    if(e.key=="Enter"){
      
      socket.emit("hi", inputVal.current.value);
      e.target.value = "";
      
    }
  }
 useEffect(()=>{
 socket.on("chat", (msg) => {
   setChatMsgs((chatMsgs) => [...chatMsgs, msg]);
 });
 },[])
  return (
    <>
      <input
        placeholder="Enter your message here"
        style={{
          border: "2px solid gray",
          position: "fixed",
          bottom: "2rem",
          width: "100%",
        }}
        ref={inputVal}
        type="text"
        onKeyDown={(e)=>handleKeyDown(e)}
      />

      <p>Chat Messages</p>
     {chatMsgs.length>0 &&  chatMsgs.map((msg,index) => {
        return (
          <div
            key={index}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: index % 2 === 0 ? "flex-start" : "flex-end",
            }}
          >
            <p
              style={{
                border: "2px solid gray",

                width: "fit-content",
                padding: "0.5em",
                borderRadius: "3px",
              }}
            >
              {msg}
            </p>
          </div>
        );
      })}
    </>
  );
}

export default Dashboard;

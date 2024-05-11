import { useContext, useEffect, useRef, useState } from "react";
import { socket } from "../socket";
import { Link } from "react-router-dom";

function Dashboard() {
  const [chatMsgs, setChatMsgs] = useState([]);
  const inputVal = useRef();
  const sayHi = () => { };
  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      socket.emit("hi", inputVal.current.value);
      e.target.value = "";
    }
  };
  useEffect(() => {
    socket.on("chate", (msg) => {
      setChatMsgs((chatMsgs) => [...chatMsgs, msg]);
    });
    return ()=>{
      console.log("dashboard has been unmounted");
    }
    
  }, []);
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
        onKeyDown={(e) => handleKeyDown(e)}
      />

      <p>Chat Messages
        <Link to="/test">Test</Link>
      </p>
      {chatMsgs.length > 0 &&
        chatMsgs.map((msg, index) => {
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

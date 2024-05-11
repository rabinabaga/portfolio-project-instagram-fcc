import { useEffect } from "react";
import { socket } from "../socket"; 
function Test() {
    const handleClick = ()=>{
        socket.emit("hi", "test message");
    }
     useEffect(() => {
       socket.on("chat", (msg) => {
         console.log(msg);
       });
     }, []);
    return ( <>
        <button onClick={handleClick}>click me </button>
    </> );
}

export default Test;
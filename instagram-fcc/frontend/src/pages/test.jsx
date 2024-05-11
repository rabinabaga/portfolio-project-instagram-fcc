import { useContext, useEffect } from "react";
import { socket } from "../socket";
import SocketContext from "../context/socket";
function Test() {
  const { socketConnectionState } = useContext(SocketContext);
  const handleClick = () => {
    socket.emit("hi", "test message");
  };
  useEffect(() => {
   console.log(socketConnectionState,"is it after main function code");
  }, [socketConnectionState]);
  return (
    <>
      <button onClick={handleClick}>click me </button>
    </>
  );
}

export default Test;

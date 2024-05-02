// socket.js
import io from 'socket.io-client';

export const createSocketConnection = (url) => {
  const socket = io(url);
  return socket;
};
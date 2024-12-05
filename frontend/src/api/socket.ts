import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000";
export const socket = io(SOCKET_URL, { transports: ["websocket"] });

export const joinTodoRoom = (todoId: string) => {
  socket.emit("joinList", todoId);
};

export const onTodoUpdate = (callback: (data: any) => void) => {
  socket.on("task:update", callback);
};

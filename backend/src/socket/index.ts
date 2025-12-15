import { Server } from "socket.io";
import type { Server as HttpServer } from "https";
import { registerRoomHandlers } from "./room.handlers.js";
import { corsOptions } from "../config/corsOptions.js";

export const initSocket = (httpsServer: HttpServer) => {
  const io = new Server(httpsServer, {
    cors: corsOptions,
  });

  io.on("connection", (socket) => {
    console.log("🔌 Socket conectado:", socket.id);

    registerRoomHandlers(io, socket);

    socket.on("disconnect", () => {
      console.log("❌ Socket desconectado:", socket.id);
    });
  });

  return io;
};

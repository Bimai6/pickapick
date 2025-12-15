import type { Server, Socket } from "socket.io";
import Room from "../models/RoomModel.js";

export const registerRoomHandlers = (
  io: Server,
  socket: Socket
) => {

  socket.on("joinLobby", async ({ roomHash, userId }) => {
    const room = await Room.findOne({ hash: roomHash });

    if (!room) {
      socket.emit("error", "Room not found");
      return;
    }

    socket.join(roomHash);

    if (!room.players.includes(userId)) {
      room.players.push(userId);
      await room.save();
    }

    io.to(roomHash).emit("lobbyUpdated", {
      players: room.players,
      creator: room.creator,
      state: room.state,
    });
  });

  socket.on("startRoom", async ({ roomHash, userId }) => {
    const room = await Room.findOne({ hash: roomHash });

    if (!room) return;

    if (room.creator.toString() !== userId) {
      socket.emit("error", "Only creator can start the room");
      return;
    }

    room.state = "ONGOING";
    await room.save();

    io.to(roomHash).emit("roomStarted", { roomHash });
  });

};

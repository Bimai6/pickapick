import type { Response, NextFunction } from "express";
import mongoose from "mongoose";
import crypto from "crypto";
import Room from "../models/RoomModel.js";
import type { CustomRequest } from "../types/customRequest.js";


const generateHash = (): string => {
  const randomBytes = crypto.randomBytes(4).toString("hex");
  return randomBytes.slice(0, 7);
};

export const createRoom = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id; 
    const { name, capacity = 8, metagame } = req.body;

    if (!name || !metagame) {
      return res.status(400).json({ message: "Missing name or metagame" });
    }

    if (capacity < 1 || capacity > 8) {
      return res.status(400).json({ message: "Capacity must be between 1 and 8" });
    }

    let room;
    let attempts = 0;
    while (!room && attempts < 5) {
      const hash = generateHash();
      try {
        room = await Room.create({
          hash,
          name,
          capacity,
          creator: new mongoose.Types.ObjectId(userId),
          players: [new mongoose.Types.ObjectId(userId)],
          state: "LOBBY",
          metagame,
        });
      } catch (err: any) {
        if (err.code === 11000 && err.keyPattern && err.keyPattern.hash) {
          attempts++;
          continue;
        } else {
          throw err;
        }
      }
    }

    if (!room) {
      return res.status(500).json({ message: "Could not generate unique room hash" });
    }

    return res.status(201).json({
      roomId: room._id,
      hash: room.hash,
      name: room.name,
      capacity: room.capacity,
      creator: room.creator,
    });
  } catch (err) {
    next(err);
  }
};

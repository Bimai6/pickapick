import express from "express";
import { loginUser } from "../controllers/UserController.js";
import { registerUser } from "../controllers/UserController.js";
import { verifyToken } from "../middlewares/auth.js";
import { createRoom } from "../controllers/RoomController.js";
import { createMetagame } from "../controllers/MetagameController.js";

const api = express.Router();

api.get("/", (req, res)=> {
    res.send("You are on the API route access");
})

api.post("/login", loginUser);
api.post("/register", registerUser);
api.post("/rooms", verifyToken, createRoom);
api.post("/metagames", createMetagame);

export default api;
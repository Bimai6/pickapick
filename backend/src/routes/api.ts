import express from "express";
import { loginUser } from "../controllers/UserController.js";
import { registerUser } from "../controllers/UserController.js";
import { verifyToken } from "../middlewares/auth.js";

const api = express.Router();

api.get("/", (req, res)=> {
    res.send("You are on the API route access");
})

api.get("/login", verifyToken, loginUser);
api.get("/register", verifyToken, loginUser);

export default api;
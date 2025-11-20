import express from "express";

const api = express.Router();

api.get("/", (req, res)=> {
    res.send("You are on the API route access");
} )

export default api;
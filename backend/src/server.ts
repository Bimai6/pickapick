import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
import cors from "cors";

const app = express();

app.use(cors())
app.use(express.json());

app.get("/", (req, res) => res.send("Server is running"));

const port = Number(process.env.PORT ?? 3000);

app.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`);
})

mongoose
    .connect(String(process.env.MONGO_URI))
    .then(()=> console.log("Connected to MongoDB Atlas"))
    .catch((error)=> console.log(error))
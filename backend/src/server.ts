import express from "express";
import dotenv from "dotenv";

const app = express();

app.use(express.json());

app.get("/", (req, res) => res.send("Server is running"));

const port = Number(process.env.PORT ?? 3000);

app.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`);
})
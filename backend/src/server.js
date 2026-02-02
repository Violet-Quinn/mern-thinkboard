import express from "express"
import cors from "cors";
import dotenv from 'dotenv';

import {connectDB} from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js"
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();

//const express = require("express");

const app = express()
const port = process.env.PORT || 5001;



app.use(cors({
    origin: "http://localhost:5173",
}));
app.use(express.json());
app.use(rateLimiter);


// app.use((req,res,next) => {
//     console.log(`Request method is ${req.method}, Request URL is ${req.url}`);
//     next();
// })

app.use("/api/notes", notesRoutes);

// app.get("/",(req,res) => {
//     res.send("Hello World1!")
// })

// app.post("/api/notes",(req,res) => {
//     res.status(201).json({message:"Post created successfully"})
// })

// app.put("/api/notes/:id",(req,res) => {
//     res.status(200).json({message:"Post updated successfully"})
// })

// app.delete("/api/notes/:id",(req,res) => {
//     res.status(200).json({message:"Post deleted successfully"})
// })

connectDB().then(() =>{
    app.listen(port,() =>{
        console.log("Server is running on port: ",port);
    });
});


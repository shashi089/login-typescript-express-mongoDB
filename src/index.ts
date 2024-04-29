import express from "express";
import http from"http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors"
import mongoose, { Promise } from "mongoose";
import router from "./router";

const app= express()

app.use(cors({
    credentials:true,
}))

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(8080,()=>{
    console.log("Server Running")
})

const mongoDBURI="mongodb://127.0.0.1:27017/myapp"

mongoose.Promise= Promise;
mongoose.connect(mongoDBURI)

const db = mongoose.connection;

db.on("error", (error) => console.error("MongoDB connection error:", error));
db.once("open", () => console.log("MongoDB connected successfully"));

app.use("/", router())  
require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const {Server} = require("socket.io");

const connectDB = require("./config/db");
const socketHandler = require("./socket/socketHandler");

const app = express();
connectDB();

app.use(cors({
    origin:"https://simple-chat-app-frontend-rho.vercel.app/",
    methods:["GET","POST"]
}));
app.use(express.json());

app.use("/api/auth" , require("./routes/authRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));

const server = http.createServer(app);

const allowedOrigins = [
    "http://localhost:3000",
    "https://simple-chat-app-frontend-rho.vercel.app"
  ];

const io = new Server(server, {
    cors:{
        origin: allowedOrigins,
        methods:["GET" , "POST"]
    }
});

socketHandler(io);

server.listen(process.env.PORT , ()=>{
    console.log("server running on PORT : " , process.env.PORT)
})

import "dotenv/config";
import express from "express";
import connectToDatabase from "./connect.js";
import router from "./routes/auth.js";
import todoRouter from "./routes/todo.js";
import taskRoutes  from './routes/task.js'
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import http from "http";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;
const url = process.env.MONGO_URI;

//gpt code
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

connectToDatabase(url)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error(error);
  });

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

//gpt
app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.on('joinList', (todoId) => {
    socket.join(todoId);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

app.use("/user", router);
app.use("/todo", todoRouter);
app.use("/task", taskRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

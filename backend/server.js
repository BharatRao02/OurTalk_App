const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");

connectDB();
const app = express();

app.use(express.json()); //to accept JSON Data
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// --------------------------deployment------------------------------

const dirPath = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(dirPath, "frontend", "build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(dirPath, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------

app.use(notFound); //Error Handling middlewares
app.use(errorHandler); //Error Handling middlewares

const PORT = process.env.PORT || 3000; // Set a default port number if process.env.PORT is not defined
const server = app.listen(PORT, (err) => {
  if (!err) console.log(`Server Listening on Port Number ${PORT}`.yellow.bold);
  else console.error(err);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  let userData = null;
  socket.on("setup", (data) => {
    userData = data;
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
  });

  socket.on("stop typing", (room) => {
    socket.in(room).emit("stop typing");
  });

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) return;

      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  socket.on("disconnect", () => {
    if (userData) {
      console.log("USER DISCONNECTED");
      socket.leave(userData._id);
    }
  });
});

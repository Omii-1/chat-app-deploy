const express = require("express")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const path = require("path")

const userAuth = require("./Routes/userAuth")
const messageRoutes = require("./Routes/messageRoutes")
const userRoutes = require("./Routes/userRoutes")

const {app, server} = require("./socket/socket")
const connectToMongoose = require("./db/conn")

dotenv.config()

const PORT = process.env.PORT || 5000


app.use(express.json())
app.use(cookieParser())

app.use("/api/v1", userAuth)
app.use("/api/v1", messageRoutes)
app.use("/api/v1", userRoutes)

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Handle fallback for HTML5 history API (SPA routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

server.listen(PORT, ()=>{
  connectToMongoose()
  console.log(`server running on port ${PORT}`);
}) 
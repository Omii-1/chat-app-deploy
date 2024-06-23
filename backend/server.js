const express = require("express")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")

const userAuth = require("./Routes/userAuth")
const messageRoutes = require("./Routes/messageRoutes")
const userRoutes = require("./Routes/userRoutes")

const connectToMongoose = require("./db/conn")

const app = express()
dotenv.config()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1", userAuth)
app.use("/api/v1", messageRoutes)
app.use("/api/v1", userRoutes)

app.listen(PORT, ()=>{
  connectToMongoose()
  console.log(`server running on port ${PORT}`);
}) 
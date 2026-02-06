const express = require("express")
require("dotenv").config({ path: "./.env" })
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const protect = require("./middlewares/proctect.js")
const rateLimit = require("express-rate-limit")

mongoose.connect(process.env.MONGO_URL)

const app = express()

const limiter = rateLimit({
    window: 1000 * 60,
    max: 5
})

app.use(limiter)
app.use(cors({
    origin: process.env.NODE_ENV === "production"
        ? "https://newlogin-client.vercel.app"
        : "http://localhost:3000",
    credentials: true
})) // middleware
app.use(express.json()) // for req.body data
app.use(cookieParser())  // for req.cookie data 

app.use("/api/todo", protect, require("./routee/todo.route.js"))
app.use("/api/auth", require("./routee/auth.route.js"))


mongoose.connection.once("open", () => {
    console.log("db Connected")
    app.listen(process.env.PORT, console.log("app running"))
})

module.exports = app
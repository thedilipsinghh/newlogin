const { register, logout, login } = require("../controller/auth.controller.js")
const rateLimit = require("express-rate-limit")
const router = require("express").Router()

const authLimit = rateLimit({
    window: 1000 * 60,
    max: 3
})

router
    .post("/signup", register)
    .post("/signin", authLimit, login)
    .post("/signout", logout)


module.exports = router
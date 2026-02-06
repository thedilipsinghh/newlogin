const { readTodo, createTodo, updateTodo, deleteTodo } = require("../controller/todo.contriller.js")
const logger = require("../middlewares/logger.js")
const protect = require("../middlewares/proctect.js")

const router = require("express").Router()

router
    .get("/", logger, readTodo)
    .post("/create", logger, createTodo)
    .patch("/modify:todoId", updateTodo)
    .delete("/remove:todoId", deleteTodo)

module.exports = router
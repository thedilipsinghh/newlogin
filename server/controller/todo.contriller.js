const todo = require("../modal/todo.js")

exports.createTodo = async (req, res) => {
    try {
        await todo.create(req.body)
        res.status(201).json({ message: "todo create succcess", success: true })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message, success: false })
    }
}

exports.readTodo = async (req, res) => {
    try {
        const result = await todo.find()
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message, success: false })
    }
}

exports.updateTodo = async (req, res) => {
    try {
        const { todoId } = req.params
        await todo.findByIdAndUpdate(todoId, req.body)
        res.status(200).json({ message: "todo update succcess", success: true })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message, success: false })
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        const { todoId } = req.params
        await todo.findByIdAndDelete(todoId)
        res.status(200).json({ message: "todo delete succcess", success: true })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message, success: false })
    }
}
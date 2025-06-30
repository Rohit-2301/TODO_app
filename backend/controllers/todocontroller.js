const Todo = require('../models/Todo');

exports.getAllTodos = async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
};

exports.createTodo = async (req, res) => {
    console.log("Received request body:", req.body); // Debugging
    try {
        const newTodo = new Todo(req.body);
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create todo' });
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update todo' });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Todo deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete todo' });
    }
};

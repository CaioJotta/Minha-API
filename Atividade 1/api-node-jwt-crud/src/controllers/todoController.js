const Todo = require('../models/Todo');

exports.createTodo = async (req, res) => {
  const { title } = req.body;
  const todo = await Todo.create({
    title,
    owner: req.user._id, 
  });
  res.status(201).json(todo);
};

exports.getTodos = async (req, res) => {
  const todos = await Todo.find({ owner: req.user._id });
  res.json(todos);
};

exports.getTodoById = async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id, owner: req.user._id });
  if (!todo) {
    return res.status(404).json({ message: 'Tarefa não encontrada.' });
  }
  res.json(todo);
};

exports.updateTodo = async (req, res) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, owner: req.user._id },
    req.body,
    { new: true } 
  );
  if (!todo) {
    return res.status(404).json({ message: 'Tarefa não encontrada.' });
  }
  res.json(todo);
};

exports.deleteTodo = async (req, res) => {
  const todo = await Todo.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
  if (!todo) {
    return res.status(404).json({ message: 'Tarefa não encontrada.' });
  }
  res.status(204).send();
};
const express = require('express');
const { createTodo, getTodos, getTodoById, updateTodo, deleteTodo } = require('../controllers/todoController');
const { validate } = require('../middlewares/authMiddleware');
const { createTodoSchema, updateTodoSchema } = require('../validators/todoValidator');

const router = express.Router();

router.route('/')
  .post(validate(createTodoSchema), createTodo)
  .get(getTodos);

router.route('/:id')
  .get(getTodoById)
  .put(validate(updateTodoSchema), updateTodo)
  .delete(deleteTodo);

module.exports = router;
const { z } = require('zod');

const createTodoSchema = z.object({
  body: z.object({
    title: z.string().min(1, "O título é obrigatório."),
  })
});

const updateTodoSchema = z.object({
  body: z.object({
    title: z.string().min(1, "O título é obrigatório.").optional(),
    done: z.boolean().optional(),
  })
});

module.exports = { createTodoSchema, updateTodoSchema };
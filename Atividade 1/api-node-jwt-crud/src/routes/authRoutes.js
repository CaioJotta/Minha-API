// src/routes/authRoutes.js
const express = require('express');
const { register, login, refresh, getMe } = require('../controllers/authController');
const { protect, validate } = require('../middlewares/authMiddleware');
const { registerSchema, loginSchema, refreshSchema } = require('../validators/authValidator');

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/refresh', validate(refreshSchema), refresh);
router.get('/me', protect, getMe); // Rota protegida

module.exports = router;
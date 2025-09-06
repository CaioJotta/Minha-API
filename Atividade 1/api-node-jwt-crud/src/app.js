require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const { protect } = require('./middlewares/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => res.send('API de Autenticação e CRUD está online!'));

app.use('/auth', authRoutes);

app.use('/todos', protect, todoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
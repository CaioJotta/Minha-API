const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateTokens = (user) => {
  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  });
  const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });
  return { accessToken, refreshToken };
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "E-mail já cadastrado." });
  }
  const user = await User.create({ name, email, password });
  res.status(201).json({
    message: "Usuário criado com sucesso!",
    user: { id: user._id, name: user.name, email: user.email },
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Credenciais inválidas." });
  }
  const { accessToken, refreshToken } = generateTokens(user);
  const userResponse = user.toObject();
  delete userResponse.password;
  res.json({ accessToken, refreshToken, user: userResponse });
};

exports.refresh = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
        return res.status(401).json({ message: "Usuário não encontrado." });
    }
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);
    res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    res.status(401).json({ message: "Refresh token inválido ou expirado." });
  }
};

exports.getMe = async (req, res) => {
  res.json(req.user);
};
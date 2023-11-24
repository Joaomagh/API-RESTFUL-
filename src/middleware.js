require('dotenv').config();
const jwt = require('jsonwebtoken');


function authenticateToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ mensagem: 'Token não fornecido' });
  }

  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensagem: 'Token inválido' });
    }

    // Se o token é válido, você pode acessar as informações do usuário decodificadas em decoded.userId
    req.userId = decoded.userId;
    next();
  });
}

module.exports = { authenticateToken };

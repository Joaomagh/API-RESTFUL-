const express = require('express');
const router = express.Router();
const {
  signUp,
  signIn,
  getUserProfile,
} = require('./controllers');
const { authenticateToken } = require('./middleware');
const { body, validationResult } = require('express-validator');
//o express-validator é uma bibilioteca de validação de dados.
//ao longo do projeto aprendi muitas coisas e alguns comentários são meramentes educativos para que eu aprenda melhor.

// Rota criação de um novo cadastro
router.post(
  '/signup',
  [
    body('nome').notEmpty().withMessage('O nome é obrigatório'),
    body('email').isEmail().withMessage('Email inválido'),
    body('senha')
    .isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres')
    .matches(/[A-Z]/i).withMessage('A senha deve conter pelo menos uma letra maiúscula'),
  ],
  //retornar os erros.
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    signUp(req, res);
  }
);

//rota de criação.
router.post('/signin', signIn);
//rota (get) solicitar dados, verificação protegida que precisa da autentificação para o usuário.
router.get('/user/profile',authenticateToken, getUserProfile);

module.exports = router;

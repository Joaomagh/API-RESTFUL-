require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usersFilePath = 'data.json';

function readDataFile() {
  const data = fs.readFileSync(usersFilePath, 'utf8');
  return JSON.parse(data);
}

function writeDataFile(data) {
  fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2), 'utf8');
}

function generateToken(userId) {
  const secretKey = process.env.JWT_SECRET; // Usando variavel de ambiente para segurança.
  return jwt.sign({ userId }, secretKey, { expiresIn: '30m' });
}

function signUp(req, res) {
  const { nome, email, senha, telefones } = req.body;

  // Ler dados do arquivo
  const users = readDataFile();

  // Verificar se o e-mail já está cadastrado
  if (users.some(user => user.email === email)) {
    return res.status(400).json({ mensagem: 'E-mail já existente' });
  }

  // Criar novo usuário
  const newUser = {
    id: generateUserId(),
    nome,
    email,
    senha: bcrypt.hashSync(senha, 10),
    telefones,
    data_criacao: new Date().toISOString(),
    data_atualizacao: new Date().toISOString(),
    ultimo_login: null,
    token: null,
  };

  // Adicionar novo usuário aos dados existentes
  users.push(newUser);

  writeDataFile(users);

  // Gerar token
  const token = generateToken(newUser.id);
  // Atualizar último login
  newUser.ultimo_login = new Date().toISOString();
  newUser.token = token;
  writeDataFile(users);


  res.json({
    id: newUser.id,
    data_criacao: newUser.data_criacao,
    data_atualizacao: newUser.data_atualizacao,
    ultimo_login: newUser.ultimo_login,
    token: newUser.token,
  });
}

function signIn(req, res) {
  const { email, senha } = req.body;

  // Ler dados do arquivo
  const users = readDataFile();

  // Encontrar usuário pelo e-mail
  const user = users.find(u => u.email === email);

  // Verificar se o usuário existe e a senha está correta
  if (!user || !bcrypt.compareSync(senha, user.senha)) {
    return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' });
  }

  // Atualizar último login
  user.ultimo_login = new Date().toISOString();
  user.token = generateToken(user.id);
  writeDataFile(users);


  res.json({
    id: user.id,
    data_criacao: user.data_criacao,
    data_atualizacao: user.data_atualizacao,
    ultimo_login: user.ultimo_login,
    token: user.token,
  });
}

function getUserProfile(req, res) {

  const token = req.headers.authorization;


  const users = readDataFile();

  // Verificar se o token é válido
  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    const userId = decoded.userId;
    const user = users.find(u => u.id === userId);

    //user nao existir
    if (!user) {
      return res.status(401).json({ mensagem: 'Não autorizado' });
    }

    // Verificar se o token ainda é válido (não expirou)
    const tokenExpiration = new Date(decoded.exp * 1000);
    if (tokenExpiration < new Date()) {
      return res.status(401).json({ mensagem: 'Sessão inválida' });
    }


    res.json({
      id: user.id,
      nome: user.nome,
      email: user.email,
      telefones: user.telefones,
      data_criacao: user.data_criacao,
      data_atualizacao: user.data_atualizacao,
      ultimo_login: user.ultimo_login,
    });
  } catch (error) {
    res.status(401).json({ mensagem: 'Não autorizado' });
  }
}

function generateUserId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

module.exports = { signUp, signIn, getUserProfile, generateUserId, readDataFile };

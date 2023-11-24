require('dotenv').config();
//.log('Variáveis de ambiente carregadas:', process.env);
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const jwtSecret = process.env.JWT_SECRET;

//deixando registrado alguns console.log q fizeram mt diferença.
// console.log('Chave secreta JWT:', jwtSecret);

const app = express();
const PORT = process.env.PORT || 3000;

//requisição JSON para processos
app.use(bodyParser.json());
//rotas de api
app.use('/api', routes);

//porta do servidor e iniciar o servidor.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

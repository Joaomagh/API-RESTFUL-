//ainda preciso aprender mt sobre testes unitários. mas esse foi o começo do aprendizado e alguns testes que realizei.

// const { expect } = require('@jest/globals');

// test('generateUserId retorna um ID formatado corretamente', () => {
//   const userId = generateUserId();
//   expect(userId).toMatch(/[a-f0-9-]{36}/);
// });

/////////////////////////////////////////////////////

// const fs = require('fs');
// const { readDataFile } = require('../src/controllers');

// test('readDataFile lê corretamente o arquivo', () => {
//   // Criar um arquivo data.json temporário com dados conhecidos
//   const testData = [{ id: '1', nome: 'Usuário Teste' }];
//   fs.writeFileSync('data.json', JSON.stringify(testData), 'utf8');

//   // Chamar a função readDataFile
//   const result = readDataFile();

//   // Verificar se os dados retornados são os mesmos que os dados conhecidos
//   expect(result).toEqual(testData);
// });

/////////////////////////////


// const fs = require('fs');
// const { readDataFile } = require('../src/controllers.js'); // ajuste o caminho conforme necessário
// const { test, expect } = require('@jest/globals');

// // Mock do módulo fs
// jest.mock('fs');

// test('readDataFile lê e analisa corretamente o arquivo JSON', () => {
//   // Dados fictícios do arquivo JSON para o teste
//   const testData = '[{"id": "1", "nome": "Usuário Teste"}]';

//   // Configuração do mock para fs.readFileSync
//   fs.readFileSync.mockReturnValueOnce(testData);

//   // Chame a função sob teste
//   const result = readDataFile();

//   // Restaure o mock para fs.readFileSync
//   jest.restoreAllMocks();

//   // Verifique se a função retorna o objeto esperado
//   expect(result).toEqual([{ id: '1', nome: 'Usuário Teste' }]);
// });

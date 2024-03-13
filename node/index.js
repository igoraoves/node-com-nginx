const express = require('express');
const mysql = require('mysql');

const app = express();

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const connection = mysql.createConnection(config)

app.get('/', (req, res) => {

  connection.query(`INSERT INTO people (nome) VALUES ('Igor')`)

  connection.query('SELECT nome FROM people', (err, results) => {
    if (err) {
      console.error('Erro ao executar consulta SQL:', err);
      res.status(500).send('Erro interno do servidor');
      return;
    }
    
    const namesList = results.map(result => `<li>${result.nome}</li>`).join('');

    const html = `
      <h1>Full Cycle Rocks!</h1>
      <ul>${namesList}</ul>
    `;

    res.send(html);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor Node.js rodando na porta ${PORT}`);
});
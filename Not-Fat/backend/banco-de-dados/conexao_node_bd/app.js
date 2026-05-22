require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(express.json());

const pool = mysql.createPool ({
    host: process.env.db_host,
    port: process.env.db_port,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_database,
    ssl:{
        ca: fs.readFileSync('./ca.pem')
    }
});

app.post('/login', async (req, res) => {
    try {
        const { nome_completo, email } = req.body;

        const [usuarios] = await pool.query('SELECT id FROM usuario WHERE email = ?', [email]);

        if (usuarios.length > 0) {
            return res.json({ idUsuario: usuarios[0].id });

        } else {
            const [novoUsuario] =  await pool.query('INSERT INTO usuario (nome_completo, email) VALUES (?, ?)', [nome_completo, email]);
            return res.json({ idUsuario: novoUsuario.insertId });
        }

    } catch (err) {
        return res.status(500).json({ erro: err.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor do app Not Fat rodando na porta ${PORT} 🚀`);
});


async function buscarRefeicaoDoUsuario(idUsuario, idRefeicao) {
    try {
        console.log(`\nBuscando refeição`);

        const sql = `
            SELECT 
                u.nome AS "Nome do Usuário",
                r.tipo AS "Tipo de Refeição",
                a.nome AS "Alimento Escolhido"
            FROM refeicao_usuario ru
            INNER JOIN usuario u ON ru.usuario = u.id
            INNER JOIN refeicao r ON ru.refeicao = r.id
            INNER JOIN alimento a ON ru.alimento = a.id
            WHERE u.id = ? 
              AND r.id = ?;
        `;

        const valores = [idUsuario, idRefeicao];

        const [rows] = await pool.query(sql, valores);
        
        console.log("Resultado da busca:");
        console.log(rows);
        
        return rows;

    } catch (err) {
        console.log("Erro ao buscar dados no banco: ", err.message);
    }
}
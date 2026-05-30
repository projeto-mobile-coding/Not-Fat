require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(express.json());

// 1. CONEXÃO COM O BANCO DE DADOS
const pool = mysql.createPool ({
    host: process.env.db_host,
    port: process.env.db_port,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_database,
    ssl:{
        ca: process.env.DB_SSL_CA,
        rejectUnauthorized: false
    }
});

// 2. ROTA DE LOGIN
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

// Rota 3: ADICIONAR ALIMENTO NA REFEIÇÃO
app.post('/adicionar', async (req, res) => {
    try {
        const { idUsuario, idRefeicao, idAlimento } = req.body;
        const sql = 'INSERT INTO refeicao_usuario (usuario, refeicao, alimento) VALUES (?, ?, ?)';
        
        await pool.query(sql, [idUsuario, idRefeicao, idAlimento]);
        return res.json({ mensagem: "Adicionado com sucesso!" });

    } catch (err) {
        return res.status(500).json({ erro: err.message });
    }
});

// 4. ROTA DE BUSCAR TODOS OS ALIMENTOS (Para o Pop-out)
app.get('/alimentos', async (req, res) => {
    try {
        const [listaDeAlimentos] = await pool.query('SELECT * FROM alimento');
        return res.json(listaDeAlimentos);
    } catch (err) {
        return res.status(500).json({ erro: err.message });
    }
});

// 5. ROTA DE VER OS ALIMENTOS DE UMA REFEIÇÃO ESPECÍFICA
app.get('/refeicao/:idUsuario/:idRefeicao', async (req, res) => {
    try {
        const idUser = req.params.idUsuario;
        const idRef = req.params.idRefeicao;

        const sql = `
            SELECT 
                a.id AS id_alimento,
                a.nome AS nome_alimento
            FROM refeicao_usuario ru
            INNER JOIN alimento a ON ru.alimento = a.id
            WHERE ru.usuario = ? AND ru.refeicao = ?;
        `;

        const [listaRefeicao] = await pool.query(sql, [idUser, idRef]);
        return res.json(listaRefeicao);

    } catch (err) {
        return res.status(500).json({ erro: err.message });
    }
});

// 6. ROTA DE MUDAR O NOME DO USUÁRIO
app.put('/usuario/:idUsuario', async (req, res) => {
    try {
        const idUser = req.params.idUsuario; // Pega o ID que vem na URL
        const { novo_nome } = req.body;      // Pega o novo nome que vem no pacote JSON

        // Proteção rápida caso o Front-End mande o pacote vazio
        if (!novo_nome) {
            return res.status(400).json({ erro: "Você precisa enviar o 'novo_nome'." });
        }

        const sql = 'UPDATE usuario SET nome_completo = ? WHERE id = ?';
        const [resultado] = await pool.query(sql, [novo_nome, idUser]);

        // Se o banco não alterou nenhuma linha, o usuário não existe
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Usuário não encontrado." });
        }

        return res.json({ mensagem: "Nome atualizado com sucesso!" });

    } catch (err) {
        return res.status(500).json({ erro: err.message });
    }
});


// 5. LIGAR O SERVIDOR (Sempre no final do arquivo!)
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
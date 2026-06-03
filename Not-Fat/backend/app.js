require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(express.json());

// 1. CONEXÃO COM O BANCO DE DADOS
const pool = mysql.createPool({
    host: process.env.DB_HOST || process.env.db_host,
    port: process.env.DB_PORT || process.env.db_port || 3306,
    user: process.env.DB_USER || process.env.db_user,
    password: process.env.DB_PASSWORD || process.env.db_password,
    database: process.env.DB_DATABASE || process.env.db_database,
    ssl: {
        ca: process.env.DB_SSL_CA,
        rejectUnauthorized: false
    }
});

function respondServerError(res, err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro interno do servidor.' });
}

// 2. ROTA DE LOGIN
app.post('/login', async (req, res) => {
    try {
        const { nome_completo, email } = req.body;

        const [usuarios] = await pool.query('SELECT id, nome_completo FROM usuario WHERE email = ?', [email]);

        if (usuarios.length > 0) {
            return res.json({
                idUsuario: usuarios[0].id,
                nome_completo: usuarios[0].nome_completo,
                email,
            });
        } else {
            const [novoUsuario] = await pool.query(
                'INSERT INTO usuario (nome_completo, email) VALUES (?, ?)',
                [nome_completo, email]
            );
            return res.json({
                idUsuario: novoUsuario.insertId,
                nome_completo,
                email,
            });
        }

    } catch (err) {
        return respondServerError(res, err);
    }
});

// Rota 3: ADICIONAR ALIMENTO NA REFEIÇÃO
app.post('/adicionar', async (req, res) => {
    try {
        // 1. Recebe a quantidade do Front-End (ou do Thunder Client)
        const { idUsuario, idRefeicao, idAlimento, quantidade } = req.body;
        
        // 2. Adiciona a coluna e o ponto de interrogação na query
        const sql = 'INSERT INTO refeicao_usuario (usuario, refeicao, alimento, quantidade) VALUES (?, ?, ?, ?)';
        
        // 3. Passa a variável quantidade para o banco de dados
        await pool.query(sql, [idUsuario, idRefeicao, idAlimento, quantidade]);
        
        return res.json({ mensagem: "Adicionado com sucesso!" });

    } catch (err) {
        return respondServerError(res, err);
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

// 5. ROTA DE BUSCAR USUÁRIO PELO ID
app.get('/usuario/:idUsuario', async (req, res) => {
    try {
        const { idUsuario } = req.params;
        const [usuarios] = await pool.query(
            'SELECT id, nome_completo, email FROM usuario WHERE id = ?',
            [idUsuario]
        );

        if (usuarios.length === 0) {
            return res.status(404).json({ erro: 'Usuário não encontrado.' });
        }

        return res.json(usuarios[0]);
    } catch (err) {
        return respondServerError(res, err);
    }
});

// 6. ROTA DE VER OS ALIMENTOS DE UMA REFEIÇÃO ESPECÍFICA
app.get('/refeicao/:idUsuario/:idRefeicao', async (req, res) => {
    try {
        const idUser = req.params.idUsuario;
        const idRef = req.params.idRefeicao;

        const sql = `
            SELECT 
                a.id AS id_alimento,
                a.nome AS nome_alimento,
                SUM(ru.quantidade) AS quantidade
            FROM refeicao_usuario ru
            INNER JOIN alimento a ON ru.alimento = a.id
            WHERE ru.usuario = ? AND ru.refeicao = ?
            GROUP BY a.id, a.nome;
        `;

        const [listaRefeicao] = await pool.query(sql, [idUser, idRef]);
        return res.json(listaRefeicao);

    } catch (err) {
        return respondServerError(res, err);
    }
});

// 7. ROTA DE REMOVER UM ALIMENTO DE UMA REFEIÇÃO
app.delete('/refeicao/:idUsuario/:idRefeicao/:idAlimento', async (req, res) => {
    try {
        const { idUsuario, idRefeicao, idAlimento } = req.params;

        const sql = 'DELETE FROM refeicao_usuario WHERE usuario = ? AND refeicao = ? AND alimento = ?';
        const [resultado] = await pool.query(sql, [idUsuario, idRefeicao, idAlimento]);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: 'Alimento não encontrado para remoção.' });
        }

        return res.json({ mensagem: 'Alimento removido com sucesso.' });
    } catch (err) {
        return respondServerError(res, err);
    }
});

// 8. ROTA DE MUDAR O NOME DO USUÁRIO
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
        return respondServerError(res, err);
    }
});


// 5. LIGAR O SERVIDOR (Sempre no final do arquivo!)
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
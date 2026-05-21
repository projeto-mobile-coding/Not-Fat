require ('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');

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

async function buscarTodosOsUsuarios() {
    try {
        console.log("Buscando todos os usuários")
        const [rows] = await pool.query("SELECT * FROM usuario");
        console.log(rows);
    } catch {
        console.log("Erro de conexão com o banco de dados")
    }
}

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

// Testando com o Usuário 1 e Refeição 3
buscarRefeicaoDoUsuario(1, 3);
buscarRefeicaoDoUsuario(2, 3);
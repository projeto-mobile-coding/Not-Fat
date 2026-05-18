require('dotenv').config();

const express = require('express'); // Criar o servidor
const passport = require('passport'); // Autenticação
const session = require('express-session'); // Gerenciamento de sessões
const GoogleStrategy = require('passport-google-oauth20').Strategy; // Estratégia de autenticação do Google

const app = express(); // Inicializar o aplicativo Express

app.use
    (session({ // Configurar a sessão
        secret: "Segredo", // Chave secreta para assinar a sessão
        resave: false, // Não salvar a sessão se não for modificada
        saveUninitialized: true, // Salvar sessões não inicializadas
    })
);

app.use(passport.initialize()); // Inicializar o Passport
app.use(passport.session()); // Usar sessões com Passport

passport.use(
    new GoogleStrategy({ // Configurar a estratégia do Google
        clientID: process.env.GOOGLE_CLIENT_ID, // ID do cliente do Google
        clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Segredo do cliente do Google
        callbackURL: "http://localhost:3000/backend/google/callback", // URL de callback após autenticação
    },
    (accessToken, refreshToken, profile, done) => { // Função de callback após autenticação
        // Aqui você pode salvar o perfil do usuário no banco de dados ou realizar outras ações
        return done(null, profile); // Passar o perfil do usuário para a próxima etapa
    }
    )
);

passport.serializeUser((user, done) => done(null, user)); // Serializar o usuário para a sessão
passport.deserializeUser((user, done) => done(null, user)); // Desserializar o usuário da sessão

app.get("/", (req, res) => { // Rota raiz
    res.send("<a href='/backend/google'>Entrar com Google</a>"); // Enviar uma mensagem de boas-vindas
});

app.get("/backend/google", passport.authenticate("google", { scope: ["profile", "email"] 
})); // Rota para iniciar a autenticação com o Google

app.get(
    "/backend/google/callback", passport.authenticate('google', {failureRedirect: "/"}), (req, res) =>{
        res.redirect('/profile');
});

app.get("/profile", (req, res) => {
    res.send(`Bem vindo ${req.user.displayName}`); // Rota de perfil que exibe o nome do usuário autenticado
});

app.get("/logout", (req, res) => {
    req.logout(); // Encerrar a sessão do usuário
    res.redirect("/"); // Redirecionar para a página inicial
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
}); // Iniciar o servidor na porta 3000
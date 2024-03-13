const cors = require("cors");
require("dotenv").config();
const express = require("express");
const rotasUsuarios = require("./routes/Usuarios");
const rotasProdutos = require("./routes/Produtos")
const rotasImagemProdutos = require("./routes/Produtos")


const app = express();
app.use(express.json()); 

app.use(cors());

const { connection, authenticate } = require("./database/db");
authenticate(connection); 

app.use(rotasUsuarios)
app.use(rotasProdutos)
app.use(rotasImagemProdutos)


try {
    connection.sync();
        app.listen(3001, () => {
          console.log("Servidor rodando em http://localhost:3001/");
        });
} catch (error) {
    console.error("Erro ao criar trigger e iniciar o servidor:", error);
}
          
    

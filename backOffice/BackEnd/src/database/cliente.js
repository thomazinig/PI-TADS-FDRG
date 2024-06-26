const { DataTypes } = require("sequelize");
const { connection } = require("./db");

const Clientes = connection.define("cliente", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf:{
    type:DataTypes.STRING,
    allowNull:false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Clientes;

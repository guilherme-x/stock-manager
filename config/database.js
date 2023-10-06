require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const mongoose = require('mongoose');

// URL de conexão com o banco de dados MongoDB
const dbURL = process.env.DATABASE_URL;

// Configurações para evitar avisos de depreciação
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Função para conectar ao MongoDB
async function connectToDatabase() {
    try {
        await mongoose.connect(dbURL, dbOptions);
        console.log('Conectado ao MongoDB');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        process.exit(1); // Encerra a aplicação em caso de erro de conexão
    }
}

module.exports = connectToDatabase;

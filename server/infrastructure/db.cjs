const mongoose = require('mongoose'); // Importa mongoose para conectarse a la base de datos MongoDB.

process.loadEnvFile();

const user = process.env.MONGO_USER;
const port = process.env.MONGO_PORT;
const pass = process.env.MONGO_PWD;
const host = process.env.MONGO_ACCESS;
const cluster = process.env.MONGO_HOST;
const dbName = process.env.MONGO_DB_NAME;

// Crea la URI de conexión a MongoDB.
const uri = `${host}${user}:${pass}@${cluster}:${port}/${dbName}`;

const connection = async () => {
  try {
    const conn = await mongoose.connect(uri);

    console.log(`MongoDB Conectado: ${conn.connection.host}`);
    
    // Eventos de la conexión de MongoDB
    mongoose.connection.on('error', (err) => {
      console.error('Error de MongoDB:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB desconectado');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconectado');
    });

  } catch (error) {
    console.error('Error al conectar con MongoDB:', error);
    process.exit(1);
  }
};

module.exports = { connection };
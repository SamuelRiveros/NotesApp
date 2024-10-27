//dependences
const express = require('express');
const cors = require('cors');
const {connection} = require('./infrastructure/db.cjs');
//load envs
process.loadEnvFile();

//*Importamos las rutas respectivas para el uso de todos los endpoints
const userRoutes = require('./routes/userRoutes.cjs');

const noteRoutes = require("./routes/noteRoutes.cjs");

//dbConnection
connection();
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

// Routes
// app.use('/api/users', userRoutes);
// app.use('/api/notes', noteRoutes)

//start server

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.listen({port: PORT, host: HOST}, () => {
  console.log(`El server está corriendo en http://${HOST}:${PORT}`);
});

module.exports = app;
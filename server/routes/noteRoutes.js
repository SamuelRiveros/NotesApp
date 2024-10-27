const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth'); // Middleware de autenticación JWT
const rateLimiter = require('../middlewares/rateLimiter'); // Middleware de límite de solicitudes
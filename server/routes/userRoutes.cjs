const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.cjs');
const auth = require('../middlewares/auth.cjs'); // Middleware de autenticación JWT
const rateLimiter = require('../middlewares/rateLimiter.cjs'); // Middleware de límite de solicitudes

// Rutas públicas
router.post('/',rateLimiter.postLimiter, userController.crear);
router.post('/iniciarSesion',rateLimiter.loginLimiter, userController.iniciarSesion);
router.post('/logout', userController.crear);
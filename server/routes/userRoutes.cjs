const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.cjs');
const auth = require('../middlewares/auth.cjs'); // Middleware de autenticación JWT
const rateLimiter = require('../middlewares/rateLimiter.cjs'); // Middleware de límite de solicitudes

// Rutas públicas
router.post('/',rateLimiter.postLimiter, userController.crear);
router.post('/iniciarSesion',rateLimiter.loginLimiter, userController.iniciarSesion);

// Rutas públicas
router.post('/', auth, rateLimiter.postLimiter, userController.crear);
router.post('/login', auth, rateLimiter.loginLimiter, userController.iniciarSesion);
router.post('/logout', auth, userController.cerrarSesion);

module.exports = router
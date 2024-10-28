const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController.cjs');
const auth = require('../middlewares/auth.cjs'); // Middleware de autenticación JWT
const rateLimiter = require('../middlewares/rateLimiter.cjs'); // Middleware de límite de solicitudes

router.use(auth);

// Rutas Crud //* (requieren autenticación)
router.post('/', rateLimiter.postLimiter, noteController.crear);
router.get('/', rateLimiter.getLimiter, noteController.obtenerTodas);
router.get('/:id', rateLimiter.getLimiter, noteController.obtenerPorId);
router.put('/:id', rateLimiter.putLimiter, noteController.actualizar);
router.delete('/:id', rateLimiter.deleteLimiter, noteController.eliminar);
router.get("/search/:query", rateLimiter.getLimiter, noteController.obtenerPorTituloODescripcion);

module.exports = router
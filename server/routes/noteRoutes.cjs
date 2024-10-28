const express = require('express');
const router = express.Router();
const activityController = require('../controllers/noteController.cjs');
const auth = require('../middlewares/auth.cjs'); // Middleware de autenticación JWT
const rateLimiter = require('../middlewares/rateLimiter.cjs'); // Middleware de límite de solicitudes

router.use(auth);

// Rutas Crud //* (requieren autenticación)
router.post('/', rateLimiter.postLimiter, activityController.crear);
router.get('/', rateLimiter.getLimiter, activityController.obtenerTodas);
router.get('/:id', rateLimiter.getLimiter, activityController.obtenerPorId);
router.put('/:id', rateLimiter.putLimiter, activityController.actualizar);
router.delete('/:id', rateLimiter.deleteLimiter, activityController.eliminar);
router.get("/search", rateLimiter.getLimiter, )

module.exports = router
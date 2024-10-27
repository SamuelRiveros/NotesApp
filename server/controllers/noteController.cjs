const Activity = require('../schemas/Note.cjs');
const { formatResponse } = require('../utils/responseFormatter.cjs');
const { validationResult } = require('express-validator');

const noteController = {
    async crear(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(formatResponse(400,"Error de validación",errors.array()));
            }
    
            const newActivity = new Activity({
                ...req.body,
                usuario: req.user.id // Asumiendo que el ID del usuario viene del middleware de autenticación
            });
    
            const actividadGuardada = await newActivity.save();
            
            return res.status(201).json(formatResponse(201,"Actividad creada exitosamente",actividadGuardada));
    
        } catch (error) {
            console.error('Error al crear actividad:', error);
            return res.status(500).json(formatResponse(500, 'Error al crear actividad'));
        }
      },
}

module.exports = noteController;
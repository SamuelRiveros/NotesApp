const Note = require('../schemas/Note.cjs');
const { formatResponse } = require('../utils/responseFormatter.cjs');
const { validationResult } = require('express-validator');

const noteController = {
    async crear(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(formatResponse(400,"Error de validación",errors.array()));
            }
    
            const newNote = new Note({
                ...req.body,
                usuario: req.user.id // Asumiendo que el ID del usuario viene del middleware de autenticación
            });
    
            const notaGuardada = await newNote.save();
            
            return res.status(201).json(formatResponse(201,"Nota creada exitosamente",notaGuardada));
    
        } catch (error) {
            console.error('Error al crear la nota:', error);
            return res.status(500).json(formatResponse(500, 'Error al crear la nota'));
        }
      },
    // Obtener todas las notas del usuario
    async obtenerTodas (req, res) {
        try {
            const notas = await Note.find({ usuario: req.user.id })
                .sort({ fecha_inicio: -1 });
                console.log(notas)
            return res.status(200).json(formatResponse(200,"Notas recuperadas exitosamente", notas));
        } catch (error) {
            console.error('Error al obtener notas:', error);
            return res.status(500).json(formatResponse( 500, "Error interno del servidor"));
        }
    },
    // Obtener una nota específica
    async obtenerPorId (req, res) {
        try {
            const note = await Note.findOne({
                _id: req.params.id,
                $or: [
                    { usuario: req.user.id },
                ]
            }).populate([
                { path: 'usuario', select: 'nombre email' },
            ]);

            if (!note) {
                return res.status(404).json(formatResponse(400,'Nota no encontrada'));
            }

            res.json(note);
        } catch (error) {
            res.status(500).json(formatResponse(500,'Error al obtener la nota',error.message));
        }
    },

    async obtenerPorTituloODescripcion(req, res) {
        try {
            const { query } = req.params; // Supongamos que el término de búsqueda se pasa como parámetro
            const regex = new RegExp(query, 'i'); // Expresión regular para búsqueda insensible a mayúsculas
    
            const note = await Note.find({
                $or: [
                    { titulo: regex, usuario: req.user.id },
                    { descripcion: regex, usuario: req.user.id },
                ]
            }).populate([
                { path: 'usuario', select: 'nombre email' },
            ]);
    
            if (note.length === 0) {
                return res.status(404).json(formatResponse(400, 'No se encontraron notas'));
            }
    
            res.json(note);
        } catch (error) {
            res.status(500).json(formatResponse(500, 'Error al obtener las notas', error.message));
        }
    },

    

    // Actualizar una Nota
    async actualizar (req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(formatResponse(400,"Error de validación",errors.array()));
            }

            const nota = await Note.findOneAndUpdate(
                {
                    _id: req.params.id,
                    usuario: req.user.id
                },
                req.body,
                { new: true }
            );

            if (!nota) {
                return res.status(404).json(formatResponse(404,"Nota no encontrada"));
            }

            return res.status(200).json(formatResponse(200,"Nota actualizada exitosamente",nota));
        } catch (error) {
            console.error('Error al actualizar la nota:', error);
            return res.status(500).json(formatResponse( 500, "Error interno del servidor"));
        }
    },
    // Eliminar una nota
    async eliminar (req, res) {
        try {
        const note = await Note.findOne({
            _id: req.params.id,
            usuario: req.user.id // Solo el creador puede eliminar
        });

        if (!note) {
            return res.status(404).json(formatResponse(404,'Nota no encontrada o no tienes permisos para eliminarla'));
        }

        await Note.findByIdAndDelete(req.params.id);

        res.json(formatResponse( 200,'Nota eliminada correctamente'));
        } catch (error) {
        res.status(500).json(formatResponse( 500,'Error al eliminar la actividad',error.message));
        }
    }
}

module.exports = noteController;
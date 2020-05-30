const express = require('express');
const router = express.Router();
// importar express validator
const { body } = require('express-validator/check');
// importar el controlador 
const proyectosController = require('../controllers/proyectosControllers');
module.exports = function(){
    // creamos ruta para home
    router.get('/', proyectosController.proyectosHome );
    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
    router.post('/nuevo-proyecto', 
    body('nombre').not().isEmpty().trim().escape(),
    proyectosController.nuevoProyecto);
    //listar proyectos
    router.get('/proyectos/:url', proyectosController.proyectoUrl);
    //editar proyectos
    router.get('/proyecto/editar/:id', proyectosController.proyectoEditar);
    router.post('/nuevo-proyecto/:id', 
    body('nombre').not().isEmpty().trim().escape(),
    proyectosController.actualizarProyecto);
    return router;
}
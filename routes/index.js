const express = require('express');
const router = express.Router();
const proyectosController = require('../controllers/proyectosControllers');
module.exports = function(){
    // creamos ruta para home
    router.get('/', proyectosController.proyectosHome );
    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
    router.post('/nuevo-proyecto', proyectosController.nuevoProyecto)
    return router;
}
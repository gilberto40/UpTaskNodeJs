const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
// crear la conexion a la base de datos
const db = require('./config/db');
//importamos el helpers
const helpers = require('./helpers');
// importar el modelo
require('./model/Proyectos');
db.sync()
    .then(() => console.log('Conectado al Servidor'))
    .catch(error => console.log(error))
// Creamos una app de express
const app = express();
//donde cargar los archivos static
app.use(express.static('public'));
// habilitamos pug
app.set('view engine', 'pug');
//añadir la carpeta views
app.set('views', path.join(__dirname, './views'));
//habilitmos el body parser para leer los datos del formulario
// creamos la aplicacion de express para que se pueda usar los helpers global
app.use((req,res,next) => {
    res.locals.vardump = helpers.vardump;
    next();
})
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', routes());
app.listen(3000);
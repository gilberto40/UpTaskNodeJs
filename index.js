const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
// crear la conexion a la base de datos
const db = require('./config/db');
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
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', routes());
app.listen(3000);
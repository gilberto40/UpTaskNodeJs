const Proyectos = require('../model/Proyectos');

exports.proyectosHome = async (req,res) => {
    const proyectos = await Proyectos.findAll();
    res.render('index', {
        nombrePagina: 'Proyectos',
        proyectos
    });
};

exports.formularioProyecto = async(req, res) => {
    const proyectos = await Proyectos.findAll();
    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    })
};

exports.nuevoProyecto = async (req, res) => {
    // acceder al valor y mostrarlo en la consola nota: en node lo que se manda a la consola sale en la terminal
    // console.log(req.body);
    //validamos el formulario //hacemos uso del Destructuring de JS
    const proyectos = await Proyectos.findAll();
    const {nombre} = req.body;
    let errores = [];
    if(!nombre){
        errores.push({'texto': 'Agregar un Nombre al proyecto'});
    }

    //si hay errores
    if(errores.length > 0){
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto', 
            errores
        })
    }else{
        //si no hay errores
        //inserta en la base de datos
        // const url = slug(nombre).toLowerCase(); hacemos la url en el beforeCreate del hook
        const proyecto = await Proyectos.create({ nombre });
        res.redirect('/');
            // .then(() => console.log('Insertado Correctamente')) esta es la fomra de agregar sin el async await
            // .catch(error => console.log(error))
    }
};

exports.proyectoUrl = async(req, res, next) => {
    const proyectos = await Proyectos.findAll();
    const proyecto = await Proyectos.findOne({
        where: {
            url: req.params.url
        }
    })
    if(!proyecto) return next();
    res.render('tareas', {
        nombrePagina: 'Tareas del proyecto',
        proyecto,
        proyectos
    })

}


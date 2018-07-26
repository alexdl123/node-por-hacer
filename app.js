const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer');
const colors = require('colors');

const comando = argv._[0];

switch (comando) {

    case 'listar':
        //console.log('listar tareas por hacer');
        let listado = porHacer.getListado(argv.completado);
        for (let tarea of listado) {
            console.log('============Por Hacer==========='.green);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log('================================'.green);
        }
        break;

    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;

    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        //console.log(argv);
        break;
    case 'borrar':
        let result = porHacer.borrar(argv.descripcion);
        console.log(result);
        break;
    default:
        console.log('comando no reconocido');
}
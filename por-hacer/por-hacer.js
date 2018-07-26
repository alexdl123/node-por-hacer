const fs = require('fs');

let listadoPorHacer = [];


const cargarDB = () => {

    try {
        listadoPorHacer = require('../DB/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {

    let porHacer = {
        descripcion,
        completado: false
    }
    cargarDB();
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const getListado = (completado) => {

    cargarDB();
    var arr = [];
    if (completado === 'true') {
        arr = listadoPorHacer.filter(tarea => {
            return tarea.completado === true;
        })
    } else {
        arr = listadoPorHacer.filter(tarea => {
            return tarea.completado === false;
        })
    }

    return arr;
    /*try {
        return require('../DB/data.json');
    } catch (error) {
        return ['No hay tareas por hacer'];
    }*/

}

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('./DB/data.json', data, function(err) {
        if (err)
            throw new Error('Error al crear el archivo');
    })
}

const actualizar = (descripcion, completado = true) => {

    cargarDB();
    let index = listadoPorHacer.findIndex((tarea) => {
        return tarea.descripcion === descripcion;
    })
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {

    cargarDB();
    let index = listadoPorHacer.findIndex((tarea) => {
        return tarea.descripcion === descripcion;
    })

    //otra manera
    /*let nuevoListado = listadoPorHacer.filter( (tarea) => {
        return tarea.descripcion !== descripcion;
    } );*/
    if (index >= 0) {
        let arr = [];
        var i = 0;
        for (let tarea of listadoPorHacer) {
            if (i != index) {
                arr.push(tarea);
            }
            i++;
        }
        listadoPorHacer = arr;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}
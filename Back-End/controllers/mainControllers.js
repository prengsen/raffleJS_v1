import express from 'express';

import Rifa from '../Models/Rifa.js';
import Registro from '../Models/Registro.js';
import Ganador from '../Models/Ganador.js';

const registerRaffleController = async (req, res, next) => {
    const {nombre, correo, fechaIntentoRegistro, idRifa} = req.body;
    let allowRegister = 0;

    //revisar si el registro no existe previamente.
    const registroPrevio = await Registro.findAll({
        attributes: ['nombre', 'correo', 'id_rifa'],
        where: {
            nombre: nombre,
            correo: correo,
            id_rifa: idRifa
        }
    });
    
    //obtenemos parametros de posible registro previo.
    let registradoPrevio = JSON.parse(JSON.stringify(registroPrevio));
    console.log(registradoPrevio);

    if(registradoPrevio.length > 0){
        allowRegister = 1020
        console.log("AQUIIIII");
    } else {
        try{
            allowRegister = 1;
            let registroTimestamp = fechaIntentoRegistro;
            let id_rifa = idRifa;
            await Registro.create({nombre, correo, 
                                    registroTimestamp, id_rifa});
        } catch (error){
            console.log(error);
        }
    }
    
    //enviamos respuesta.
    res.send(JSON.stringify({
        'registerStatus': allowRegister
    }));
}

//consulta de rifa segun hora.
const getRaffleIdController = async (req, res, next) => {
    
}


const getInfoRifaController = async (req, res, next) =>{
    const {fechaIntentoRegistro} = req.body;
    const fechaIngreso = new Date(fechaIntentoRegistro);

    const nombreRifasDisponibles = new Array();
    const codigoRifas = new Array();
    //zona horaria guatemala.
    fechaIngreso.setHours(fechaIngreso.getHours()-6); 

    const rifaInfo = await Rifa.findAll(
        {attributes: ['id', 'nombre', 'fechaHoraInicio', 'fechaHoraFin']}
    );
    
    let rifasDisponibles = JSON.parse(JSON.stringify(rifaInfo));

    rifasDisponibles.forEach(item => {
        const horaInicio = new Date(Date.parse(item.fechaHoraInicio));
        const horaFinal = new Date(Date.parse(item.fechaHoraFin));
        if((fechaIngreso >= horaInicio) && (fechaIngreso <= horaFinal)){
            nombreRifasDisponibles.push(item.nombre);
            codigoRifas.push(item.id);
        }
    });

    if(nombreRifasDisponibles.length > 0){
        res.send(JSON.stringify({
            'rifasDisponibles': nombreRifasDisponibles,
            'codigoRifas': codigoRifas
        }));
    } else {
        res.send(JSON.stringify({
            'allowRegister': 0
        }));
    }

    

}

//Controlador para buscar registrados en base de daos.
const getRegistradosController = async (req, res, next) =>{
    const {idRifa} = req.body;
    console.log(idRifa);

    const registrados = await Registro.findAll({
        attributes: ['correo'],
        where: {
            id_rifa: idRifa
        }
    });
    
    let registradosRifa = JSON.parse(JSON.stringify(registrados));
    console.log(registradosRifa);
    if(registradosRifa.length > 0){
        
        res.send(JSON.stringify({
            'registrados': registradosRifa
        }));
    }
}

//controlador para guardar ganadores.
const postGanadoresController = async (req, res, next) => {
    const {ganadores, idRifa} = req.body;
    console.log(ganadores);
    let ganador1 = ganadores[0];
    let ganador2 = ganadores[1];
    let ganador3 = ganadores[2];
    const idRifaValue = idRifa;
    console.log({correo: ganador1, idRifa: idRifaValue});
    try{
       await Ganador.bulkCreate([{correo: ganador1, id_rifa: idRifaValue},
                     {correo: ganador2, id_rifa: idRifaValue},
                     {correo: ganador3, id_rifa: idRifaValue}]);
    } catch(error){
        console.log(error);
    }
}

const asyncForEach = async (array, idRifa) => {
    try{
        await Ganador.bulkCreate([{ganador1, idRifa},
                      { ganador2, idRifa },
                      { ganador3, idRifa }]);
     } catch(error){
         console.log(error);
     }
}

export{
    registerRaffleController,
    getRaffleIdController,
    getInfoRifaController,
    getRegistradosController,
    postGanadoresController
}
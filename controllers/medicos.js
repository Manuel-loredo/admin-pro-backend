const {response} = require('express');
const bcrypt = require('bcryptjs');
const Medico = require('../models/medico');
const { generarJWT } = require('../helpers/jwt');

//=============================
// Obtener Medicos
//==============================
const getmedicos = async(req, res=response) => {
 
    const medicos = await Medico.find()
                                 .populate('usuario','nombre img')
                                 .populate('hospital','nombre img')
 
    res.json({
        ok: true,
        medicos
    })
}


//=============================
// Crear Medico
//==============================
const crearMedico = async(req, res=response) => {
    const uid = req.uid;

    const medico = new Medico({
        usuario: uid,
        ...req.body
    });
    

    try {
        const medicoDB = await medico.save();
               
           res.json({
               ok: true,
               medico: medicoDB
           });
   
       } catch (error) {
           console.log(error);
            res.status(500).json({
                   ok: false,
                   msg: 'Error inesperado... revisar logs'
               });
       }
   
    }


//=============================
// Actualizar medico
//==============================
const actualizarMedico = (req, res=response) => {
    res.json({
        ok: true,
        msg: 'actualizarMedico'
    })
}

//=============================
// Borrar medico
//==============================
const borrarMedico = (req, res=response) => {
    res.json({
        ok: true,
        msg: 'borrarMedico'
    })
}

module.exports = {
    getmedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}
const {response} = require('express');
const bcrypt = require('bcryptjs');
const Hospital = require('../models/hospital');
const { generarJWT } = require('../helpers/jwt');

//=============================
// Obtener Hospitales
//==============================
const getHospitales = async(req, res=response) => {

    const hospitales = await Hospital.find()
                                     .populate('usuario','nombre img')

    res.json({
        ok: true,
        hospitales
    })

}


//=============================
// Crear Hospital
//==============================
const crearHospital = async(req, res=response) => {
    
    const uid = req.uid;
    
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });
    

    try {
     const hospitalDB = await hospital.save();
            
        res.json({
            ok: true,
            hospital: hospitalDB
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
// Actualizar Hospital
//==============================
const actualizarHospital = (req, res=response) => {
    res.json({
        ok: true,
        msg: 'actualizarHospital'
    })
}

//=============================
// Borrar Hospital
//==============================
const borrarHospital = (req, res=response) => {
    res.json({
        ok: true,
        msg: 'borrarHospital'
    })
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}
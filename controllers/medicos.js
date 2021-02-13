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
const actualizarMedico = async(req, res=response) => {
  
    const id = req.params.id;
    const uid = req.uid;

    try {
        
        const medico = await Medico.findById(id);

        if(!medico) {
         return res.status(404).json({
                ok: false,
                msg: 'medico no encontrado por id',
                id
            });
        }

      const cambiosMedico = {
          ...req.body,
          usuario: uid
      }

      const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, {new: true});

        res.json({
            ok: true,
           medico: medicoActualizado
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
// Borrar medico
//==============================
const borrarMedico = async(req, res=response) => {
 
    const id = req.params.id;
 

    try {
        
        const medico = await Medico.findById(id);

        if(!medico) {
         return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado por id',
                id
            });
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Medico eliminado eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
               ok: false,
               msg: 'Error inesperado... revisar logs'
           });
    }

}

module.exports = {
    getmedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}
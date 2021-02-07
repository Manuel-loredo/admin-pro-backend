const {response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const login = async(req, res = response) => {

const {email, password} = req.body;

    try {
        
    //verificar Email
    const usuarioDB = await Usuario.findOne({email});

    if(!usuarioDB) {
        return res.status(404).json({
            ok: false,
            msg: 'email no encontrado'
        })
    }
    //verificar contraseña
const validarPassword = bcrypt.compareSync(password, usuarioDB.password)
        if(!validarPassword) {
            return res.status(400).json({
                 ok: false,
                 msg: 'contraceña no valida'
            });
        }

        //Generar un TOKEN -JWT

        const token = await generarJWT(usuarioDB.id);


            res.json({
                ok: true,
                token
            })

        } catch (error) {
                console.log(error);
                res.status(500).json({
                    ok: true,
                    msg: 'Hable con el administrador'
                })
        }

}

module.exports = {
    login
}
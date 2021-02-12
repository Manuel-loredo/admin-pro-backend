const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const {googleVerify} = require('../helpers/google-verify');

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
                });
        }

}

const googleSignIn = async(req, res=response) => {

const googleToken = req.body.token;

try {
  const {name, email, picture } =  await googleVerify(googleToken);

   const usuarioDB = await Usuario.findOne({ email });
   
    let usuario;

    //Si no existe el usuario
    if(!usuarioDB) {
        usuario = new Usuario({
            nombre: name,
            email,
            password: '@@@',
            img: picture,
            google: true
        });
    } else {
        //existe el usuario
        usuario = usuarioDB;
        usuario.google = true;
    }

    //Guardar en DB
     await usuario.save();

      //Generar un TOKEN -JWT
      const token = await generarJWT(usuario.id);

    res.json({
        ok: true,
        msg: 'googlesign-in',
        token
    });
    
    
} catch (error) {
   console.log(error);
    res.status(401).json({
        ok: false,
        msg: 'Token no es correcto'
    });
}


}

module.exports = {
    login,
    googleSignIn
}
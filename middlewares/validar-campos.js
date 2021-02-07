const {responese} = require('express')
const {validationResult} = require('express-validator');

const validarCampos = (req, res = responese, next) => {
    
    const errores = validationResult(req);

    //si no esta vacio
    if(!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    next();
}   

module.exports = {
    validarCampos
}
/*
ruta:  /api/medicos     
*/

const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getmedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos')


const router = Router();

router.get( '/', validarJWT, getmedicos);

router.post( '/', 
          [
            validarJWT,
            check('nombre', 'El nombre es obligatorio').not().isEmpty(),
            check('hospital', 'El hospital id debe de ser valido').isMongoId(),
            validarCampos
          ],     
          crearMedico
);

router.put( '/:id', 
         [ ],
         actualizarMedico );


router.delete( '/:id', borrarMedico );

module.exports = router;
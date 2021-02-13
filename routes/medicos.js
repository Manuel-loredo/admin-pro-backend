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
         [
          validarJWT,
          check('nombre', 'El nombre del hospital obligatorio').not().isEmpty(),
          check('hospital', 'El hospital id debe de ser valido').isMongoId(),
          validarCampos
          ],
         actualizarMedico );


router.delete( '/:id', validarJWT, borrarMedico );

module.exports = router;
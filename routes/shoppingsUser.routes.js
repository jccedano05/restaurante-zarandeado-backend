
/* 
    Rutas de Usuarios / Auth

    host + /api/user/shoppings
 */

const { Router } = require("express");
const { check } = require("express-validator");


const {fieldsValidator} = require("../middlewares/fieldsValidator");
const { validarJWT } = require("../middlewares/validar-jwt");
const { getShoppingbyIdUser, createShoping} = require('../controllers/userShoppingController')





const router = Router();


//Pasamos todas las rutas por validacion de token
router.use ( validarJWT );



//Obtener Platillos general
router.get('/', getShoppingbyIdUser );


//Crear nuevo platillo
router.post(
    '/',
    [
        
            check('dishes', 'debe tener minimo un platillo agregado').not().isEmpty(),
            fieldsValidator
            
    ],
    createShoping 
    );



module.exports = router 
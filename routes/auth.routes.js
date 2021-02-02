
/* 
    Rutas de Usuarios / Auth

    host + /api/auth
 */

const { Router } = require("express");
const { check } = require("express-validator");

const { fieldsValidator } = require("../middlewares/fieldsValidator");
const { loginUsuario, registrarUsuario, revalidarToken } = require('../controllers/authController')
const { validarJWT } = require('../middlewares/validar-jwt')





const router =  Router();



 //Registro de usuario

 router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
        check('password2', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
        fieldsValidator
    ], 
    registrarUsuario )





//Login
router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(), 
        fieldsValidator
    ],
        loginUsuario );





 //Revalidar Token
router.get('/renew', validarJWT ,revalidarToken )


module.exports = router;
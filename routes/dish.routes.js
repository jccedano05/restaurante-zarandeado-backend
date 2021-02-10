
/* 
    Rutas de Usuarios / Auth

    host + /api/admin/dish
 */

const { Router } = require("express");
const { check } = require("express-validator");


const {fieldsValidator} = require("../middlewares/fieldsValidator");
const { validarJWT } = require("../middlewares/validar-jwt");
const { getAllDishes, createDish, updateDish, deleteDish} = require('../controllers/dishesController')





const router = Router();


//Pasamos todas las rutas por validacion de token
router.use ( validarJWT );



//Obtener Platillos general
router.get('/', getAllDishes );


//Crear nuevo platillo
router.post(
    '/',
    [
        
            check('dish_name', 'El nombre es obligatorio').not().isEmpty(),
            check('description', 'La seccion es obligatoria').not().isEmpty(),
            check('price', 'El precio es obligatorio').not().isEmpty().isNumeric(),
            check('urlImage', 'La url no debe quedar vacia').not().isEmpty(),
            fieldsValidator
            
    ],
    createDish 
    );


    //Actualizar un nuevo Platillo
router.put('/:id', updateDish );

//Borrar un nuevo platillo
router.delete('/:id', deleteDish );


module.exports = router 
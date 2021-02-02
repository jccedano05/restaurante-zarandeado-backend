
/* 
    Rutas de Usuarios / Auth

    host + /api/admin/section
 */


const { Router } = require("express");
const { check } = require("express-validator");


const {fieldsValidator} = require("../middlewares/fieldsValidator");
const { validarJWT } = require("../middlewares/validar-jwt");
const { getAllSections, createSection, updateSection, deleteSection} = require('../controllers/sectionController')





const router = Router();


//Pasamos todas las rutas por validacion de token
router.use ( validarJWT );



//Obtener Platillos general
router.get('/', getAllSections );


//Crear nuevo platillo
router.post(
    '/',
    [
        
            check('section_name', 'El nombre es obligatorio').not().isEmpty(),
            check('description', 'La seccion es obligatoria').not().isEmpty(),
            check('urlImage', 'La url no debe quedar vacia').not().isEmpty(),
            fieldsValidator
            
    ],
    createSection 
    );


    //Actualizar un nuevo evento
router.put('/:id', updateSection );

//Borrar un nuevo evento
router.delete('/:id', deleteSection );


module.exports = router 
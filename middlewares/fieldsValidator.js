const {response} = require('express')
const { validationResult } = require('express-validator')


const fieldsValidator = (req, res = response, next) => {


    const errors = validationResult( req ); //esta funcion nos trae los errores colocados en el check que esta en auth.routes

    if( !errors.isEmpty() ){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    next();  //next lo que hace es dejar pasar el codigo (esto funciona como aprobacion del middleware)
}

module.exports = {
    fieldsValidator
}
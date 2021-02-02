

const express = require('express');
const bcrypt = require('bcryptjs')

const Usuario = require('../models/UsuarioModel');
const { generarJWT } = require('../helpers/jwt');



const registrarUsuario = async ( req, res = express.response ) => {

    const { email, password, password2 } = req.body;

    try {

        let usuario = await Usuario.findOne({ email : email });

        if( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            })
        }

        if( password !== password2 ) {
            return res.status(400).json({
                ok: false,
                msg: 'Los passwords no coinciden'
            })
        }

        delete req.body.password2;

         usuario= new Usuario( req.body );


        //Encriptar password
        const salt = bcrypt.genSaltSync(10); 
        usuario.password = bcrypt.hashSync( password, salt);

        await usuario.save();


        //generar JWT
        const token = await generarJWT( usuario.id, usuario.name);


       //success
        return res.status(201).json ({ 
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token: token
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador' 
        })
    }

}






const loginUsuario = async (req, res  = express.response ) => {


    const { email, password } = req.body

    try {

        const usuario = await Usuario.findOne({email : email}) 

        if( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese emai'
            });
        } 

        //Confirmar los password
        const validPassword =bcrypt.compareSync( password, usuario.password );

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }

         //generar JWT
         const token = await generarJWT( usuario.id, usuario.name);



        return res.json ({
            "ok": true,
            uid: usuario.id,
            name: usuario.name,
            token: token

            
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador' 
        })        
    }    
}



const revalidarToken = async (req, res  = express.response ) => {

    const uid = req.uid;
    const name = req.name;

    //generar un nuevo JWT
    const token = await generarJWT( uid, name);

    res.json ({
        "ok": true,
        uid: uid,
        name: name,
        token
    })
}



module.exports = {
    loginUsuario,
    registrarUsuario,
    revalidarToken
}
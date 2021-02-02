const { response } = require('express');
const UserShopping = require('../models/UserShoppingModel');




//Obtener Platillos

const getShoppingbyIdUser = async (req, res = response ) => {
    
    const uid = req.uid;

    const allShoppingsByUser = await UserShopping.find();


    const filterShoppingUser = allShoppingsByUser.map( plato => {

        if( plato.user.toString() === uid  ){
            return plato.dishes
        }
    })


    const comprasCliente = filterShoppingUser.filter( compra =>  compra !== undefined)


    res.json({
        ok: true,
        shopings: comprasCliente
    })

}





//--------- COMPRAR PRODUCTOS --------//
const createShoping = async ( req, res = response ) => {


    const shopping = new UserShopping( req.body );


    try {
        
        shopping.user = req.uid;
        const shoppingSaved = await shopping.save();

        res.json({
            ok: true,
            shopping: shoppingSaved
        });


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador por este error'
        })
    }


}








module.exports = {
    getShoppingbyIdUser,
    createShoping
}
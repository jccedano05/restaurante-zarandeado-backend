const { response } = require('express');
const Dish = require('../models/DishModel');




//Obtener Platillos

const getAllDishes = async (rec, res = response ) => {
    



    const dishes = await Dish.find();


    res.json({
        ok: true,
        dishes: dishes
    })

}




const createDish = async ( req, res = response ) => {


    const dish = new Dish( req.body );

    try {
        
        const dishSaved = await dish.save();

        res.json({
            ok: true,
            dish: dishSaved
        });


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador por este error'
        })
    }


}




//Actualizar Platillo
const updateDish = async ( req, res = response ) => {

    const dishId = req.params.id;

    try {

        const dish = await Dish.findById( dishId );

        if( !dish ){
            return res.status(404).json({
                ok: false,
                msg: 'El platillo no existe'
            })
        }

        const newDish = {
            ... req.body
        }


        const dishUpdated = await Dish.findByIdAndUpdate( dishId, newDish, {new: true})
        
        res.json({
            ok: true,
            evento: dishUpdated
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

    
}






const deleteDish = async ( req, res = response ) => {

    const dishId = req.params.id;

    try {

        const dish = await Dish.findById( dishId );

        if( !dish ){
            return res.status(404).json({
                ok: false,
                msg: 'El platillo no existe'
            })
        }

        await Dish.findByIdAndDelete( dishId)
        
        res.json({
            ok: true
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}




module.exports = {
    getAllDishes,
    createDish,
    updateDish,
    deleteDish
}
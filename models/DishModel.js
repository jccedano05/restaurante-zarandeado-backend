
const { Schema, model } = require('mongoose');

const DishSchema = Schema({

    dish_name: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    urlImage: {
        type: String
    }

});


module.exports = model('Dish', DishSchema);
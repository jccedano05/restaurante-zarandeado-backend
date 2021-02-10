
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
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'Usuario',
        required: true 
    }

});


DishSchema.method('toJSON', function() {
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})



module.exports = model('Dish', DishSchema);
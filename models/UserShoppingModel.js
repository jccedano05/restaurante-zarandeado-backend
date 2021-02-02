
const { Schema, model } = require('mongoose');

const UserShoppingSchema = Schema({

    
    user: {
        type: Schema.Types.ObjectId, //con esto decimos que sera una referencia 
        ref: 'Usuario', //aqui decimos que la referencia sera Usuario
        required: true //este es required
    },
    dishes:[{
        dish_name: {
            type:String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        }
    }]

});



UserShoppingSchema.method('toJSON', function() {
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})




module.exports = model('UserShopping', UserShoppingSchema);
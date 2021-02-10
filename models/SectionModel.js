
const { Schema, model } = require('mongoose');

const SectionSchema = Schema({

    section_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
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



SectionSchema.method('toJSON', function() {
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})




module.exports = model('Section', SectionSchema);
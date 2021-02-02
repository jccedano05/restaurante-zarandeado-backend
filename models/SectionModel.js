
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
    }

});


module.exports = model('Section', SectionSchema);
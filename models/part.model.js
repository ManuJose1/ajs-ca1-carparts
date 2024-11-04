const { Schema, model } = require('mongoose');

const partSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title field is required']
    },
    price:{
        type: Number,
        required: [true, 'Price field is required']
    },
    description: {
        type: String,
        required: [true, 'Description field is required']
    },
    category: {
        type: String,
        required: [true, 'Category field is required']
    },
    subcategory: {
        type: String,
        required: [true, 'Sub-category Date is required']
    },
    image_path: {
        type: String
    }
}, { timestamps: true});

module.exports = model('Part', partSchema);
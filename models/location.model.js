const { Schema, model } = require('mongoose');

const locationSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title field is required']
    },
    address: {
        type: String,
        required: [true, 'address field is required']
    },
    email:{
        type: String,
        required: [true, 'address field is required']
    },
    phone:{
        type: String,
        required: [true, 'address field is required']
    },
    part: {
        type: Schema.Types.ObjectId,
        ref: 'Part',
       // required: [true, 'Part is required']
    },
    image_path: {
        type: String,
    }    

},{timestamps:true});

module.exports = model('Location', locationSchema);
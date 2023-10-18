const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    price:{
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    category:{
        type:String,
        ref: 'Category',
        required: true
    },
})

module.exports = mongoose.model('Product', ProductSchema);
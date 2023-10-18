const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategorySchema = new Schema({
    category:{
        type: String,
        required: true,
        enum: ['Men', 'Women', 'Teens']
    },
})

module.exports = mongoose.model('Category', CategorySchema);
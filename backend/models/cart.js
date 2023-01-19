const mongoose = require('mongoose');
const {Schema} = mongoose;

const cartSchema = Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    order : {
        type : Array,
        required : true
    }
})

module.exports = mongoose.model("Cart", cartSchema);
const mongoose = require("mongoose");

const doctorsDataSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

const DoctorsData = mongoose.model('DoctorsData', doctorsDataSchema);
module.exports = DoctorsData;
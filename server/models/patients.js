const mongoose = require("mongoose");

const patientsDataSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
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
    },
    address:{
        type: String,
        required: true
    },
    dateOfBirth:{
        type: String,
        required: true
    },
    age:{
        type: String,
        required: true
    },
    bloodGroup:{
        type: String,
        required: true
    }
});

const PatientsData = mongoose.model('PatientsData', patientsDataSchema);
module.exports = PatientsData;
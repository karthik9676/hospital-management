const mongoose = require("mongoose");

const appointmentsSchema = new mongoose.Schema({
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
    date:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required : true
    }
});

const AppointmentsData = mongoose.model('AppointmentsData', appointmentsSchema);
module.exports = AppointmentsData;
const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
    date:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    patient:{
        type: String,
        required: true
    },
    caseHistory:{
        type: String,
        required: true
    },
    medication:{
        type: String,
        required: true
    },
    note:{
        type: String,
        required: true
    }
});

const PrescriptionData = mongoose.model('PrescriptionData', prescriptionSchema);
module.exports = PrescriptionData;
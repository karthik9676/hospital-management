const mongoose = require("mongoose");

const bedsSchema = new mongoose.Schema({
    bedNumber:{
        type: String,
        required: true
    },
    patient:{
        type: String,
        required: true
    },
    allotmentTime:{
        type: String,
        required: true
    },
    dischargeTime:{
        type: String,
        required: true
    }
});

const BedsData = mongoose.model('BedsData', bedsSchema);
module.exports = BedsData;
const express = require("express");
const PatientsData = require("../models/patients");
const PrescriptionData = require("../models/prescriptions");
const DoctorsData = require("../models/doctors");
const BedsData = require("../models/beds");
const AppointmentsData = require("../models/appointments");

const router = express.Router();

router.get("/", (req, res)=>{
    res.send("From API routes");
});

// adding patient api
router.post("/addpatient", async(req, res)=>{
    try{
        //console.log(req.body);
        const {name, email, password, gender, age, dateOfBirth, phone, bloodGroup, address} = req.body;
        const isPatientExist = await PatientsData.findOne({email : email})
        console.log(isPatientExist)
        if(!isPatientExist){
            const addpatient = {
              name: name,
              email: email,
              password: password,
              phone: phone,
              gender: gender,
              age: age,
              dateOfBirth: dateOfBirth,
              address: address,
              bloodGroup: bloodGroup,
            };
            await PatientsData.insertMany([addpatient])
            return res.status(200).json({message : "Patient Registration Success"})
        }
        else{
            return res.status(400).json({message : "Patient Already Exists"});
        }
    }
    catch(error){
        console.log(error)
    }
})

// to get patient details api
router.get("/patient", async(req, res)=>{
    try{
        const allPatients = await PatientsData.find({});
        //console.log(allPatients)
        res.send(allPatients);
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal servor error"});
    }
})

// getting the patient with id api
router.get("/patient/:id", async(req, res)=>{
    try{
        //console.log(req.params)
        const {id} = req.params;
        //console.log(id)
        const result = await PatientsData.findById( {_id : id})
        //console.log(result)
        res.send(result)
    }
    catch(error){
        console.log(error)
    }
})

// updatinng the patient
router.put("/patient/:id", async(req, res)=>{
    try{
        //console.log(req.params)
        const {id} = req.params;
        //console.log(id)
        const result = await PatientsData.findByIdAndUpdate( {_id : id}, {
            name : req.body.name,
            email : req.body.email,
            address : req.body.address,
            phone : req.body.phone,
            gender : req.body.gender,
            dateOfBirth : req.body.dateOfBirth,
            age : req.body.age,
            bloodGroup : req.body.bloodGroup
        })
        //console.log(result)
        res.status(200).json( {message : "Upadetd Successfully"})
    }
    catch(error){
        console.log(error)
    }
})

// deleting the patient
router.delete("/patient/:id", async(req, res)=>{
    try{
        //console.log(req.params)
        const {id} = req.params;
        //console.log(id)
        const result = await PatientsData.findByIdAndDelete( {_id : id})
        //console.log(result)
        res.status(200).json({message : "Patient deleted successfully"})
    }
    catch(error){
        console.log(error)
    }
})


// adding prescription api
router.post("/addprescription", async(req, res)=>{
    try{
        //console.log(req.body);
        const {date, time, patient, caseHistory, medication, note} = req.body;
        const addPrescription = {
            date,
            time,
            patient,
            caseHistory,
            medication,
            note
          };
          await PrescriptionData.insertMany([addPrescription])
          return res.status(200).json({message : "Prescription added successfully"})
    
    }
    catch(error){
        console.log(error)
    }
})

// getting prescription details
router.get("/prescription", async(req, res)=>{
    try{
        const data = await PrescriptionData.find({});
        //console.log(allPatients)
        res.send(data);
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal servor error"});
    }
})

// getting the prescription with id api
router.get("/prescription/:id", async(req, res)=>{
    try{
        //console.log(req.params)
        const {id} = req.params;
        //console.log(id)
        const result = await PrescriptionData.findById( {_id : id})
        //console.log(result)
        res.send(result)
    }
    catch(error){
        console.log(error)
    }
});

// updatinng the prescription
router.put("/prescription/:id", async(req, res)=>{
    try{
        //console.log(req.params)
        const {id} = req.params;
        //console.log(id)
        const result = await PrescriptionData.findByIdAndUpdate( {_id : id}, {
            date : req.body.date,
            time : req.body.time,
            caseHistory : req.body.caseHistory,
            medication : req.body.medication,
            note : req.body.note
        })
        //console.log(result)
        res.status(200).json( {message : "Upadetd Successfully"})
    }
    catch(error){
        console.log(error)
    }
});

// deleting the presceiption
router.delete("/prescription/:id", async(req, res)=>{
    try{
        //console.log(req.params)
        const {id} = req.params;
        //console.log(id)
        const result = await PrescriptionData.findByIdAndDelete( {_id : id})
        //console.log(result)
        res.status(200).json({message : "Prescription  deleted successfully"})
    }
    catch(error){
        console.log(error)
    }
});

// to get doctor profile details api
router.get("/doctor/:id", async(req, res)=>{
    try{
        //console.log(req.params)
        const {id} = req.params;
        //console.log(id)
        const result = await DoctorsData.findById( {_id : id})
        //console.log(result)
        res.send(result)
    }
    catch(error){
        console.log(error)
    }
})

// adding beds api
router.post("/bed_allotment", async(req, res)=>{
    try{
        //console.log(req.body);
        const {bedNumber, patient, allotmentTime, dischargeTime} = req.body;
        const addBed = {
            bedNumber,
            patient,
            allotmentTime,
            dischargeTime
          };
          await BedsData.insertMany([addBed])
          return res.status(200).json({message : "Bed added successfully"})
    
    }
    catch(error){
        console.log(error)
    }
})

// getting beds api
router.get("/bed_allotment", async(req, res)=>{
    try{
        const data = await BedsData.find({});
        //console.log(allPatients)
        res.send(data);
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal servor error"});
    }
})

// getting the bed with id api
router.get("/bed_allotment/:id", async(req, res)=>{
    try{
        //console.log(req.params)
        const {id} = req.params;
        //console.log(id)
        const result = await BedsData.findById( {_id : id})
        //console.log(result)
        res.send(result)
    }
    catch(error){
        console.log(error)
    }
});

// updatinng the bed Details
router.put("/bed_allotment/:id", async(req, res)=>{
    try{
        //console.log(req.params)
        const {id} = req.params;
        //console.log(id)
        const result = await BedsData.findByIdAndUpdate( {_id : id}, {
            bedNumber : req.body.bedNumber,
            patient : req.body.patient,
            allotmentTime : req.body.allotmentTime,
            dischargeTime : req.body.dischargeTime
        })
        //console.log(result)
        res.status(200).json( {message : "Upadetd Successfully"})
    }
    catch(error){
        console.log(error)
    }
});

// deleting the beds
router.delete("/bed_allotment/:id", async(req, res)=>{
    try{
        //console.log(req.params)
        const {id} = req.params;
        //console.log(id)
        const result = await BedsData.findByIdAndDelete( {_id : id})
        //console.log(result)
        res.status(200).json({message : "Bed deleted successfully"})
    }
    catch(error){
        console.log(error)
    }
});

// adding appointment api
router.post("/appointment", async(req, res)=>{
    try{
        //console.log(req.body);
        const {name, email, phone, date, time} = req.body;
        const addPrescription = {
            name,
            email,
            phone,
            date,
            time
          };
          await AppointmentsData.insertMany([addPrescription])
          return res.status(200).json({message : "Appointment added successfully"})
    
    }
    catch(error){
        console.log(error)
    }
})

// getting appointment details
router.get("/appointment", async(req, res)=>{
    try{
        const data = await AppointmentsData.find({});
        res.send(data);
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal servor error"});
    }
});

// getting the appointment details with id api
router.get("/appointment/:id", async(req, res)=>{
    try{
        //console.log(req.params)
        const {id} = req.params;
        //console.log(id)
        const result = await AppointmentsData.findById( {_id : id})
        //console.log(result)
        res.send(result)
    }
    catch(error){
        console.log(error)
    }
});

// updatinng the appointment
router.put("/appointment/:id", async(req, res)=>{
    try{
        //console.log(req.params)
        const {id} = req.params;
        //console.log(id)
        const result = await AppointmentsData.findByIdAndUpdate( {_id : id}, {
            name : req.body.name,
            email : req.body.email,
            phone : req.body.phone,
            date : req.body.date,
            time : req.body.time
        })
        //console.log(result)
        res.status(200).json( {message : "Upadetd Successfully"})
    }
    catch(error){
        console.log(error)
    }
});

// deleting the appointment
router.delete("/appointment/:id", async(req, res)=>{
    try{
        //console.log(req.params)
        const {id} = req.params;
        //console.log(id)
        const result = await AppointmentsData.findByIdAndDelete( {_id : id})
        //console.log(result)
        res.status(200).json({message : "Appointment deleted successfully"})
    }
    catch(error){
        console.log(error)
    }
});


module.exports = router;
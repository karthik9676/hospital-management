const express = require("express");
const DoctorsData = require("../models/doctors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtAuth = require("../middleware/jwtAuth");

const router = express.Router();

router.get("/", (req, res)=>{
    res.send("From Auth routes");
});

// registration api
router.post("/signup", async (req, res) => {
  try {
    //console.log(req.body);
    const { name, email, phoneNumber, gender, password } = req.body;
    const isExist = await DoctorsData.findOne({ email: req.body.email });
    //console.log(isExist);
    if (!isExist) {
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = new DoctorsData({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        gender: gender,
        password: hashedPassword,
      });
      user.save();
      return res.status(200).json({ message: "Registration Success!!!" });
    } else {
      return res.status(400).json({ message: "User Already Registered..." });
    }
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({message : "Internal server error"})
  }
});

// login api
router.post("/login", async(req, res)=>{
    try{
        //console.log(req.body)
        const {email, password} = req.body;
        const isExist = await DoctorsData.findOne({email : email})
        //console.log(isExist)
        if(isExist){
            const isPasswordMatched = await bcrypt.compare(password, isExist.password);
            if(isPasswordMatched){
                let payload = {
                  id: isExist._id
                };
                let token = jwt.sign(payload, 'HOSPITAL_SECRET', {expiresIn: '5hr'});
                //console.log(token)
                return res.status(200).json({token : token, message: "Login Success"});
            }
            else{
                return res.status(400).json({message : "Password Not Matched"});
            }
        }
        else{
            return res.status(400).json({message : "User Not Found"})
        }
    }
    catch(e){
        console.log(e.message);
        return res.status(500).json({message : "Internal server error"});
    }
})

// profile details api
router.get("/profile", jwtAuth, async(req, res)=>{
  const user = await DoctorsData.findOne({_id : req.id});
  //console.log(user)
  res.send(user);
})

module.exports = router;
const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");


const app = express();

app.use(express.json());  

app.use(cors());

const port = 4444 || process.env.PORT;

mongoose.connect("mongodb+srv://karthikreddy7877:karthik7877@cluster0.j1oly1z.mongodb.net/bayannoHospital?retryWrites=true&w=majority")
.then(()=> console.log("DB connected"))
.catch( (error)=> console.log(error))

app.use("/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/apiRoutes"));

app.listen(port, ()=>{
    console.log(`server is running at ${port}`);
})
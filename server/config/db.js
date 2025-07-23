const mongoose = require('mongoose');

const mongo_URI = process.env.mongo_URI;


mongoose.connect(mongo_URI)
.then(()=>{
    console.log("Database connected success");
    
})
.catch((err)=>{
    console.log(err);
    console.log("Error in DB connection");
    
})
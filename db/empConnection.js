const mongoose =require("mongoose");
const url ='mongodb://localhost:27017/Employee';
mongoose.connect(url,{useNewUrlParser:true});
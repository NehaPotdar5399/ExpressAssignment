const mongoose=require('mongoose')
const {Schema}=mongoose;
mongoose.connect("mongodb://localhost:27017/db").then((console.log("Database connected"))).catch((err)=>console.log(err))
const connection = mongoose.connection;

module.exports = connection
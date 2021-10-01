const mongoose=require('mongoose')

const mongoUri="mongodb+srv://shubham:rHwluwr6c4HJIWyz@cluster0.2s7yg.mongodb.net/Project0?retryWrites=true&w=majority";

const connectToMongo= ()=>{
    mongoose.connect(mongoUri,()=>{
        console.log("connected successsfully");
    })
}


module.exports =connectToMongo
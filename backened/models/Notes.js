const mongoose =require('mongoose')


const NotesSchema = new Schema({
    title: {
         type: String 
        },
    description: {
      type:String
    },
   tag:{
        type:String,
        default:"Good morning"
    },
    date:{
        type:date,
        default:date.now
    }
  });

  module.exports=model.Schema(NotesSchema)
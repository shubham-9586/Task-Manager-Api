const mongoose =require('mongoose')

const { Schema } = mongoose

const NotesSchema = new Schema({
  user:{
type:mongoose.Schema.Types.ObjectId,
ref:'users'
  },
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
        type:Date,
        default:Date.now


    }
  });

  const Notes=mongoose.model('Notes', NotesSchema);
  module.exports=Notes
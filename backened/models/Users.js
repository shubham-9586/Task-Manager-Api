const mongoose =require('mongoose')

const { Schema } = mongoose

const UserSchema = new Schema({
    name: { type: String },
    email: {
      type:String,
  required:true,
    },
    password:{
        type:String,
    }
  });
  const users=mongoose.model('users', UserSchema);

users.createIndexes();

  module.exports=users;
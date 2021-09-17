const { getByTitle } = require('@testing-library/dom');
const express=require('express')

const router=express.Router();

const { body, validationResult } = require('express-validator');

const fetchuser=require('../middleware/fetchuser')

const Notes=require('../models/Notes')

router.get('./fetchalluser', fetchuser, async(req,res)=>{

    try {
        
        const notes=await notes.find({user:req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error.message)
      res.status(500).send("error occured");  
    }

})

router.post('./addnote', fetchuser,  [
    body('title').isLength({ min: 3 }),
  body('description').isLength({ min: 5 })],
async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
    const {title ,description,tag}=req.body
        const notes=new Notes({
        title,description,tag,user:req.user.id
        })
        const saveNote=await notes.save();
        res.json(saveNote)
        res.send("500")
    } catch (error) {
        console.error(error.message)
        res.status(500).send("error occured");
    }
    
})


module.exports=router
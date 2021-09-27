const express=require('express')
const router=express.Router();

const { body, validationResult } = require('express-validator');

const fetchuser=require('../middleware/fetchuser')

const Notes=require('../models/Notes')

router.get('/fetchalluser', fetchuser, async(req,res)=>{
    try {
        
        const notes=await Notes.find({user:req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error.message)
      res.status(500).send("error occured");  
    }

})
router.post('/addnotes', fetchuser,  [
    body('title').isLength({ min: 3 }),
  body('description').isLength({ min: 5 })],
async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
    const {title ,description,tag}=req.body
        const notes=await new Notes({
        title,description,tag,user:req.user.id
        })
        const saveNote=await notes.save();
        res.json(saveNote)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("error occured");
    }
    
})

router.put('/update/:id', fetchuser,  
async(req,res)=>{
  console.log(req.params.id);
  try {
  const {title ,description,tag}=req.body
  const newnote={};
      if(title){newnote.title=title}
      if(description){newnote.description=description}
      if(tag){newnote.tag=tag}
      let note=await Notes.findById(req.params.id);
      if(!note)
      {
        return res.status(404).send("Result not found")
      }
      
      if(note.user.toString()!==req.user.id)
      {
        return res.status(401).send("Invalid Token")
      }
      
      note= await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
      res.json(note)

    } catch (error) {
      console.error(error.message)
      res.status(500).send("error occured");
  }
})

  router.delete('/deletenote/:id', fetchuser,  
async(req,res)=>{
  try {
      let note=await Notes.findById(req.params.id);
      if(!note)
      {
        return res.status(404).send("Result not found")
      }
      if(note.user.toString()!==req.user.id)
      {
        return res.status(401).send("Invalid Token")
      }
      
     note= await Notes.findByIdAndDelete(req.params.id);
     res.status(200).send("Deleted successfully")

    } catch (error) {
      console.error(error.message)
      res.status(500).send("error occured");
  }
})
module.exports=router
import React, { useState } from 'react'
import { useContext, useEffect, useRef } from 'react'
import NoteContext from '../context/notes/noteContext'
import Addnote from './Addnote';
import Noteitem from './Noteitem';
import { useHistory } from 'react-router-dom';
function Notes(props) {
    const context = useContext(NoteContext);
    const { notes, getNotes ,addNote, editNote } = context;
    let history=useHistory();
    useEffect(() => {
        const data=localStorage.getItem('token');
      //  console.log(data);
        if(localStorage.getItem('token'))
        {
            console.log("Hello");
            getNotes();
        }
        else
        {
            history.push("/login")
        }
    }, [])
    const [note, setnote] = useState({id:"",title:"",description:"",tag:""})
    const ref = useRef(null)
   const refClose = useRef(null)
    const updateNote = async (currentnote) => {
        ref.current.click()
        setnote(currentnote)
     
    }

        const onChange=(e)=>{
        setnote({...note,[e.target.name]: e.target.value})
        }
        
        const handleClick=(e)=>{
            e.preventDefault();
            console.log(note);
        editNote(note._id,note.title,note.description,note.tag)
      refClose.current.click();
      props.showAlert("Updated Succcessfully","success")
        }

    return (
        <>
            <Addnote showAlert={props.showAlert}/>

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input value={note.title} type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                    <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input value={note.description} type="text" className="form-control" id="description" name="description" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input value={note.tag} type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
                </div>
            </form>
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.title.length<5||note.description.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update Notes</button>
      </div>
    </div>
  </div>
</div>

            <div className="row my-3 mx-3">
                <h1>Your note</h1>
                <div className="container">
                {notes.length===0 && 'Enter some notes'}
                </div>
                {
                    notes.map((note) => {
                        return <Noteitem note={note} key={note._id} updateNote={updateNote} showAlert={props.showAlert}/>
                    })
                }
            </div>
        </>
    )
}

export default Notes

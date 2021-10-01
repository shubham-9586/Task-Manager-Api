import React,{useContext} from 'react'

import NoteContext from '../context/notes/noteContext'

function Noteitem(props) {
  const context=useContext(NoteContext);
  const {deleteNote }=context;
  const {note, updateNote,showAlert}=props;
 const handleClick= () =>{
  deleteNote(note._id)
  showAlert("Deleted successfully","success")
 }
    return (
        <div className="card col-md-3 mx-3 my-3" >
     
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="far fa-trash-alt mx-1" onClick={ handleClick}></i>
          <i className="far fa-edit mx-1" onClick={()=>{return updateNote(note)}}></i>
        </div>
      </div>
    )
}

export default Noteitem

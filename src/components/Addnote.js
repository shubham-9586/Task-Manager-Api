import React ,{useContext,useState} from 'react'

import NoteContext from '../context/notes/noteContext'

function Addnote(props) {
    const context=useContext(NoteContext);
    const {notes,addNote}=context;
const [note, setnote] = useState({title:"",description:"",tag:""})
    const onChange=(e)=>{
    setnote({...note,[e.target.name]: e.target.value})
    }
    const handleClick=(e)=>{
        e.preventDefault();
        console.log(note.tag);
    addNote(note.title,note.description,note.tag)
    props.showAlert("Added Successfully","success");
setnote({title:"",description:"",tag:""});
    }
    return (

        <div className="conatiner my-3"   >
            <h1>Add a note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required  />
                    <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description}  onChange={onChange} minLength={5} required  />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag} />
                </div>
                <button disabled={note.title.length<5||note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}
export default Addnote

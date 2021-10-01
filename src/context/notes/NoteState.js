import React from "react"
import NoteContext from "./noteContext"
import { useState } from "react"
import Alert from "../../components/Alert"

function NoteState(props) {
  const host = 'https://tasks-manage-api.herokuapp.com'

  const initialState = []
  const [notes, setnote] = useState(initialState)

  //Adding note
  const addNote = async (title, description, tag) => {
    console.log(localStorage.getItem('token'));
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    setnote(notes.concat(note));

console.log(note);

  }

  //Deleting note

  const deleteNote = async (id) => {


    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },

      //   body: JSON.stringify(data)
    });


    console.log("Deleting note " + id);
    const newnote = notes.filter((note) => { return note._id !== id })
    setnote(newnote);
    
  }

  // Editing note

  const editNote = async (id, title, description, tag) => {

    console.log(id);
    const response = await fetch(`${host}/api/notes/update/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      let element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnote(newNotes);

  }

  const getNotes = async () => {
//console.log(localStorage.getItem('token'));
    const response = await fetch(`${host}/api/notes/fetchalluser`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify()
    });
    const json = await response.json();
//console.log(json);
    setnote(json);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState


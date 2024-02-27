// import react from "react";

import NoteContext from "./NoteContext";
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const NoteState = (props) => {


  const host = "http://localhost:5000";
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  /////////GET ALL NOTES/////////////////////////
  const getNotes = async () => {
    const response = await fetch(`${host}/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      
    });
    const json = await response.json() 
    setNotes(json)
  }
  //////////END OF GET ALL NOTES////////////////

  //////////////////TO ADD A NOTE/////////////////
  const addNote =  async (title, description) => {
    console.log("Adding a new note");
    const newnote ={
      "_id": uuidv4(),
      "user": localStorage.getItem('token'),
      "title":title,
      "description": description,
      "date": Date.now(),
      "__v": 0
    }
   
    // API Call 
    const response = await fetch(`${host}/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description})
    });

    const note = await response.json();
    //setNotes(notes.concat(newnote));
    setNotes([...notes, newnote]);
    console.log("Note added id " + note._id);
  }
  /////////////END OF ADD NOTE/////////////

  ///////////TO DELETE A NOTE//////////////
  const deleteNote = async (noteId) => {
    ////// API Call ///////
    const response = await fetch(`${host}/notes/deletenote/${noteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
     
    });
    const json = await response.json();
    console.log("Deleting the note" + noteId);
    setNotes(notes.filter((note) => note._id !== noteId));
  }

///////////////////END OD DELETE API///////////

  ////////////TO UPDATE A NOTE/////////////////

  const updateNote = async (id, title, description) => {
    const response = await fetch(`${host}/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, description})
      });
      const json = await response.json(); 
      let newNotes = JSON.parse(JSON.stringify(notes))
    //logic to edit in client
    for(let i=0 ; i<notes.length; i++)
    {
      const element = notes[i];
      if(element._id === id)
      {
        newNotes[i].title = title;
        newNotes[i].description = description;
        // newNotes[i].tag = tag; 
        break; 
      }

    }
    setNotes(newNotes);
}
//////////////////END OF UPDATE API//////////////////
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState


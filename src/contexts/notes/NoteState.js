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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhMjkyZTUzMjIyNmIzMDIxZmNjZmEwIn0sImlhdCI6MTcwNTE1MzI1M30.wmizAlRv9yk902a8ZmfgG8rCh_m4Ore8ZQntAgYO0r0"
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
      "user": "659adb813c25d1045d39a865",
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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhMjkyZTUzMjIyNmIzMDIxZmNjZmEwIn0sImlhdCI6MTcwNTE1MzI1M30.wmizAlRv9yk902a8ZmfgG8rCh_m4Ore8ZQntAgYO0r0"
      },
      body: JSON.stringify({title, description})
    });

    const note = await response.json();
    setNotes(notes.concat(newnote));

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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhMjkyZTUzMjIyNmIzMDIxZmNjZmEwIn0sImlhdCI6MTcwNTE1MzI1M30.wmizAlRv9yk902a8ZmfgG8rCh_m4Ore8ZQntAgYO0r0"
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
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhMjkyZTUzMjIyNmIzMDIxZmNjZmEwIn0sImlhdCI6MTcwNTE1MzI1M30.wmizAlRv9yk902a8ZmfgG8rCh_m4Ore8ZQntAgYO0r0"
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


  // const Notes = [


//     {
//       "_id": "659aeb30073d33e19b0ad989",
//       "user": "659adb813c25d1045d39a865",
//       "title": "To-do list for tomorrow",
//       "description": "Complete full stack development",
//       "date": "2024-01-07T18:19:28.085Z",
//       "__v": 0
//     },
//     {
//       "_id": "65a013effff39044d559170b",
//       "user": "659adb813c25d1045d39a865",
//       "title": "Movies watchlist",
//       "description": "Foe, Past Lives, Poor Things, Saltburn",
//       "date": "2024-01-11T16:14:39.444Z",
//       "__v": 0
//     },
//     {
//       "_id": "659aeb30073d33e19b0ad989",
//       "user": "659adb813c25d1045d39a865",
//       "title": "To-do list for tomorrow",
//       "description": "Complete full stack development",
//       "date": "2024-01-07T18:19:28.085Z",
//       "__v": 0
//     },
//     {
//       "_id": "65a013effff39044d559170b",
//       "user": "659adb813c25d1045d39a865",
//       "title": "Movies watchlist",
//       "description": "Foe, Past Lives, Poor Things, Saltburn",
//       "date": "2024-01-11T16:14:39.444Z",
//       "__v": 0
//     },
//     {
//       "_id": "659aeb30073d33e19b0ad989",
//       "user": "659adb813c25d1045d39a865",
//       "title": "To-do list for tomorrow",
//       "description": "Complete full stack development",
//       "date": "2024-01-07T18:19:28.085Z",
//       "__v": 0
//     },
//     {
//       "_id": "65a013effff39044d559170b",
//       "user": "659adb813c25d1045d39a865",
//       "title": "Movies watchlist",
//       "description": "Foe, Past Lives, Poor Things, Saltburn",
//       "date": "2024-01-11T16:14:39.444Z",
//       "__v": 0
//     }
  

//   ]
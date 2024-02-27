// NoteItem.js
//NoteItems => Notes
import React, { useContext, useState } from 'react';
import Card from 'react-bootstrap/Card';
import './NoteItem.css';
import NoteContext from '../contexts/notes/NoteContext';
import MyVerticallyCenteredModal from './AddNote';

const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  const [modalShow, setModalShow] = useState(false);
  const [updatedNote, setUpdatedNote] = useState({ title: note.title, description: note.description });

  const handleInputChange = (e) => {
    setUpdatedNote({ ...updatedNote, [e.target.name]: e.target.value });
  };

  // const handleEdit = () => {
  //   // Open the modal for editing with the note data
  //   setModalShow(true);
  // };

  const handleUpdateNote = () => {
    // Call the updateNote function with the noteId and updatedNote
    updateNote(note._id, updatedNote);
    setModalShow(false); // Close the modal after updating the note
  };

  return (
    ////////////THIS COMPONENT IS FETCHING AND DISPLAYING  ALL THE NOTES///////////////////
    <div className="shimmer-container">
      <Card className="note-card">
        <Card.Img variant="top" />
        <Card.Body>
          <h4 className="relative z-10 mb-4 w-full text-3xl font-bold text-slate-50">{note.title}</h4>
          <p className="relative z-10 text-slave-400">{note.description}</p>
          <div className="flex gap-2 justify-center items-center">
            <button className="px-6 py-2 font-medium bg-indigo-500 text-white w-fit transition-all shadow-[3px 3px 0px black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]" onClick={()=>{updateNote(note)}}>
              Edit
            </button>
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              handleUpdateNote={handleUpdateNote}
              updatedNote={updatedNote}
              handleInputChange={handleInputChange}
            />
            <button className="px-6 py-2 font-medium bg-indigo-500 text-white w-fit transition-all shadow-[3px 3px 0px black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]" onClick={() => { deleteNote(note._id) }}>
              Delete
            </button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NoteItem;

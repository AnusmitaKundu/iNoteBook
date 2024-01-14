import React, { useState, useContext } from 'react';
import NoteContext from '../contexts/notes/NoteContext';
import CreateNote from './createNote'; 

 import MyVerticallyCenteredModal from './AddNote';

const Dashboard = () => {
  const [modalShow, setModalShow] = useState(false);
  const context = useContext(NoteContext);
  // const { notes } = context;

  return (
    <>
      <MyVerticallyCenteredModal/>
      <button className="rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none" onClick={() => setModalShow(true)}>
      + Add a new note
    </button>
      <CreateNote /> 

      <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
    
    
    </>
  );
};

export default Dashboard;
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
// import { Example } from './SlideToggler';
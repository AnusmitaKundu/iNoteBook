
import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import NoteContext from '../contexts/notes/NoteContext';
// import CreateNote from './createNote';


function MyVerticallyCenteredModal(props) {
  //const [title, setTitle] = useState('');
  const context = useContext(NoteContext);
  const {addNote} = context;
  const [ notes, setNotes ] = useState({title: "", description: "", tag: ""});
  
  const handleInputChange = (e) => {
    setNotes({...notes, [e.target.name]: e.target.value})
   
  };

  const handleAddNote = (e) => {
       e.preventDefault();
        addNote(notes.title, notes.description);
        setNotes({title: "", description: ""});
        props.onHide();
  };

  return (
    
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Note </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Add a title</Form.Label>
            <Form.Control type="text" name="title" placeholder="Title..."  onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Textarea</Form.Label>
            <Form.Control as="textarea" rows={3} name="description"  onChange={handleInputChange}/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleAddNote}>Update Note</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal
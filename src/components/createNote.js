import React, { useContext, useState, useEffect } from 'react';
import NoteContext from '../contexts/notes/NoteContext';
import NoteItem from './NoteItem';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const CreateNote = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes, addNote } = context;
  const [showNotes, setShowNotes] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [showModal, setShowModal] = useState(false);

  const toggleNotes = () => {
    setShowNotes(!showNotes);
  };

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    addNote(formData.title, formData.description);
    setFormData({ title: '', description: '' });
    setShowModal(false);
  };

  const updateNote = (note) => {
    console.log('Update note:', note);
    // You may open a modal or perform any other action based on your requirement
  };

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Add a title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Title..."
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Textarea</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAddNote}>Add</Button>
        </Modal.Footer>
      </Modal>

      <div className="container my-3">
        <div className="flex items-center mb-3">
          <h1 className="mb-0 mr-2">My Notes</h1>
          <div
            className="toggle-arrow cursor-pointer transition-transform transform hover:scale-110 bg-gray-300 hover:bg-gray-400 rounded-full p-1"
            onClick={toggleNotes}
          >
            {showNotes ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
        </div>

        {showNotes && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {notes.map((note, index) => (
              <div key={index} className="col mb-4">
                <NoteItem key={note._id} updateNote={() => updateNote(note)} note={note} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CreateNote;

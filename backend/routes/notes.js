const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { validationResult } = require('express-validator');
const { body } = require('express-validator');
const Note = require('../models/Notes');


// Route to add a note  http://localhost:5000/notes/addnote
router.post('/addnote', fetchuser, [
    body('title', 'Enter title').isLength({ min: 3 }),
    body('description', 'Enter description').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newNote = new Notes({
            title,
            description,
            tag,
            user: req.user.id
        });

        const savedNote = await newNote.save();
        res.json(savedNote);
    } catch (error) {
        console.log("Error in adding note:", error);
        res.status(500).json("Internal Server Error");
    }
});

// Route to fetch all notes for the logged-in user http://localhost:5000/notes/fetchallnotes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error("Error in fetching all notes:", error);
        res.status(500).send('Server Error');
    }
});



//Route 3 to update notes. method: PUT "http://localhost:5000/notes/updatenote/:id"
router.put('/updatenote/:id', fetchuser, async(req,res)=>{
    const { title, description, tag } = req.body;
    //check id is present or not
    const newNote={};
    if(title)
    {
        newNote.title=title;
    }
    if(description){
        newNote.description=description;
    }
    if(tag){
        newNote.tag=tag;
    }

    let note = await Note.findById(req.params.id);
    if(!note) return res.status(404).send("No record found");

    if(note.user.toString()!== req.user.id)//Matching the userid with the logged in userid
    {
        return res.status(401).json("User Not Authorized!");
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({note});
})


//Route 4: for deleting note. method: DELETE "http://localhost:5000/notes/deletenote/:id"
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json("No record found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).json("User Not Authorized!");
        }

        await Note.findByIdAndDelete(req.params.id);
        res.json({ msg: "Note deleted successfully" });
    } catch (error) {
        console.error("Error in deleting note:", error);
        res.status(500).json("Internal Server Error");
    }
});

module.exports = router;

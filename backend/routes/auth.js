const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'Harryisagoodboy';
const fetchuser = require('../middleware/fetchuser');


// @desc    Register a new user
router.post('/signup', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must contain capital letters and special characters').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json("E-mail address is already in use");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        const data = {
            user: {
                id: user.id
            }
        };

        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});

//////We would post a request, with correct credentials, at the /api/auth/login endpoint as http://localhost:5000/auth/signup




//Authenticate a user: POST "/auth/login"
router.post("/login", [  
    body('email', "Enter email").isEmail(),
    body('password', "Enter password").exists()
    ], async (req, res) => {
    //if there are error return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //destructuring
    const { email, password } = req.body; //using destructuring method of javascript
    try {
        let user = await User.findOne({ email });//find the user in database with the entered email of the client
        if (!user) {
            return res.status(400).send("Please try to login with correct credentials");
        }
        const passwordCompare = await bcrypt.compare(password, user.password); // To compare password in database with entered password
        if (!passwordCompare) {
            return res.status(401).send("Invalid Password");//if invalid password is entered show error
        }
        //payload
        const data ={
            //sending the user id as object
            user:{
                id:user.id
            }
        }
        //Create JWT token for authentication
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ msg: "Logged in", authToken });


    }
    catch (error) {
        console.log("Error in Login : ", error);
        res.status(500).json("Internal Server Error");
    }
})
///////We would post a request, with correct credentials, at the /api/auth/login endpoint as http://localhost:5000/auth/login

//GET user details using method: POST endpoint: /auth/getuser

router.get('/getuser', fetchuser,  async(req,res)=>{

    try{
        const  userId = req.user.id;
        const user = await User.findById(userId).select("-password") //finding user by ID, selecting fields except password
        res.send(user);
    }
    catch(error){
        console.error("Error in Login : ", error);
        res.status(500).json("Internal Server Error");
    }
}
);

module.exports = router
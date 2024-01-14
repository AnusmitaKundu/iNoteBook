// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const { JWT_SECRET } = require('../config'); // Import your JWT secret from a configuration file
const JWT_SECRET = 'Harryisagoodboy';
const fetchuser = (req, res, next) => {
    const token = req.header('auth-token'); // Get the token from the header
    if (!token) {
        return res.status(401).send({ error: "Use using a valid token" });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET); // Verifying the JWT token
        req.user = data.user;
        next(); // If verified, execute the next function
    } catch (error) {
        res.status(401).send({ error: "Check using a valid token" });
    }
};

module.exports = fetchuser;

// Step 1: Above, we have first imported the Jsonwebtoken (JWT). After that, we have created a fetch user arrow function, which takes request, response, and next.

// Step 2: After that, we would like to get the token from the header named auth-token. Moreover, if the token is not present then we have denied access to the user with a bad request. 

// Step 3: Subsequently, we have extracted the data from the token and have verified the token and the JWT_secret. Hence, we would get the user and therefore we would execute the next function. The next() function is not a part of the Node.js or Express API but is the third argument that is passed to the middleware function. This means that the async (req, res) will be called after getting the user in the ‘getuser’ route.



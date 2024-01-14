const express = require('express');
var cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const connectToMongo = require('./db');
connectToMongo();

app.use(express.json())//middleware
app.use(cors());
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.post('/login', (req, res) => {
//     res.send('You are logged in!');
//   });

//   app.post('/signup', (req, res) => {
//     res.send('Sign up if you are a new user!');
//   });

  app.use('/auth', require('./routes/auth'))
  app.use('/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  }
);

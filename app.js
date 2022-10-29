require('dotenv').config();
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
require('./config/passport')(passport);

//App Set Up
const app = express();
const PORT = process.env.PORT || 8000;

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // JSON parsing
app.use(cors()); // allow all CORS requests
app.use(passport.initialize());
//Database Set Up
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
    console.log(`Connected to MongoDB at HOST: ${db.host} and PORT: ${db.port}`);
});

db.on('error', (error) => {
    console.log(`Database Error: ${error}`);
});


// SuperHero.create({
//     realName: 'Clark Kent',
//     alterEgo: 'Superman',
//     company: 'Marvel'
// })
// .then(superhero => {
//     console.log('NEW HERO', superhero);
// })
// .catch(error => {
//     console.log('ERROR', error);
// })

//API Routes


app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Voluntiers' });
});

// ================ SUPERHEROS ROUTES ========================
// app.use('/superheros', require('./controllers/superheros'));

// ================ CREDIT CARDS ROUTES ========================
// app.use('/credits', require('./controllers/credits'));

// ================ VEHICLES ROUTES ========================
// app.use('/vehicles', require('./controllers/vehicles'));


// API Routes
app.get('/', (req, res) => {
    res.json({ name: 'MERN Auth API', greeting: 'Welcome to the our API', author: 'YOU', message: "Smile, you are being watched by the Backend Engineering Team" });
  });
  
  app.use('/examples', require('./controllers/example'));
  app.use('/users', require('./controllers/user'));
  app.use('/eventsignup', require('./controllers/event-signup'));
  
  // Server
  const server = app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
  
  module.exports = server;
  
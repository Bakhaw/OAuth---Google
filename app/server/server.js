const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

// connection to mongodb with mongoose
mongoose.connect(keys.mongodb.mongoUrl, () => {
  console.log('Connected to the db at =>', keys.mongodb.mongoUrl);
});

// set up view engine
app.set('view engine', 'ejs');

// cookie-session setup
app.use(cookieSession({
  // the duration of the cookie (in ms)
  maxAge: 24 * 60 * 60 * 1000, // = 1 day
  keys: [keys.session.cookieKey],
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set up auth routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// create home route
app.get('/', (req, res) => {
  res.render('home');
});

app.listen(keys.port, () => {
  console.log(`App now listening for requests on PORT: ${keys.port}`);
});

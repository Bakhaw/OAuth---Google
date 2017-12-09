const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/User');

// serialize User with the mongodb id
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize the User with the ID we got after serializing it
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy({
  // options for the Google Strategy
  callbackURL: '/auth/google/redirect',
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret,
}, (accessToken, refreshToken, profile, done) => {
  // check if the user already exists
  User.findOne({ googleId: profile.id }).then((currentUser) => {
    if (currentUser) {
      // already have the user in our db
      done(null, currentUser);
    } else {
      // if not, create user in our db
      new User({
        username: profile.displayName,
        googleId: profile.id,
      }).save().then((newUser) => {
        done(null, newUser);

        // when the done callback is called, it jumps on the serialize method
      });
    }
  });
})
);

const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
  res.render('login');
});

// auth logout
router.get('/logout', (req, res) => {
  // we logout with the logout() passport method
  req.logout();
  res.redirect('/');
});

// auth with google
router.get('/google', passport.authenticate('google', {
  // we want the profile informations about the user
  scope: ['profile'],
}));

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  // res.send(req.user);
  res.redirect('/profile/');
});

module.exports = router;

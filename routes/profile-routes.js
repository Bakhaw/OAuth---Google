const router = require('express').Router();

// creating middleware to redirect the person who can't access to /profile
// because he is not logged in
const authCheck = (req, res, next) => {
  if (!req.user) {
    // if the user is not connected, redirect him
    res.redirect('/');
  } else {
    // if he is connected, jump out of that middleware
    next();
  }
};

router.get('/', authCheck, (req, res) => {
  res.render('profile', { user: req.user });
});

module.exports = router;

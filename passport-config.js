const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('./library/database'); // Adjust the path as necessary

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id); // Assuming user.id is a unique identifier
});

// Deserialize user
passport.deserializeUser((id, done) => {
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      return done(err);
    }
    const user = results[0];
    done(null, user);
  });
});

// Local strategy for username/password authentication
passport.use(new LocalStrategy((username, password, done) => {
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      return done(err);
    }
    if (results.length === 0) {
      return done(null, false, { message: 'Incorrect username or password' });
    }

    const user = results[0];

    // Compare hashed password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect username or password' });
      }
      return done(null, user); // Authentication successful
    });
  });
}));

module.exports = passport;
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('./db');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const query = 'SELECT * FROM users WHERE google_id = $1';
      const result = await db.query(query, [profile.id]);

      if (result.rows.length === 0) {
        const insertQuery = 'INSERT INTO users (name, email, google_id) VALUES ($1, $2, $3) RETURNING *';
        const newUser = await db.query(insertQuery, [profile.displayName, profile.emails[0].value, profile.id]);
        return done(null, newUser.rows[0]);
      }
      return done(null, result.rows[0]);
    } catch (err) {
      return done(err, null);
    }
  }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

const path = require('path');
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Import modules
const { findUserByUsername, findUserById } = require('./config/database');
const authRoutes = require('./routes/auth');
const pageRoutes = require('./routes/pages');

const app = express();

// Passport Local Strategy
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = findUserByUsername(username);
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = findUserById(id);
  if (!user) return done(null, false);
  done(null, user);
});

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'dev_secret_change_me',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', authRoutes);
app.use('/', pageRoutes);

// Root route redirect
app.get('/', (req, res) => {
  res.redirect('/index.html');
});

// 404 handler
app.use((req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Page Not Found</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
      <style>
        body { 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .error-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-4">
            <div class="card error-card p-4">
              <div class="text-center mb-4">
                <h1 class="display-5 text-warning mb-3">
                  <i class="bi bi-exclamation-triangle"></i> 404
                </h1>
                <div class="alert alert-warning">
                  <i class="bi bi-search me-2"></i>
                  Page not found
                  <br>
                  <small class="text-muted">The requested page doesn't exist</small>
                </div>
              </div>
              <div class="d-grid gap-3">
                <a href="/index.html" class="btn btn-primary">
                  <i class="bi bi-house me-2"></i>Back to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`📁 Project Structure:`);
  console.log(`   ├── config/     - Database configuration`);
  console.log(`   ├── middleware/ - Authentication middleware`);
  console.log(`   ├── routes/     - Express route handlers`);
  console.log(`   ├── public/     - Static HTML files`);
  console.log(`   └── server.js   - Main application entry`);
});

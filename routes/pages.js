const express = require('express');
const { ensureAuthenticated, ensureRole } = require('../middleware/auth');

const router = express.Router();

// Protected area page
router.get('/protected.html', ensureAuthenticated, (req, res) => {
  res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Protected Area</title>
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
      .protected-card {
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
          <div class="card protected-card p-4">
            <div class="text-center mb-4">
              <h1 class="display-5 text-success mb-3">
                <i class="bi bi-shield-check"></i> Protected Area
              </h1>
              <div class="alert alert-success">
                <i class="bi bi-person-circle me-2"></i>
                Welcome, <strong>${req.user.username}</strong>
                <br>
                <small class="text-muted">Role: ${req.user.role}</small>
              </div>
            </div>
            <div class="d-grid gap-3">
              <form method="post" action="/logout">
                <button type="submit" class="btn btn-danger btn-lg">
                  <i class="bi bi-box-arrow-left me-2"></i>Logout
                </button>
              </form>
              <a href="/index.html" class="btn btn-outline-secondary">
                <i class="bi bi-house me-2"></i>Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  </body>
  </html>`);
});

// Admin panel page
router.get('/admin.html', ensureRole('admin'), (req, res) => {
  res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    <style>
      body { 
        background: linear-gradient(135deg, #dc3545 0%, #fd7e14 100%);
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .admin-card {
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
          <div class="card admin-card p-4">
            <div class="text-center mb-4">
              <h1 class="display-5 text-danger mb-3">
                <i class="bi bi-gear"></i> Admin Panel
              </h1>
              <div class="alert alert-danger">
                <i class="bi bi-shield-lock me-2"></i>
                Hello, <strong>${req.user.username}</strong>
                <br>
                <small class="text-muted">You have admin privileges</small>
              </div>
            </div>
            <div class="mb-4">
              <h5 class="text-muted">Admin Actions:</h5>
              <div class="list-group">
                <a href="#" class="list-group-item list-group-item-action">
                  <i class="bi bi-people me-2"></i>Manage Users
                </a>
                <a href="#" class="list-group-item list-group-item-action">
                  <i class="bi bi-graph-up me-2"></i>View Analytics
                </a>
                <a href="#" class="list-group-item list-group-item-action">
                  <i class="bi bi-gear me-2"></i>System Settings
                </a>
              </div>
            </div>
            <div class="d-grid gap-3">
              <form method="post" action="/logout">
                <button type="submit" class="btn btn-danger btn-lg">
                  <i class="bi bi-box-arrow-left me-2"></i>Logout
                </button>
              </form>
              <a href="/index.html" class="btn btn-outline-secondary">
                <i class="bi bi-house me-2"></i>Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  </body>
  </html>`);
});

module.exports = router;

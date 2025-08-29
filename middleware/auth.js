// Authentication middleware

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login.html');
}

function ensureRole(role) {
  return (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.redirect('/login.html');
    }
    if (req.user.role !== role) {
      return res.status(403).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Access Denied</title>
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
                    <h1 class="display-5 text-danger mb-3">
                      <i class="bi bi-exclamation-triangle"></i> Access Denied
                    </h1>
                    <div class="alert alert-danger">
                      <i class="bi bi-shield-x me-2"></i>
                      You don't have permission to access this resource.
                      <br>
                      <small class="text-muted">Required role: ${role}</small>
                    </div>
                  </div>
                  <div class="d-grid gap-3">
                    <a href="/index.html" class="btn btn-primary">
                      <i class="bi bi-house me-2"></i>Back to Home
                    </a>
                    <a href="/protected.html" class="btn btn-outline-secondary">
                      <i class="bi bi-shield-check me-2"></i>Protected Area
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
    }
    next();
  };
}

function ensureGuest(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/protected.html');
}

module.exports = {
  ensureAuthenticated,
  ensureRole,
  ensureGuest
};

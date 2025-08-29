// Demo functionality for static deployment
class RBACDemo {
    constructor() {
        this.users = [
            { username: 'admin', password: 'admin123', role: 'admin' },
            { username: 'user', password: 'user123', role: 'user' }
        ];
        this.currentUser = null;
        this.init();
    }

    init() {
        this.checkAuth();
        this.bindEvents();
    }

    checkAuth() {
        const user = localStorage.getItem('rbac_user');
        if (user) {
            this.currentUser = JSON.parse(user);
            this.updateUI();
        }
    }

    bindEvents() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Register form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }

        // Logout buttons
        const logoutButtons = document.querySelectorAll('[data-action="logout"]');
        logoutButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleLogout(e));
        });
    }

    handleLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');

        const user = this.users.find(u => u.username === username && u.password === password);
        
        if (user) {
            this.currentUser = { username: user.username, role: user.role };
            localStorage.setItem('rbac_user', JSON.stringify(this.currentUser));
            this.showMessage('Login successful!', 'success');
            setTimeout(() => {
                window.location.href = 'protected.html';
            }, 1000);
        } else {
            this.showMessage('Invalid credentials!', 'error');
        }
    }

    handleRegister(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');
        const role = formData.get('role');

        if (this.users.find(u => u.username === username)) {
            this.showMessage('Username already exists!', 'error');
            return;
        }

        this.users.push({ username, password, role });
        this.showMessage('Registration successful! Please login.', 'success');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    }

    handleLogout(e) {
        e.preventDefault();
        this.currentUser = null;
        localStorage.removeItem('rbac_user');
        this.showMessage('Logged out successfully!', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }

    updateUI() {
        const userInfo = document.getElementById('userInfo');
        if (userInfo && this.currentUser) {
            userInfo.innerHTML = `
                <div class="alert alert-success">
                    <i class="bi bi-person-circle me-2"></i>
                    Welcome, <strong>${this.currentUser.username}</strong>
                    <br>
                    <small class="text-muted">Role: ${this.currentUser.role}</small>
                </div>
            `;
        }

        // Show/hide admin content
        const adminContent = document.querySelectorAll('[data-role="admin"]');
        adminContent.forEach(el => {
            if (this.currentUser && this.currentUser.role === 'admin') {
                el.style.display = 'block';
            } else {
                el.style.display = 'none';
            }
        });
    }

    showMessage(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        const container = document.querySelector('.container');
        if (container) {
            container.insertBefore(alertDiv, container.firstChild);
        }
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }

    hasRole(role) {
        return this.currentUser && this.currentUser.role === role;
    }
}

// Initialize demo when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.rbacDemo = new RBACDemo();
});

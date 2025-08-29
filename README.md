# Role-Based Access Control (RBAC) System

A modern, secure web application demonstrating Role-Based Access Control using Node.js, Express, and Passport.js with a beautiful Bootstrap UI.

## 🚀 Features

- **User Authentication**: Secure login/logout with password hashing
- **User Registration**: Create new accounts with role selection
- **Role-Based Access Control**: Different permissions for admin and user roles
- **Protected Routes**: Middleware-based route protection
- **Session Management**: Persistent user sessions
- **Modern UI**: Responsive Bootstrap 5 design with glassmorphism effects
- **Error Handling**: Comprehensive error pages and user feedback

## 🛠️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Passport.js** - Authentication middleware
- **Express Sessions** - Session management
- **bcryptjs** - Password hashing

### Frontend
- **Bootstrap 5** - CSS framework
- **Bootstrap Icons** - Icon library
- **Modern CSS** - Glassmorphism and gradients

## 📁 Project Structure

```
role-based-access-control/
├── config/
│   └── database.js          # Database configuration and user management
├── middleware/
│   └── auth.js              # Authentication middleware
├── routes/
│   ├── auth.js              # Authentication routes (login, register, logout)
│   └── pages.js             # Protected page routes
├── public/
│   ├── index.html           # Welcome page
│   ├── login.html           # Login form
│   ├── register.html        # Registration form
│   └── info.html            # Application information page
├── server.js                # Main application entry point
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd role-based-access-control
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 👤 Default Users

The application comes with two pre-configured test accounts:

| Username | Password | Role  | Access Level |
|----------|----------|-------|--------------|
| `admin`  | `admin123` | Admin | Full access to all features |
| `user`   | `user123`  | User  | Basic access to protected areas |

## 🔐 Authentication Flow

1. **Registration**: Users can create new accounts with role selection
2. **Login**: Secure authentication with password verification
3. **Session Management**: Persistent sessions with automatic logout
4. **Route Protection**: Middleware ensures proper access control

## 🛡️ Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **Session Security**: Secure session configuration
- **Input Validation**: Form validation and sanitization
- **Access Control**: Role-based route protection
- **Error Handling**: Secure error messages without information leakage

## 🎨 UI/UX Features

- **Responsive Design**: Works on all device sizes
- **Modern Aesthetics**: Glassmorphism effects and gradients
- **Bootstrap Components**: Professional UI components
- **Icon Integration**: Bootstrap Icons for enhanced visual appeal
- **Consistent Styling**: Unified design language across all pages

## 📱 Pages Overview

### Welcome Page (`/`)
- Landing page with navigation to all features
- Beautiful gradient background with glassmorphism cards

### Login Page (`/login.html`)
- User authentication form
- Input validation and error handling
- Links to registration and home

### Registration Page (`/register.html`)
- New user registration form
- Role selection (User/Admin)
- Form validation and user feedback

### Protected Area (`/protected.html`)
- Accessible to all authenticated users
- Displays user information and role
- Logout functionality

### Admin Panel (`/admin.html`)
- Admin-only access
- Enhanced admin features and actions
- Role-specific functionality

### Info Page (`/info.html`)
- Comprehensive application documentation
- Technical stack information
- Feature overview and usage guide

## 🔧 Development

### Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm test` - Run tests (placeholder)

### Adding New Features

1. **New Routes**: Add to appropriate route file in `/routes/`
2. **New Middleware**: Create in `/middleware/` directory
3. **Database Changes**: Modify `/config/database.js`
4. **New Pages**: Add HTML files to `/public/` directory

## 🚨 Error Handling

The application includes comprehensive error handling:

- **404 Errors**: Custom 404 page with navigation
- **403 Errors**: Access denied page for unauthorized access
- **Authentication Errors**: Redirect to login with appropriate messages
- **Form Validation**: Client and server-side validation

## 🔄 Session Management

- Sessions are stored server-side
- Automatic session expiration
- Secure session configuration
- Logout functionality clears sessions

## 📊 Future Enhancements

Potential improvements for the application:

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] User profile management
- [ ] Password reset functionality
- [ ] Email verification
- [ ] Two-factor authentication
- [ ] API endpoints for mobile apps
- [ ] User activity logging
- [ ] Advanced role permissions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For questions or issues:

1. Check the info page at `/info.html`
2. Review the console logs for debugging information
3. Ensure all dependencies are properly installed
4. Verify Node.js version compatibility

---

**Built with ❤️ using Node.js, Express, and Bootstrap**

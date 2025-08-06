[🌐 Demo Site (Vercel)](https://cards-proj-boris-main.vercel.app)

# Business Cards Management System 

A modern React web application for managing and displaying business cards with a responsive design and comprehensive user management system.

## 🚀 Project Overview

This application provides a complete business card management solution with user authentication, card display, search functionality, and administrative capabilities. Built with React, Material-UI, and modern web technologies.

## ✨ Key Features

### 🏠 Main Website
- **Business Card Directory**: Browse all available business cards with pagination
- **Search Functionality**: Search cards by title, subtitle, or city
- **Responsive Design**: Optimized for all screen sizes (mobile, tablet, desktop)
- **Interactive UI**: Hover effects, smooth transitions, and modern Material-UI design

### 🔐 Authentication System
- **User Registration**: Create new accounts with form validation
- **User Login**: Secure authentication with JWT tokens
- **User Roles**: Support for different user types (regular, business, admin)
- **Protected Routes**: Access control based on user authentication status

### 📋 Management Interface
- **Add Cards**: Business users can create new business cards
- **Edit Cards**: Modify existing card information
- **Delete Cards**: Remove cards from the system
- **Like System**: Users can favorite/unfavorite cards
- **My Cards**: Personal card management for business users

### 🎨 Design & UX
- **Clean Interface**: Modern and professional design
- **Loading States**: Smooth loading indicators and error handling
- **Snackbar Notifications**: User feedback for all actions
- **Empty States**: Informative messages when no content is available
- **Accessibility**: Tooltips, ARIA labels, and keyboard navigation

## 🛠️ Technologies Used

- **React 19.1.0** - Modern React with hooks and functional components
- **Material-UI 7.1.0** - Comprehensive React UI framework
- **React Router DOM 7.6.0** - Client-side routing
- **Axios 1.9.0** - HTTP client for API requests
- **Joi 17.13.3** - Schema validation for forms
- **JWT Decode 4.0.0** - JSON Web Token handling
- **Vite** - Fast development build tool
- **ESLint** - Code quality and consistency

## 📁 Project Structure

```
src/
├── App.jsx                  # Root application component
├── main.jsx                 # Entry point
├── cards/
│   └── components/
│       ├── BCard.jsx        # Business card component
│       ├── BCardBody.jsx    # Card content section
│       ├── BCardFooter.jsx  # Card actions section
│       └── BCards.jsx       # Cards grid with pagination
├── components/
│   ├── Form.jsx             # Generic form component
│   ├── FormButton.jsx       # Form button component
│   └── Input.jsx            # Input field component
├── hooks/
│   └── useForm.js           # Custom hook for form management
├── layout/
│   ├── Layout.jsx           # Main layout wrapper
│   ├── footer/
│   │   └── Footer.jsx       # Footer component
│   ├── header/
│   │   ├── Header.jsx       # Header component
│   │   └── HeaderLink.jsx   # Header navigation link
│   └── main/
│       └── Main.jsx         # Main content area
├── pages/
│   ├── AboutPage.jsx        # About page
│   ├── CardDetailsPage.jsx  # Card details page
│   ├── CardsPage.jsx        # Cards directory
│   ├── EditProfilePage.jsx  # Edit profile page
│   ├── ErrorPage.jsx        # Error page
│   ├── FavoriteCardsPage.jsx# User's favorite cards
│   ├── LoginPage.jsx        # User login page
│   ├── MyCardsPage.jsx      # User's cards management
│   ├── RegisterPage.jsx     # User registration page
│   ├── SandboxPage.jsx      # Development sandbox
│   └── UserProfilePage.jsx  # User profile page
├── providers/
│   ├── CustomThemeProvider.jsx # Theme provider
│   ├── SnackbarProvider.jsx    # Notification provider
│   └── UserProvider.jsx        # User state provider
├── routes/
│   ├── Router.jsx              # Main router setup
│   └── routesDict.js           # Route definitions
└── users/
    ├── components/
    │   ├── CreateCard.jsx      # Card creation form
    │   ├── LoginForm.jsx       # Login form
    │   └── RegisterForm.jsx    # Registration form
    ├── helpers/
    │   ├── initialForms/
    │   │   ├── initialLoginForm.js # Initial login form values
    │   │   └── initialSignupForm.js# Initial signup form values
    │   └── normalization/
    │       └── normalizeUser.js    # User data normalization
    ├── models/
    │   ├── createSchema.js         # Joi schema for card creation
    │   ├── loginSchema.js          # Joi schema for login
    │   └── signupSchema.js         # Joi schema for registration
    ├── providers/
    │   └── UserProvider.jsx        # User context provider
    └── services/
        └── localStorageService.js  # Local storage utilities
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd cards-proj-Boris
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Integration

The application integrates with a REST API for:
- User authentication and management
- Business card CRUD operations
- User preferences (likes/favorites)

**Base API URL**: `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/`

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 600px (xs)
- **Tablet**: 600-960px (sm)
- **Desktop**: 960-1280px (md)
- **Large Desktop**: > 1280px (lg)

## 🔒 Security Features

- JWT token-based authentication
- Protected routes based on user roles
- Form validation with Joi schemas
- Secure API communication
- Local storage management for user sessions

## 🎯 Future Enhancements

- [ ] Real-time notifications
- [ ] Advanced search filters
- [ ] Card categories and tags
- [ ] Export functionality
- [ ] Analytics dashboard
- [ ] Mobile app version

## 👨‍💻 Development

This project follows modern React best practices:
- Functional components with hooks
- Context API for state management
- Custom hooks for reusable logic
- Component composition patterns
- Clean code principles
- Responsive design patterns

## 📄 License

This project is developed as part of a full-stack development course and is intended for educational purposes.

---

**Note**: This application demonstrates modern web development techniques and serves as a comprehensive example of a React-based business management system.

## 📊 GitHub Stats

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=boris2024-spec&show_icons=true&theme=radical" alt="GitHub Stats" height="150"/>
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=boris2024-spec&layout=compact&theme=radical" alt="Top Langs" height="150"/>
</p>

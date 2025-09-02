<div align="center">

[🌐 Live Demo](https://cards-proj-boris-main.vercel.app)

# Business Card Manager (React + MUI)

Modern React application to manage, browse and favorite business cards. Responsive UI, role‑based access, form validation, and clean architecture.

</div>

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

## 🛠️ Tech Stack

- **React 19.1.0** – Functional components + hooks
- **MUI 7.1.0 (@mui/material + @emotion)** – UI components & theming
- **React Router DOM 7.6.0** – Client routing
- **Axios ^1.10.0** – HTTP client
- **Joi 17.13.3** – Schema validation
- **jwt-decode 4.0.0** – Token parsing
- **Vite 6** – Dev/build tooling (ESM, fast HMR)
- **ESLint 9** – Linting & consistency
- **PropTypes** – Runtime prop validation (lightweight safety)

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
- Node.js **18+** (recommended 20 LTS) – Vite 6 / React 19 require at least 18
- npm (bundled with Node) or pnpm/yarn (optional)

### Installation

1. **Clone the repository**
   ```powershell
   git clone <REPO_URL>
   cd cards-proj-Boris-main
   ```

2. **Install dependencies**
   ```powershell
   npm install
   ```

3. **Environment variables (create before first run)** – see section

4. **Start development server**
   ```powershell
   npm run dev
   ```

5. **Open in browser** → http://localhost:5173

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Integration

The app communicates with a REST API layer for:
- Authentication & user lifecycle
- Business card CRUD
- Favorites (likes)

Base URL is injected via environment variable (see below) instead of hard‑coding.

## 📱 Responsive Design

MUI breakpoint system:
- xs: <600px (mobile)
- sm: 600–960px (tablet)
- md: 960–1280px (small desktop)
- lg: 1280–1920px (desktop)
- xl: >1920px (wide)

## 🔒 Security Notes

- JWT (stored in localStorage) – simple implementation; be aware of XSS risks
- Role‑based protected routes (guards) 
- Joi validation on submit (client-side)
- Axios instance (planned: add interceptors for 401 refresh / global error)
- Potential future enhancement: move to httpOnly cookies + CSRF token

⚠️ Since tokens live in `localStorage`, any injected script could access them. Mitigate via strict Content Security Policy & sanitization.

## 🧩 Environment Variables

Create a `.env` file in project root (already included in .gitignore):

```
VITE_API_URL=https://bcard-ojqa.onrender.com
```

An `.env.example` file is provided as a template. Copy it to create your own `.env` file:

```bash
cp .env.example .env
```

Then replace the placeholder URL with the actual API URL.

For production deployment, the API URL is encoded in the code as a fallback if environment variables are not available, ensuring the application works in all environments.

Usage in code:
```js
// userApiServicece.js (example)
const encodedURL = "aHR0cHM6Ly9iY2FyZC1vanFhLm9ucmVuZGVyLmNvbQ=="; // Base64 encoded URL
const decodeURL = (encoded) => atob(encoded);

export const API_BASE_URL = import.meta.env.VITE_API_URL || decodeURL(encodedURL);
```

Do NOT commit secrets. For different stages (preview / prod) configure environment in the hosting platform (e.g. Vercel project settings).

## 🎯 Roadmap / Future Enhancements

Legend: 🔼 high impact · 🧪 experimental · 🕒 backlog

- [ ] Advanced search filters (city/tag) 🔼
- [ ] Real-time notifications (WebSocket) 🧪
- [ ] Card categories & tags 🔼
- [ ] Export (PDF / CSV) 🕒
- [ ] Analytics dashboard (engagement) 🕒
- [ ] Optimistic UI for likes 🧪
- [ ] Image upload service (cloud storage) 🔼
- [ ] Mobile app (React Native / Expo) 🕒

## 👨‍💻 Architecture & Patterns

- Layered: pages (routing) → components (UI) → hooks (logic) → services (IO)
- Context Providers: User, Theme, Snackbar
- Validation layer: per‑form Joi schemas
- Reusability: generic `Form`, `Input`, controlled via custom `useForm`
- Future: extract Axios instance & interceptors; introduce error boundary

### Adding a New Page (quick recipe)
1. Create `YourPage.jsx` under `src/pages`
2. Add route in `routes/routesDict.js`
3. Register in `Router.jsx`
4. (Optional) Link via `HeaderLink.jsx`

## 🤝 Contributing

1. Fork & create feature branch: `feat/short-description`
2. Install deps: `npm ci` (or `npm install` first time)
3. Run dev + make changes
4. Lint before commit: `npm run lint -- --fix`
5. Open PR with concise description & screenshots (if UI changes)

### Coding Guidelines
- Keep components small & focused
- Prefer composition over prop drilling
- Centralize side effects (services / providers)
- Avoid premature optimization; measure first

## 🧪 Testing (Planned)

Test stack (proposed): Vitest + @testing-library/react
Initial priorities:
- Render critical pages without crash
- Form validation edge cases
- Protected route redirects

## 📄 License

Educational / training project. If reusing code publicly, attribute the original author. (Optionally add an SPDX license like MIT if distribution broadens.)

---

**Note**: This application demonstrates modern web development techniques and serves as a comprehensive example of a React-based business card management system.

## 📊 Optional GitHub Stats (Display Only)

<details>
<summary>Show stats images</summary>

<p align="center">
   <img src="https://github-readme-stats.vercel.app/api?username=boris2024-spec&show_icons=true&theme=radical" alt="GitHub Stats" height="150" />
   <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=boris2024-spec&layout=compact&theme=radical" alt="Top Langs" height="150" />
</p>

</details>

---

Made with ❤️ using React 19 & MUI 7.

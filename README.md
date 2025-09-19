# Becoming - Visual Habit Tracker

A beautiful and inspiring habit tracking application that uses a brain visualization with 90 interactive cells to help users build habits, create routines, and transform their lifestyle over 90 days.

## 🧠 Features

- **Interactive Brain Visualization**: 90 clickable cells representing your habit journey
- **Color-Coded Progress**: Visual feedback with customizable colors for completed habits
- **Multiple Templates**: Create and manage different habit templates
- **Background Customization**: Choose colors or upload images for personalized backgrounds
- **Progress Tracking**: Monitor your streaks, completion rates, and overall progress
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Works beautifully on desktop and mobile devices

## 🚀 Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for smooth animations
- **React Colorful** for color picking
- **Lucide React** for icons
- **Clerk** for authentication (optional)

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Express Validator** for input validation

## 📁 Project Structure

```
becoming-habit-tracker/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Utility functions
│   │   └── App.tsx         # Main application component
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── backend/                 # Express.js backend API
│   ├── config/             # Database and app configuration
│   ├── models/             # MongoDB/Mongoose models
│   ├── routes/             # API route handlers
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Backend utility functions
│   └── server.js           # Main server file
└── package.json            # Root package.json with scripts
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd becoming-habit-tracker
```

### 2. Install all dependencies
```bash
npm run install:all
```

### 3. Set up environment variables
Create a `.env` file in the `backend` directory:
```bash
cp backend/.env.example backend/.env
```

Edit the `.env` file with your configuration:
```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/becoming
JWT_SECRET=your-super-secret-jwt-key
```

### 4. Start the development servers
```bash
npm run dev
```

This will start both the frontend (http://localhost:5173) and backend (http://localhost:5000) servers concurrently.

## 🎯 Usage

1. **Register/Login**: Create an account or sign in to access your habit templates
2. **Create Templates**: Add new habit templates with custom names and categories
3. **Track Progress**: Click on brain cells to mark habits as complete
4. **Customize**: Change colors, backgrounds, and personalize your experience
5. **Monitor Growth**: View your progress, streaks, and completion statistics

## 🔧 Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build the frontend for production
- `npm run start` - Start the backend server
- `npm run install:all` - Install dependencies for all packages

### Frontend Only
- `cd frontend && npm run dev` - Start frontend development server
- `cd frontend && npm run build` - Build frontend for production
- `cd frontend && npm run lint` - Run ESLint

### Backend Only
- `cd backend && npm run dev` - Start backend with nodemon
- `cd backend && npm start` - Start backend server

## 🎨 Customization

The app supports extensive customization:
- **Colors**: Use the built-in color picker to customize cell colors
- **Backgrounds**: Upload images or choose solid colors for backgrounds
- **Templates**: Create multiple templates for different habits
- **Categories**: Organize habits by categories (health, productivity, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the concept of neuroplasticity and habit formation
- Built with modern web technologies for optimal performance
- Designed to be visually appealing and motivating for users

---

**Start your transformation journey today! 🚀**

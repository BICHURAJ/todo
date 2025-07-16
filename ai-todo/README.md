# 🧠 AI Todo App

A professional, full-stack todo application built with React, TypeScript, Tailwind CSS, Node.js, Express, and MongoDB.

## ✨ Features

- **Modern UI**: Clean, professional design with Tailwind CSS
- **Full-Stack**: React frontend with Node.js/Express backend
- **Database**: MongoDB integration for persistent data storage
- **TypeScript**: Full type safety across frontend and backend
- **Real-time**: Instant updates with API integration
- **Priority System**: High, medium, low priority levels
- **Responsive**: Works on desktop and mobile devices

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### 1. Clone and Setup

```bash
# Navigate to the project directory
cd ai-todo

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. MongoDB Setup

#### Option A: Local MongoDB
1. Install MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. The app will connect to `mongodb://localhost:27017/ai-todo`

#### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

### 3. Start the Application

#### Terminal 1 - Backend Server
```bash
cd backend
npm run dev
```

The backend will start on `http://localhost:5000`

#### Terminal 2 - Frontend Development Server
```bash
# In the main ai-todo directory
npm start
```

The frontend will start on `http://localhost:3000`

## 📁 Project Structure

```
ai-todo/
├── src/                    # React frontend
│   ├── components/         # React components
│   ├── services/          # API services
│   └── App.tsx           # Main app component
├── backend/               # Node.js backend
│   ├── src/
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # Express routes
│   │   └── server.ts     # Main server file
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo
- `PATCH /api/todos/:id/toggle` - Toggle todo completion
- `GET /health` - Health check

## 🎨 UI Features

- **Gradient Background**: Modern slate gradient
- **Card Design**: Clean white cards with shadows
- **Priority Indicators**: Color-coded left borders
- **Loading States**: Spinner animations
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Works on all screen sizes

## 🛠️ Development

### Frontend Development
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

### Backend Development
```bash
cd backend
npm run dev        # Start with nodemon
npm run build      # Build TypeScript
npm start          # Start production server
```

## 🔮 Future Features

- [ ] User authentication and authorization
- [ ] AI-powered task suggestions
- [ ] Due date management
- [ ] Task categories and tags
- [ ] Dark mode toggle
- [ ] Real-time collaboration
- [ ] Mobile app (React Native)
- [ ] Advanced analytics and insights

## 🐛 Troubleshooting

### Backend Connection Issues
- Ensure MongoDB is running
- Check your connection string in `.env`
- Verify the backend server is running on port 5000

### Frontend Issues
- Clear browser cache
- Check if backend is accessible at `http://localhost:5000`
- Verify all dependencies are installed

### Common Errors
- **"Failed to load todos"**: Backend server not running
- **"MongoDB connection error"**: MongoDB not started or wrong connection string
- **"Module not found"**: Run `npm install` in both directories

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

**Built with ❤️ using React, TypeScript, Tailwind CSS, Node.js, Express, and MongoDB**

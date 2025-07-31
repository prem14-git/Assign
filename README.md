# Wellness Session Manager

A full-stack web application for managing wellness sessions with user authentication, session creation, and publishing capabilities. Built with React frontend and Node.js backend with MongoDB database.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Session Management**: Create, edit, and manage wellness sessions
- **Draft System**: Save sessions as drafts before publishing
- **Public Sessions**: View published sessions from all users
- **Modern UI**: Built with React and Tailwind CSS
- **Real-time Updates**: Auto-save functionality for session drafts (after every 5 sec)

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **dotenv** - Environment variables

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Vite** - Build tool

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Assign
```

### 2. Environment Setup

#### Backend Environment
1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a `.env` file:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/wellness
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=2h
```

#### Frontend Environment
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Create a `.env` file:
```bash
cp .env.example .env
```

3. Update the `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
VITE_API_TIMEOUT=5000
```

### 3. Install Dependencies

#### Backend Dependencies
```bash
cd backend
npm install
```

#### Frontend Dependencies
```bash
cd frontend
npm install
```

### 4. Start the Application

#### Start Backend Server
```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5000`

#### Start Frontend Development Server
```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

### 5. Access the Application

Open your browser and navigate to `http://localhost:5173`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully."
}
```

#### Login User
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Logout User
```http
POST /auth/logout
```

**Response:**
```json
{
  "message": "Logged out successfully. Please remove token on client."
}
```

### Session Endpoints

#### Get Public Sessions
```http
GET /sessions
```

**Response:**
```json
[
  {
    "_id": "session_id",
    "title": "Morning Yoga Session",
    "tags": ["yoga", "morning"],
    "json_file_url": "https://example.com/session.json",
    "status": "published",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Get My Sessions (Protected)
```http
GET /my-sessions
Authorization: Bearer <jwt_token>
```

**Response:**
```json
[
  {
    "_id": "session_id",
    "user_id": "user_id",
    "title": "My Wellness Session",
    "tags": ["wellness", "meditation"],
    "json_file_url": "https://example.com/session.json",
    "status": "draft",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Get My Session by ID (Protected)
```http
GET /my-sessions/:id
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "_id": "session_id",
  "user_id": "user_id",
  "title": "My Wellness Session",
  "tags": ["wellness", "meditation"],
  "json_file_url": "https://example.com/session.json",
  "status": "draft",
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

#### Save Draft Session (Protected)
```http
POST /my-sessions/save-draft
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "sessionId": "optional_session_id_for_update",
  "title": "Session Title",
  "tags": ["tag1", "tag2"],
  "json_file_url": "https://example.com/session.json"
}
```

**Response:**
```json
{
  "message": "Draft created successfully (auto-saved).",
  "session": {
    "_id": "session_id",
    "user_id": "user_id",
    "title": "Session Title",
    "tags": ["tag1", "tag2"],
    "json_file_url": "https://example.com/session.json",
    "status": "draft",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Publish Session (Protected)
```http
POST /my-sessions/publish
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "sessionId": "session_id_to_publish"
}
```

**Response:**
```json
{
  "_id": "session_id",
  "user_id": "user_id",
  "title": "Session Title",
  "tags": ["tag1", "tag2"],
  "json_file_url": "https://example.com/session.json",
  "status": "published",
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

#### Delete Session (Protected)
```http
DELETE /my-sessions/:id
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "message": "Session deleted successfully."
}
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

## 📁 Project Structure

```
Assign/
├── backend/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── session.controller.js
│   ├── middlewares/
│   │   └── auth.middleware.js
│   ├── models/
│   │   ├── session.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── auth.route.js
│   │   └── session.route.js
│   ├── index.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── .env
└── README.md
```

## 🗄️ Database Schema

### User Model
```javascript
{
  email: String (required, unique),
  password_hash: String (required),
  created_at: Date
}
```

### Session Model
```javascript
{
  user_id: ObjectId (ref: User, required),
  title: String (required),
  tags: [String],
  json_file_url: String (required),
  status: String (enum: ["draft", "published"], default: "draft"),
  created_at: Date,
  updated_at: Date
}
```

## 🚀 Deployment

### Backend Deployment
1. Set up your production environment variables
2. Deploy to your preferred hosting service (Heroku, Railway, etc.)
3. Ensure MongoDB is properly configured

### Frontend Deployment
1. Build the production version:
```bash
cd frontend
npm run build
```
2. Deploy the `dist` folder to your hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues or have questions, please open an issue in the repository. 

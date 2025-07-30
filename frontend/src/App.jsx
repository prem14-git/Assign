import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MySessions from "./pages/MySessions.jsx";
import SessionEditor from "./pages/SessionEditor.jsx";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/my-sessions" element={<PrivateRoute><MySessions /></PrivateRoute>} />
        <Route path="/session-editor" element={<PrivateRoute><SessionEditor /></PrivateRoute>} />
        <Route path="/session-editor/:id" element={<PrivateRoute><SessionEditor /></PrivateRoute>} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;

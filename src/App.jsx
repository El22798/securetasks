import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AuthProvider, { useAuth } from './context/AuthContext'
import ThemeProvider from './context/ThemeContext'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

function PrivateRoute({ children }){
  const { user } = useAuth()
  if(!user) return <Navigate to="/login" replace />
  return children
}

export default function App(){
  return (
    <ThemeProvider>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
}

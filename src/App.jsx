import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Import pages
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import CourseCatalog from './pages/CourseCatalog'
import LearningPath from './pages/LearningPath'
import RequestPath from './pages/RequestPath'
import Profile from './pages/Profile'
import LearningJourney from './pages/LearningJourney'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setIsAuthenticated(true)
    setUser(userData)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
            <Navigate to="/dashboard" /> : 
            <LandingPage onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? 
            <Dashboard user={user} onLogout={handleLogout} /> : 
            <Navigate to="/" />
          } 
        />
        <Route 
          path="/catalog" 
          element={
            isAuthenticated ? 
            <CourseCatalog user={user} onLogout={handleLogout} /> : 
            <Navigate to="/" />
          } 
        />
        <Route 
          path="/learning/:pathId" 
          element={
            isAuthenticated ? 
            <LearningPath user={user} onLogout={handleLogout} /> : 
            <Navigate to="/" />
          } 
        />
        <Route 
          path="/request" 
          element={
            isAuthenticated ? 
            <RequestPath user={user} onLogout={handleLogout} /> : 
            <Navigate to="/" />
          } 
        />
        <Route 
          path="/journey" 
          element={
            isAuthenticated ? 
            <LearningJourney user={user} onLogout={handleLogout} /> : 
            <Navigate to="/" />
          } 
        />
        <Route 
          path="/profile" 
          element={
            isAuthenticated ? 
            <Profile user={user} onLogout={handleLogout} /> : 
            <Navigate to="/" />
          } 
        />
      </Routes>
    </Router>
  )
}

export default App


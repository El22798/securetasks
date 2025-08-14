import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

export default function Navbar(){
  const { user, logout } = useAuth()
  const { theme, toggle } = useTheme()
  const nav = useNavigate()

  return (
    <div className="card" style={{marginBottom:16}}>
      <div className="header">
        <div style={{display:'flex',gap:10,alignItems:'center'}}>
          <Link to="/"><strong>SecureTasks</strong></Link>
          <span className="small">Productive & Secure</span>
        </div>
        <div className="row" style={{alignItems:'center'}}>
          <div className="theme-toggle small">
            <label>Theme</label>
            <button className="btn" onClick={toggle}>{theme === 'dark' ? 'Light' : 'Dark'}</button>
          </div>
          {user ? (
            <>
              <span className="badge">Hi, {user.name || user.email}</span>
              <button className="btn" onClick={()=>{ logout(); nav('/login') }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn">Login</Link>
              <Link to="/register" className="btn primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

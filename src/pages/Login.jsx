import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login(){
  const { login } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    const ok = await login(email, password)
    if(!ok) { setErr('Invalid credentials'); return }
    nav('/')
  }

  return (
    <div className="container">
      <div className="card" style={{maxWidth:420, margin:'40px auto'}}>
        <h2>Login</h2>
        <form onSubmit={submit} style={{display:'grid', gap:10}}>
          <input className="input" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          {err && <div className="small" style={{color:'#dc2626'}}>{err}</div>}
          <button className="btn primary" type="submit">Login</button>
          <div className="small">No account? <Link to="/register">Register</Link></div>
        </form>
      </div>
    </div>
  )
}

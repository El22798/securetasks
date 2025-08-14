import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register(){
  const { register } = useAuth()
  const nav = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    try {
      await register(name, email, password)
      nav('/')
    } catch (e) {
      setErr(e.message)
    }
  }

  return (
    <div className="container">
      <div className="card" style={{maxWidth:460, margin:'40px auto'}}>
        <h2>Create account</h2>
        <form onSubmit={submit} style={{display:'grid', gap:10}}>
          <input className="input" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
          <input className="input" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          {err && <div className="small" style={{color:'#dc2626'}}>{err}</div>}
          <button className="btn primary" type="submit">Register</button>
          <div className="small">Have an account? <Link to="/login">Login</Link></div>
        </form>
      </div>
    </div>
  )
}

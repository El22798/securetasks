import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }){
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('st_user')) } catch { return null }
  })

  useEffect(()=>{
    if(user) localStorage.setItem('st_user', JSON.stringify(user))
    else localStorage.removeItem('st_user')
  }, [user])

  const login = async (email, password) => {
    const raw = localStorage.getItem('st_users')
    const users = raw ? JSON.parse(raw) : []
    const found = users.find(u => u.email === email && u.password === password)
    if(found){ setUser({ email: found.email, name: found.name || 'User' }); return true }
    return false
  }

  const register = async (name, email, password) => {
    const raw = localStorage.getItem('st_users')
    const users = raw ? JSON.parse(raw) : []
    if(users.some(u => u.email === email)) throw new Error('Email already registered')
    users.push({ name, email, password })
    localStorage.setItem('st_users', JSON.stringify(users))
    setUser({ email, name })
    return true
  }

  const logout = () => setUser(null)

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>
}

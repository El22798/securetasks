import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { load, save } from '../utils/storage'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import FilterBar from '../components/FilterBar'

export default function Dashboard(){
  const { user } = useAuth()
  const nav = useNavigate()
  const [items, setItems] = useState(()=> load('st_todos', []))
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('all')
  const [sort, setSort] = useState('new')
  const [minPriority, setMinPriority] = useState(1)

  useEffect(()=>{ save('st_todos', items) }, [items])
  useEffect(()=>{ if(!user) nav('/login') }, [user, nav])

  const add = (t) => setItems(prev => [{ id: crypto.randomUUID(), createdAt: Date.now(), done:false, ...t }, ...prev])
  const toggle = (id) => setItems(prev => prev.map(it => it.id === id ? ({...it, done: !it.done}) : it))
  const remove = (id) => setItems(prev => prev.filter(it => it.id !== id))
  const onEdit = (id) => {
    const title = prompt('Update title')
    if(title === null) return
    const notes = prompt('Update notes (HTML allowed, will be sanitized)') || ''
    const due = prompt('Update due date (YYYY-MM-DD) or leave empty') || ''
    const priority = Number(prompt('Priority (1-5)') || 3)
    setItems(prev => prev.map(it => it.id === id ? ({...it, title, notes, due, priority}) : it))
  }

  const filtered = useMemo(()=>{
    let list = [...items]
    if(q) list = list.filter(it => it.title.toLowerCase().includes(q.toLowerCase()))
    if(status !== 'all') list = list.filter(it => status === 'done' ? it.done : !it.done)
    list = list.filter(it => it.priority >= minPriority)
    if(sort === 'new') list.sort((a,b)=> b.createdAt - a.createdAt)
    if(sort === 'old') list.sort((a,b)=> a.createdAt - b.createdAt)
    if(sort === 'due') list.sort((a,b)=> (a.due||'9999-99-99').localeCompare(b.due||'9999-99-99'))
    if(sort === 'prio') list.sort((a,b)=> b.priority - a.priority)
    return list
  }, [items, q, status, sort, minPriority])

  return (
    <div className="container">
      <div className="header">
        <h1>Dashboard</h1>
        <div className="small">{items.filter(i=>!i.done).length} open • {items.filter(i=>i.done).length} done</div>
      </div>
      <TodoForm onAdd={add} />
      <FilterBar q={q} setQ={setQ} status={status} setStatus={setStatus} sort={sort} setSort={setSort} minPriority={minPriority} setMinPriority={setMinPriority} />
      <TodoList items={filtered} onToggle={toggle} onRemove={remove} onEdit={onEdit} />
      <footer>SecureTasks • Vite + React • LocalStorage</footer>
    </div>
  )
}

import React, { useState } from 'react'
import { sanitize } from '../utils/sanitize'

export default function TodoForm({ onAdd }){
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const [due, setDue] = useState('')
  const [priority, setPriority] = useState(3)

  const submit = (e) => {
    e.preventDefault()
    if(!title.trim()) return
    onAdd({
      title: sanitize(title.trim()),
      notes: sanitize(notes.trim()),
      due: due || null,
      priority: Number(priority)
    })
    setTitle(''); setNotes(''); setDue(''); setPriority(3)
  }

  return (
    <form className="card" onSubmit={submit} style={{display:'grid', gap:8}}>
      <input className="input" placeholder="Task title" value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea className="input" placeholder="Notes (optional)" rows={3} value={notes} onChange={e=>setNotes(e.target.value)} />
      <div className="row" style={{alignItems:'center'}}>
        <input className="input" type="date" value={due||''} onChange={e=>setDue(e.target.value)} />
        <select className="input" value={priority} onChange={e=>setPriority(e.target.value)}>
          {[1,2,3,4,5].map(n=> <option key={n} value={n}>Priority {n}</option>)}
        </select>
        <button className="btn primary" type="submit">Add Task</button>
      </div>
    </form>
  )
}

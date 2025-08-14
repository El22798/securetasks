import React from 'react'

export default function FilterBar({ q, setQ, status, setStatus, sort, setSort, minPriority, setMinPriority }){
  return (
    <div className="toolbar card">
      <input className="input" placeholder="Search tasks..." value={q} onChange={e=>setQ(e.target.value)} />
      <select className="input" value={status} onChange={e=>setStatus(e.target.value)}>
        <option value="all">All</option>
        <option value="open">Open</option>
        <option value="done">Done</option>
      </select>
      <select className="input" value={sort} onChange={e=>setSort(e.target.value)}>
        <option value="new">Newest</option>
        <option value="old">Oldest</option>
        <option value="due">Due date</option>
        <option value="prio">Priority</option>
      </select>
      <select className="input" value={minPriority} onChange={e=>setMinPriority(Number(e.target.value))}>
        {[1,2,3,4,5].map(n => <option key={n} value={n}>Min Prio {n}</option>)}
      </select>
    </div>
  )
}

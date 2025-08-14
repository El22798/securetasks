import React from 'react'
import { v4 as uuid } from 'uuid'

export default function TodoList({ items, onToggle, onRemove, onEdit }){
  if(items.length === 0) return <div className="card small">No tasks found.</div>

  return (
    <div className="list">
      {items.map(item => (
        <div className="item" key={item.id || (item.id = uuid())}>
          <input type="checkbox" checked={!!item.done} onChange={()=>onToggle(item.id)} />
          <div className="item-head">
            <div>
              <div style={{fontWeight:600, textDecoration: item.done ? 'line-through' : 'none'}}>{item.title}</div>
              {item.notes ? <div className="small" dangerouslySetInnerHTML={{__html: item.notes}} /> : null}
              <div className="kv">
                <span className="chip">Priority {item.priority}</span>
                {item.due ? <span className="chip">Due {item.due}</span> : null}
              </div>
            </div>
            <div className="row">
              <button className="btn warn" onClick={()=>onEdit(item.id)}>Edit</button>
              <button className="btn danger" onClick={()=>onRemove(item.id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

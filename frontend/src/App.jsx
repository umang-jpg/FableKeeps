import { useState } from 'react'

import './App.css'


function App() {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  return (
    <div className="keep">
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="title"

      />
      <p>{title}</p>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="so here's what happened today...."
      />
      <p>{content}</p>



    </div>)
}

export default App

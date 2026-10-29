import { useState } from 'react'

import './App.css'


function App() {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  return (
    <div className="keep">
      <input
        className="keep-title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="title"

      />

      <textarea
        className="keep-body"
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Dear diary...."
      />




    </div>)
}

export default App

import { useState } from 'react'

import './App.css'


function App() {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [keepId, setKeepId] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [showSaved, setShowSaved] = useState(false)
  const [error, setError] = useState(null)        // { code, message } for the 422 popup
  const [serverDown, setServerDown] = useState(false)  // true = full-page error

  async function handleSave() {
    setIsSaving(true)
    setError(null)
    try {
      const response = await fetch('http://localhost:8000/keeps/', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ title, content }),

      })


      if (!response.ok) {

        if (response.status === 422) {
          setError({ code: response.status })
        }

        else {
          setServerDown(true)
        }
        return
      }

      const saved = await response.json()
      setKeepId(saved.id)
      setShowSaved(true)
      setTimeout(() => setShowSaved(false), 2000)
    }
    catch (err) {
      console.log('caught:', err.name, err.message, err.stack)
      setServerDown(true)
    }
    finally {
      setIsSaving(false)
    }
  }

  if (serverDown) {
    return (
      <div className="server-down">
        <h1>something went wrong on our end</h1>
        <p>your keep couldnt be saved.please try again later :(</p>
      </div>)

  }
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
      <button onClick={handleSave} disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save'}
      </button>

      {showSaved && <p>saved ✓</p>}

      {error && (
        <div className="popup">
          we couldn't save the keep at this moment due to error {error.code}. please try again after some time.
        </div>
      )}



    </div>)
}

export default App

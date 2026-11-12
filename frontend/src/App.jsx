import { useState } from 'react'
import { useRef } from 'react'
import { useLayoutEffect } from 'react'

import './App.css'


const keeps = [
  {
    id: 1,
    title: 'October 28th',
    content: 'Short day. Woke up late, finished the CN assignment, and spent the evening reading. Nothing big, but it felt good to slow down.',
  },
  {
    id: 2,
    title: 'October 29th',
    content: 'Long day, so I am writing more than usual. Viva practical was tomorrow, and I kept thinking about everything I had not prepared. Kiran and I walked to the canteen after lunch and talked about what we would do after college. Somehow the conversation turned to home, to the trains we miss, and to the small things we will miss when we leave. By evening I had written three pages of notes in my head and none on paper. I want to remember this feeling of being unprepared but calm, because it will probably not come back again in the same way. Tomorrow I will either panic or surprise myself, and I am curious which one it will be. For now the notebook is open and the pen is in my hand, which is enough to end the day on.',
  },
  {
    id: 3,
    title: 'October 30th',
    content: 'Viva done before 1pm. Kendy and Bhagu did not do well after prelims, so we spent the afternoon cheering them up. Tomorrow is a holiday.',
  },
]

function App() {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [keepId, setKeepId] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [showSaved, setShowSaved] = useState(false)
  const [error, setError] = useState(null)        // { code, message } for the 422 popup
  const [serverDown, setServerDown] = useState(false)  // true = full-page error
  const measureRef = useRef(null)
  async function handleSave() {
    setIsSaving(true)
    setError(null)
    let endpoint;
    let method;

    if (keepId === null) {
      endpoint = 'http://localhost:8000/keeps/';
      method = 'POST';
    }
    else {
      endpoint = `http://localhost:8000/keeps/${keepId}`;
      method = 'PUT';
    }

    try {
      const response = await fetch(endpoint, {
        method: method,
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

  useLayoutEffect(() => {
    const p = measureRef.current.querySelector('p');
    const original = p.textContent;
    const lpage = document.querySelector('.keep');

    const style = getComputedStyle(lpage);

    const clientHeight = lpage.clientHeight;
    const paddingTop = parseFloat(style.paddingTop);
    const paddingBottom = parseFloat(style.paddingBottom);

    const usable = clientHeight - paddingTop - paddingBottom
    console.log(usable)
    for (const keep of keeps) {
      p.textContent = keep.content;
      const height = measureRef.current.scrollHeight;
      console.log(keep.title, height);

    }

    p.textContent = original;
  }, []);




  function handleContentChange(e) {
    const textarea = e.target;
    setContent(e.target.value)
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
  return (







    <div className="spread">


      <div className=" measure" ref={measureRef}>

        <p>Effects are code that runs because something happened to the component, not as part of drawing it. useLayoutEffect is an effect that runs after React has put the elements into the DOM, but before the browser paints the screen.

          Why that matters for measuring: the browser calculates sizes during layout. If you measure too early, the element doesn’t exist yet. If you measure after paint, the user may briefly see the wrong content. useLayoutEffect gives you the correct, already-laid-out size, with no flicker.</p>
      </div>
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
          onChange={handleContentChange}
          placeholder='Dear Diary....'

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




      </div>
      <div className="keep page-right">
        {keeps.map(keep => (<div key={keep.id}>
          <h3>{keep.title}</h3>
          <p>{keep.content}</p>
        </div>))}

      </div>




    </div>)




}

export default App

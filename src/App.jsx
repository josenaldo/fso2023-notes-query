import React from 'react'
import { useQuery } from 'react-query'
import { getNotes } from './requests'

import './App.css'

const App = () => {
  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    console.log(content)
  }

  const toggleImportance = (note) => {
    console.log('toggle importance of', note.id)
  }

  const result = useQuery('notes', getNotes)

  console.log('🔴', result)

  if (result.isLoading) {
    return <div>Loading data...</div>
  }

  const notes = result.data

  return (
    <div className="container">
      <main>
        <h2>Notes app</h2>

        <form onSubmit={addNote}>
          <input name="note" />
          <button type="submit">add</button>
        </form>

        <ul>
          {notes.map((note) => (
            <li key={note.id} onClick={() => toggleImportance(note)}>
              {note.content}
              <strong> {note.important ? 'important' : ''}</strong>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App

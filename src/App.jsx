import React from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getNotes, createNote, updateNote } from './requests'

import './App.css'

const App = () => {
  const queryClient = useQueryClient()

  const newNOteMutation = useMutation(createNote, {
    onSuccess: () => {
      queryClient.invalidateQueries('notes')
    },
  })

  const updateNoteMutation = useMutation(updateNote, {
    onSuccess: () => {
      queryClient.invalidateQueries('notes')
    },
  })

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    newNOteMutation.mutate({ content, important: true })
  }

  const toggleImportance = (note) => {
    updateNoteMutation.mutate({ ...note, important: !note.important })
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

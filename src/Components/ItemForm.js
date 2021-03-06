import { useState } from 'react'

export default function ItemForm({events: {addItemConfirm, editItemConfirm, hideForm}, formValues: {id, text}}) {
  const [value, setValue] = useState(text || '')
  const editing = id !== undefined

  return (
    <form>
      <input 
        name="text"
        id="text"
        placeholder="Enter item"
        defaultValue={text}
        value={value}
        onChange={event => setValue(event.target.value)}
      ></input>
      {editing && <button
        onClick={(event) => editItemConfirm(event, {
          text: document.getElementById('text').value,
          id: id
        })}
        disabled={value === ''}
      >Save</button>}
      
      {!editing && <button
        onClick={(event) => addItemConfirm(event, {
          text: document.getElementById('text').value
        })}
        disabled={value === ''}
      >Add</button>}
      <button onClick={hideForm}>Close</button>
    </form>
  )
}

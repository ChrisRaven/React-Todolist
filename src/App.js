import React, { useEffect, useState, useReducer } from 'react'
import Item from './Components/Item'
import ItemForm from './Components/ItemForm'

// Source: https://www.youtube.com/watch?v=kK_Wqx3RnHk
const ACTIONS = {
  ADD: 'add',
  EDIT: 'edit',
  REMOVE: 'remove',
  READ_FROM_STORAGE: 'read-from-storage'
}

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.READ_FROM_STORAGE:
      return action.payload
    case ACTIONS.ADD:
      return [...todos, action.payload]
    case ACTIONS.EDIT:
      return todos.map(todo => (
        todo.id === action.payload.id ? {...todo, text: action.payload.text} : todo
      ))
    case ACTIONS.REMOVE:
      return todos.filter(todo => todo.id !== action.payload.id)
    default:
      return todos
  }
}


export default function App() {
  const [formVisible, setFormVisible] = useState(false)
  const [formValues, setFormValues] = useState({})
  const [highestId, setHighestId] = useState(0)
  const [rows, setRows] = useState([])

  const [todos, dispatch] = useReducer(reducer, [])


  useEffect(() => {
    setHighestId(prevHighestId => prevHighestId + 1)
  }, [todos])

  useEffect(() => {
    const entries = JSON.parse(localStorage.getItem('todos') || '[]')
    dispatch({type: ACTIONS.READ_FROM_STORAGE, payload: entries})
    const ids = entries.map(entry => entry.id)
    const maxId = Math.max(...ids)
    setHighestId(maxId && maxId !== -Infinity ? maxId + 1 : 0)
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
    showItems()
  }, [todos]) // eslint-disable-line


  function showForm(values) {
    setFormVisible(true)
  }

  function hideForm() {
    setFormVisible(false)
  }

  function addItem() {
    setFormValues({})
    showForm()
  }

  function addItemConfirm(event, item) {
    const newItem = {
      text: item.text,
      id: highestId
    }

    dispatch({type: ACTIONS.ADD, payload: newItem})
    hideForm()
  }

  function editItem(event, id) {
    let item = todos.filter(item => item.id === id)
    setFormValues(...item)
    showForm()
  }

  function editItemConfirm(event, newItem) {
    dispatch({type: ACTIONS.EDIT, payload: newItem})
    hideForm()
  }
  
  function removeItem(event, id) {
    dispatch({type: ACTIONS.REMOVE, payload: { id: id } })
  }

  function showItems() {
    setRows(todos.map(todo => <Item
      key={todo.id}
      values={todo}
      events={{removeItem, editItem}}
    />))
  }


  return (
    <div>
      <button onClick={addItem}>Add Item</button>
      {rows}
      {formVisible && <ItemForm events={{addItemConfirm, editItemConfirm, hideForm}} formValues={formValues} />}
    </div>
  )
}



// TODO
// styling

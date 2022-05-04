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


let actions = {
  Add: class {
    constructor(todos, action) {
      this.todos = todos
      this.action = action
    }

    act() {
      return [...this.todos, this.action.payload] 
    }
  },

  ReadFromStorage: class {
    constructor(todos, action) {
      this.todos = todos
      this.action = action
    }

    act() {
      return this.action.payload
    }
  },

  Edit: class {
    constructor(todos, action) {
      this.todos = todos
      this.action = action
    }

    act() {
      return this.todos.map(todo => (
        todo.id === this.action.payload.id ? {...todo, text: this.action.payload.text} : todo
      ))
    }
  },

  Remove: class {
    constructor(todos, action) {
      this.todos = todos
      this.action = action
    }

    act() {
      return this.todos.filter(todo => todo.id !== this.action.payload.id)
    }
  }
}


function reducer(todos, action) {
  let words = action.type.split('-')
  let className = words.map(word => word[0].toUpperCase() + word.slice(1)).join('')

  return (new actions[className](todos, action)).act()
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
      <h1>My Todo list</h1>
      <button onClick={addItem} className="add-item">Add Item</button>
      {rows}
      {formVisible && <ItemForm events={{addItemConfirm, editItemConfirm, hideForm}} formValues={formValues} />}
    </div>
  )
}

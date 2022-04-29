import React, {useEffect, useState} from 'react'
import Item from './Components/Item'
import ItemForm from './Components/ItemForm'


export default function App() {
  const [formVisible, setFormVisible] = useState(false)
  const [formValues, setFormValues] = useState({})
  const [items, setItems] = useState([])
  const [highestId, setHighestId] = useState(0)

  useEffect(() => {
    setHighestId(prevHighestId => prevHighestId + 1)
  }, [items])

  useEffect(() => {
    const entries = JSON.parse(localStorage.getItem('entries') || '[]')
    setItems(entries)
    const ids = entries.map(entry => entry.id)
    const maxId = Math.max(ids)
    setHighestId(maxId + 1)
  }, [])

  useEffect(() => {
    localStorage.setItem('entries', JSON.stringify(items))
  }, [items])


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
    hideForm()
    setItems(oldItems => [...oldItems, newItem])
  }

  function removeItem(event, id) {
    setItems(oldItems => oldItems.filter(item => item.id !== id))
  }

  function editItem(event, id) {
    let item = items.filter(item => item.id === id)
    setFormValues(...item)
    showForm()
  }

  function editItemConfirm(event, newItem) {
    setItems(oldItems => oldItems.map(oldItem => oldItem.id === newItem.id ? newItem : oldItem))
    hideForm()
  }

  function showItems() {
    return items.map(item => <Item
      key={item.id}
      values={item}
      events={{removeItem, editItem}}
    />)
  }


  return (
    <div>
      <button onClick={addItem}>Add Item</button>
      {showItems()}
      {formVisible && <ItemForm events={{addItemConfirm, editItemConfirm, hideForm}} formValues={formValues} />}
    </div>
  )
}



// TODO
// styling

export default function ItemForm({events: {addItemConfirm, editItemConfirm, hideForm}, formValues: {id, text}}) {
  const editing = id !== undefined

  return (
    <form>
      <input name="text" id="text" placeholder="Enter item" defaultValue={text}></input>
      {editing && <button
        onClick={(event) => editItemConfirm(event, {
          text: document.getElementById('text').value,
          id: id
        })}
      >Edit</button>}
      
      {!editing && <button
        onClick={(event) => addItemConfirm(event, {
          text: document.getElementById('text').value
        })}
      >Add</button>}
      <button onClick={hideForm}>Close</button>
    </form>
  )
}

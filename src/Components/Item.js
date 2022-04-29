export default function Item({values: {id, text}, events: {removeItem, editItem}}) {
// console.log('item', id)
  return (
    <div id={id}>
      <div>{text}</div>
      <button onClick={(event) => removeItem(event, id)}>Remove</button>
      <button onClick={(event) => editItem(event, id)}>Edit</button>
    </div>
  )
}

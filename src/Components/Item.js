export default function Item({values: {id, text}, events: {removeItem, editItem}}) {

  return (
    <div id={id} className="item">
      <div className="item-text">{text}</div>
      <span className="buttons-wrapper">
        <button onClick={(event) => removeItem(event, id)}>Remove</button>
        <button onClick={(event) => editItem(event, id)}>Edit</button>
      </span>
    </div>
  )
}

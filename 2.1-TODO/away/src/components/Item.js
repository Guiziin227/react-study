export function Item({ itemObj, onDeleteItems, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={itemObj.packed}
        onChange={() => {
          onToggleItem(itemObj.id)
        }}
      />
      <span style={itemObj.packed ? { textDecoration: 'line-through' } : {}}>
        {itemObj.quantity} {itemObj.description}
      </span>
      <button onClick={() => onDeleteItems(itemObj.id)}>❌</button>
    </li>
  )
}

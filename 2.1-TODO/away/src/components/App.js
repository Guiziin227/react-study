import { useState } from 'react'
import { Logo } from './Logo'
import { Form } from './Form'
import { PackingList } from './PackingList'
import { Stats } from './Stats'

export default function App() {
  const [items, setItems] = useState([])

  // const [numItems, setNumItems] = useState(0)

  function handleAddItems(item) {
    setItems((items) => [...items, item])
    // setNumItems((num) => num + 1)
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((i) => i.id !== id)) //setItems => passando uma funcao que pega o items.filter que faz a limpa dos items que tem id igual
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    )
  }

  function handleDeleteItemList() {
    setItems([])
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItems}
        onToggleItem={handleToggleItem}
        onDeleteItemList={handleDeleteItemList}
      />
      <Stats items={items} />
    </div>
  )
}

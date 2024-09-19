import { useState } from 'react'
import { Button } from './Button'
import './index.css'

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
]

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false)
  const [friends, setFriends] = useState(initialFriends)
  const [selectedFriend, setSelectedFriend] = useState(null)

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show)
  }

  function handleAddFriend(newFriend) {
    setFriends((friends) => [...friends, newFriend])
  }

  function handleSelection(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend))
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          data={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? 'Close' : 'Add friend'}
        </Button>
      </div>{' '}
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
    </div>
  )
}

function FriendsList({ data, onSelection, selectedFriend }) {
  return (
    <ul cl>
      {data.map((el) => (
        <Friends
          itemsObj={el}
          key={el.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  )
}

function Friends({ itemsObj, onSelection, selectedFriend }) {
  const isSelected = itemsObj.id === selectedFriend?.id

  return (
    <li className={isSelected ? 'selected' : ''}>
      <img src={itemsObj.image} alt={itemsObj.name} />

      <h3>{itemsObj.name}</h3>

      {itemsObj.balance < 0 && (
        <p className="red">
          Voce esta devendo {itemsObj.name} R${Math.abs(itemsObj.balance)}
        </p>
      )}

      {itemsObj.balance > 0 && (
        <p className="green">
          {itemsObj.name} esta devendo para voce R${Math.abs(itemsObj.balance)}
        </p>
      )}

      {itemsObj.balance === 0 && (
        <p className="gray">Voce e {itemsObj.name} estão quites</p>
      )}

      <Button onClick={() => onSelection(itemsObj)}>
        {isSelected ? 'Close' : 'Select'}
      </Button>
    </li>
  )
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState('')
  const [image, setImage] = useState('https://i.pravatar.cc/48')

  function handleSubmit(e) {
    e.preventDefault()

    if (!name) return

    const newFriend = { id: crypto.randomUUID, name, image, balance: 0 }
    onAddFriend(newFriend)

    setName('')
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>Nome do amigo</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Img URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  )
}

function FormSplitBill({ selectedFriend }) {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>Bill value</label>
      <input type="text" />

      <label>Your expense</label>
      <input type="text" />

      <label>{selectedFriend.name}'s expense</label>
      <input type="text" disabled />

      <label>Quem vai pagar a conta</label>
      <select>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Add</Button>
    </form>
  )
}

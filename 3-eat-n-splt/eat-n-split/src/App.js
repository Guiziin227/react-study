import {useState} from 'react'
import {Button} from './Button'
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

    function handleSplitBill(value) {
        setFriends((el) =>
            el.map((friend) =>
                friend.id === selectedFriend.id
                    ? {...friend, balance: friend.balance + value}
                    : friend
            )
        )

        setSelectedFriend(null)
    }

    return (
        <div className="app">
            <div className="sidebar">
                <FriendsList
                    data={friends}
                    onSelection={handleSelection}
                    selectedFriend={selectedFriend}
                />
                {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend}/>}
                <Button onClick={handleShowAddFriend}>
                    {showAddFriend ? 'Close' : 'Add friend'}
                </Button>
            </div>
            {' '}
            {selectedFriend && (
                <FormSplitBill
                    selectedFriend={selectedFriend}
                    onSplitBill={handleSplitBill}
                    key={selectedFriend.id}
                />
            )}
        </div>
    )
}

function FriendsList({data, onSelection, selectedFriend}) {
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

function Friends({itemsObj, onSelection, selectedFriend}) {
    const isSelected = itemsObj.id === selectedFriend?.id

    return (
        <li className={isSelected ? 'selected' : ''}>
            <img src={itemsObj.image} alt={itemsObj.name}/>

            <h3>{itemsObj.name}</h3>

            {itemsObj.balance < 0 && (
                <p className="red">
                    Você está devendo {itemsObj.name} R${Math.abs(itemsObj.balance)}
                </p>
            )}

            {itemsObj.balance > 0 && (
                <p className="green">
                    {itemsObj.name} está devendo para você R${Math.abs(itemsObj.balance)}
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

function FormAddFriend({onAddFriend}) {
    const [name, setName] = useState('')
    const [image, setImage] = useState('https://i.pravatar.cc/48')

    function handleSubmit(e) {
        e.preventDefault()

        if (!name) return

        const newFriend = {id: crypto.randomUUID, name, image, balance: 0}
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

function FormSplitBill({selectedFriend, onSplitBill}) {
    const [bill, setBill] = useState('')
    const [paidUser, setPaidUser] = useState('')
    const paidByFriend = bill ? bill - paidUser : '' //criando o pagamento do amigo, que vai de acordo com o valor colocado na conta e a parte do usuario "controlled element"
    const [whoIsPaying, setWhoIsPaying] = useState('user')

    function handleSubmit(e) {
        e.preventDefault()

        if (!bill || !paidUser) return

        onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidUser)
    }

    return (
        <form className="form-split-bill" onSubmit={handleSubmit}>
            <h2>Divida a conta com {selectedFriend.name}</h2>

            <label>Valor da conta</label>
            <input
                type="text"
                value={bill}
                onChange={(e) => setBill(+e.target.value)}
            />

            <label>Sua parte</label>
            <input
                type="text"
                value={paidUser}
                onChange={(e) =>
                    setPaidUser(+e.target.value > bill ? paidUser : +e.target.value)
                }
            />

            <label>Parte do(a) {selectedFriend.name}</label>
            <input type="text" disabled value={paidByFriend}/>

            <label>Quem vai pagar a conta</label>
            <select
                value={whoIsPaying}
                onChange={(e) => setWhoIsPaying(e.target.value)}
            >
                <option value="user">Você</option>
                <option value="friend">{selectedFriend.name}</option>
            </select>

            <Button>Add</Button>
        </form>
    )
}

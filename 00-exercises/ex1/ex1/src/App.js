//import { useState } from 'react'
import { useState } from 'react'
import './index.css'

const initialProducts = [
  {
    id: 6632,
    name: 'Cenoura',
    quantity: 3,
    price: 4,
  },
  {
    id: 6631,
    name: 'Frango',
    quantity: 5,
    price: 14,
  },
  {
    id: 6630,
    name: 'Bolo',
    quantity: 1,
    price: 10,
  },
  {
    id: 6635,
    name: 'Ovos',
    quantity: 12,
    price: 7,
  },
]

export default function App() {
  const [moreProduct, setMoreProduct] = useState(initialProducts)

  function handleProduct(product) {
    setMoreProduct((e) => [...e, product])
  }

  function handleDeleteProduct(id) {
    setMoreProduct((el) => el.filter((i) => i.id !== id))
  }

  const [showFormProduct, setShowFormProduct] = useState(false)

  function handleShowForm() {
    setShowFormProduct((showFormProduct) => !showFormProduct)
  }

  return (
    <div className="container">
      <ProductList data={moreProduct} onDeleteProduct={handleDeleteProduct} />
      {showFormProduct && <FormAddNewProduct onAddProduct={handleProduct} />}
      <Button onClick={handleShowForm}>
        {showFormProduct ? 'Close' : 'Add'}
      </Button>
    </div>
  )
}

function ProductList({ data, onDeleteProduct }) {
  return (
    <div>
      <ul>
        {data.map((el) => (
          <Products
            products={el}
            key={el.id}
            onDeleteProduct={onDeleteProduct}
          />
        ))}
      </ul>
    </div>
  )
}

function Products({ products, onDeleteProduct }) {
  return (
    <li className="products">
      <p>{products.name}</p>
      <p>Quantidade {products.quantity}</p>
      <p> RS${products.price}</p>
      <span
        onClick={() => onDeleteProduct(products.id)}
        style={{ cursor: 'pointer' }}
      >
        ❌
      </span>
    </li>
  )
}

function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="btn">
      {children}
    </button>
  )
}

function FormAddNewProduct({ onAddProduct }) {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    if (!name || !quantity || !price) return

    const newProduct = { id: crypto.randomUUID(), name, quantity, price }
    onAddProduct(newProduct)

    setName('')
    setQuantity('')
    setPrice('')
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>Qual nome do produto?</label>
      <input
        type="text"
        placeholder="Produto"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Qual a Quantidade do produto?</label>
      <input
        type="text"
        placeholder="Quantidade"
        value={quantity}
        onChange={(e) => setQuantity(+e.target.value)}
      />
      <label>Qual o preço do produto?</label>
      <input
        type="text"
        placeholder="Preço"
        value={price}
        onChange={(e) => setPrice(+e.target.value)}
      />

      <Button>Adicionar</Button>
    </form>
  )
}

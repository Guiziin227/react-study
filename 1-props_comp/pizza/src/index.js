import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

const pizzaData = [
  {
    name: 'Focaccia',
    ingredients: 'Bread with italian olive oil and rosemary',
    price: 6,
    photoName: 'pizzas/focaccia.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Margherita',
    ingredients: 'Tomato and mozarella',
    price: 10,
    photoName: 'pizzas/margherita.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Spinaci',
    ingredients: 'Tomato, mozarella, spinach, and ricotta cheese',
    price: 12,
    photoName: 'pizzas/spinaci.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Funghi',
    ingredients: 'Tomato, mozarella, mushrooms, and onion',
    price: 12,
    photoName: 'pizzas/funghi.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Salamino',
    ingredients: 'Tomato, mozarella, and pepperoni',
    price: 15,
    photoName: 'pizzas/salamino.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Prosciutto',
    ingredients: 'Tomato, mozarella, mushrooms, and onion',
    price: 18,
    photoName: 'pizzas/prosciutto.jpg',
    soldOut: false,
  },
]

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <header className="header">
      <h1>Pizza do Gui Co.</h1>
    </header>
  )
}

function Menu() {
  const pizzas = pizzaData
  //const pizzas = []
  const numPizzas = pizzas.length

  return (
    <div className="menu">
      <h2>Nossas Pizzas!</h2>

      {numPizzas > 0 ? (
        <>
          <p>
            Pizzas italianas autênticas. 6 sabores criativos e gostosos para
            você escolher. Tudo do nosso forno de pedra, tudo orgânico, tudo
            delicioso.
          </p>
          <ul className="pizzas">
            {pizzas.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} />
            ))}
          </ul>
        </>
      ) : (
        <p>Estamos trabalhando para trazer mais pizzas ao menu!</p>
      )}

      {/* {pizzas && (
        <ul className="pizzas">
          {pizzas.map((pizza) => (
            <Pizza pizzaObj={pizza} key={pizza.name} />
          ))}
        </ul>
      )} */}
    </div>
  )
}

function Pizza({ pizzaObj }) {
  console.log(pizzaObj)

  return (
    <li className={`pizza ${pizzaObj.soldOut ? 'sold-out' : ''}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>

        {/* {pizzaObj.soldOut ? (
          <span>ESGOTADO</span>
        ) : (
          <span>{pizzaObj.price}</span>
        )} */}
        <span>{pizzaObj.soldOut ? 'Esgotada' : pizzaObj.price}</span>
      </div>
    </li>
  )
}

function Footer() {
  const hour = new Date().getHours()
  const openHour = 20
  const closedHour = 23

  const isOpen = hour >= openHour && hour <= closedHour

  return (
    <footer className="footer">
      {isOpen ? (
        <Order closedHour={closedHour} />
      ) : (
        <p>
          Portas <strong>fechadas</strong> no momento. Horário de abertura{' '}
          {openHour}:00.
        </p>
      )}
    </footer>
  )
}

function Order({ closedHour }) {
  console.log(closedHour)
  return (
    <div className="order">
      <p>
        Nosso estabelecimento está aberto até as {closedHour}:00. Nos visite ou
        faça seu pedido.
      </p>
      <button className="btn">Pedir</button>
    </div>
  )
}

//Renderizar react v18---
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

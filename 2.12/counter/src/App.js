import { useState } from 'react'
import './index.css'

export default function App() {
  return (
    <div className="container">
      <h1>Contador de dias</h1>
      <Counter />
    </div>
  )
}

function Counter() {
  const [multiplicador, setMultiplicador] = useState(1)
  const [numero, setNumero] = useState(0)

  const date = new Date('june 21 2027')
  date.setDate(date.getDate() + numero)

  return (
    <div>
      <div>
        <input
          type="range"
          min={1}
          max={10}
          value={multiplicador}
          onChange={(e) => setMultiplicador(+e.target.value)}
        />
        <span>Step: {multiplicador}</span>
      </div>
      <div>
        <button onClick={() => setNumero((c) => c - multiplicador)}>-</button>
        <input
          type="text"
          value={numero}
          onChange={(e) => setNumero(+e.target.value)}
        />
        <button onClick={() => setNumero((c) => c + multiplicador)}>+</button>
      </div>

      <span>
        {numero === 0
          ? 'Today is '
          : numero > 0
          ? `${numero} days from today is `
          : `${Math.abs(numero)} days ago was `}
      </span>
      <span>{date.toDateString()}</span>
    </div>
  )
}

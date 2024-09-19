import './index.css'
import { useState } from 'react'

export default function App() {
  return (
    <div className="App">
      <TipCalculator />
    </div>
  )
}

function TipCalculator() {
  const [price, setPrice] = useState(0)
  const [satisfacao1, setSatisfacao1] = useState(0)
  const [satisfacao2, setSatisfacao2] = useState(0)

  const tip = price * ((satisfacao1 + satisfacao2) / 2 / 100)

  function handleReset() {
    setPrice(0)
    setSatisfacao1(0)
    setSatisfacao2(0)
  }

  return (
    <div>
      <BillInput price={price} setPrice={setPrice} />
      <Satisfacao satisfacao={satisfacao1} set={setSatisfacao1}>
        Você gostou do atendimento?
      </Satisfacao>
      <Satisfacao satisfacao={satisfacao2} set={setSatisfacao2}>
        Seu amigo gostou do atendimento?
      </Satisfacao>
      <Output tip={tip} price={price} />
      <Reset onReset={handleReset} />
    </div>
  )
}

function BillInput({ price, setPrice }) {
  return (
    <div>
      <label>Quando deu a conta?</label>
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(+e.target.value)}
      />
    </div>
  )
}

function Satisfacao({ children, satisfacao, set }) {
  return (
    <div>
      <label>{children}</label>
      <select value={satisfacao} onChange={(e) => set(+e.target.value)}>
        <option value="0">Não satisfeito(0%)</option>
        <option value="5">Satisfeito(5%)</option>
        <option value="10">Muito satisfeito(10%)</option>
        <option value="20">Extremamente satisfeito(20%)</option>
      </select>
    </div>
  )
}

function Output({ price, tip }) {
  return (
    <div>
      <h1>O valor da conta ficou {price + tip}</h1>
    </div>
  )
}

function Reset({ onReset }) {
  return (
    <div>
      <button onClick={onReset}>Reset</button>
    </div>
  )
}

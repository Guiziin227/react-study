import { useState } from 'react'

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
]

export default function App() {
  const [step, setStep] = useState(1)
  const [open, setOpen] = useState(true)

  function handlePrevious() {
    step > 1 ? setStep((s) => s - 1) : setStep(1)
  }

  function handleNext() {
    step < 3 ? setStep((s) => s + 1) : setStep(3)
  }

  function isOpen() {
    setOpen((open) => !open)
  }

  return (
    <div>
      <button className="close" onClick={isOpen}>
        &times;
      </button>
      {open && (
        <div className="steps">
          <div className="numbers">
            <div className={`${step >= 1 ? 'active' : ''}`}>1</div>
            <div className={`${step >= 2 ? 'active' : ''}`}>2</div>
            <div className={`${step >= 3 ? 'active' : ''}`}>3</div>
          </div>

          <StepMessage step={step}>{messages[step - 1]}</StepMessage>

          <div className="buttons">
            <Button
              onClick={handlePrevious}
              bgColor="#7950f2"
              textColor="#fff"
              text="Previous"
            >
              {' '}
              <span>👈</span>Previous
            </Button>
            <Button onClick={handleNext} bgColor="#7950f2" textColor="#fff">
              Next <span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

function StepMessage({ step, children }) {
  return (
    <div className="message">
      <h3>Step {step}:</h3>
      {children}
    </div>
  )
}

function Button({ bgColor, textColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

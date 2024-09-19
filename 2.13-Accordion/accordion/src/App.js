import './index.css'
import { useState } from 'react'

const faqs = [
  {
    title: 'Where are these chairs assembled?',
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.',
  },
  {
    title: 'How long do I have to return my chair?',
    text: 'Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.',
  },
  {
    title: 'Do you ship to countries outside the EU?',
    text: 'Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!',
  },
]

export default function App() {
  return (
    <div>
      <Accordion data={faqs} />
    </div>
  )
}

function Accordion({ data }) {
  const [curOpen, setCurOpen] = useState(null)
  return (
    <div className="accordion">
      {data.map((e, index) => (
        <AccordionItems
          curOpen={curOpen}
          onOpen={setCurOpen}
          num={index + 1}
          title={e.title}
          key={index}
        >
          {e.text}
        </AccordionItems>
      ))}
    </div>
  )
}

function AccordionItems({ num, children, title, onOpen, curOpen }) {
  const isOpen = num === curOpen

  function handleToggle() {
    onOpen(num)
  }

  return (
    <div className={`item ${isOpen && 'open'}`} onClick={handleToggle}>
      <p className="number">{num <= 9 ? `0${num}` : num}</p>{' '}
      {/* Para adicionar o 0 antes do numero menor que 10*/}
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? '-' : '+'}</p>
      {isOpen && <div className="content-box">{children}</div>}
    </div>
  )
}

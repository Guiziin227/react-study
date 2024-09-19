export function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <em>Adicione items para levar na sua viagem</em>
      </footer>
    )

  const numItems = items.length
  const numPacked = items.filter((item) => item.packed).length
  const numPorc = Math.round((numPacked / numItems) * 100)
  return (
    <footer className="stats">
      <em>
        {numPorc === 100 ? (
          'Está tudo pronto tenha uma boa viagem'
        ) : (
          <div>
            You have {numItems} items on your list, and you already packed{' '}
            {numPacked} ({numPorc}%)
          </div>
        )}
      </em>
    </footer>
  )
}

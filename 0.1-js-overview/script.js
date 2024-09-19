/*const data = [
  {
    id: 1,
    title: 'The Lord of the Rings',
    publicationDate: '1954-07-29',
    author: 'J. R. R. Tolkien',
    genres: [
      'fantasy',
      'high-fantasy',
      'adventure',
      'fiction',
      'novels',
      'literature',
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: 'El señor de los anillos',
      chinese: '魔戒',
      french: 'Le Seigneur des anneaux',
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: 'The Cyberiad',
    publicationDate: '1965-01-01',
    author: 'Stanislaw Lem',
    genres: [
      'science fiction',
      'humor',
      'speculative fiction',
      'short stories',
      'fantasy',
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: 'Dune',
    publicationDate: '1965-01-01',
    author: 'Frank Herbert',
    genres: ['science fiction', 'novel', 'adventure'],
    hasMovieAdaptation: false,
    pages: 658,
    translations: {
      spanish: '',
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: '1997-06-26',
    author: 'J. K. Rowling',
    genres: ['fantasy', 'adventure'],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: 'Harry Potter y la piedra filosofal',
      korean: '해리 포터와 마법사의 돌',
      bengali: 'হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন',
      portuguese: 'Harry Potter e a Pedra Filosofal',
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: 'A Game of Thrones',
    publicationDate: '1996-08-01',
    author: 'George R. R. Martin',
    genres: ['fantasy', 'high-fantasy', 'novel', 'fantasy fiction'],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: '왕좌의 게임',
      polish: 'Gra o tron',
      portuguese: 'A Guerra dos Tronos',
      spanish: 'Juego de tronos',
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
]

function getBooks() {
  return data
}

function getBook(id) {
  return data.find((d) => d.id === id)
}

//Destructuring

// const book = getBook(3)

// //const { title, author, pages, genres } = book
// //console.log(title, author, pages, genres)

// //         0            1  -- atribui uma variavel ao indice do array
// // const [primaryGenre, secondGenry] = genres
// // console.log(primaryGenre, secondGenry)

// //Rest/Spread Operator

// const { title, genres, pages, hasMovieAdaptation, publicationDate } = book

// const [primaryGenre, secondGenre, ...otherGenre] = genres
// console.log(primaryGenre, secondGenre, otherGenre)

// const newGenre = [...genres, 'epic fantasy']
// newGenre

// const updateBook = {
//   ...book,
//   moviePublicationDate: '2001-12-19',
//   pages: '1211',
// }
// updateBook

// const { moviePublicationDate } = updateBook

// //arrow function

// // function getYear(str) {
// //   return str.split('-')[0]
// // }

// const getYear = (str) => str.split('-')[0]
// console.log(getYear(publicationDate))

// //template literals
// const summary = `A book ${title} and published ${getYear(
//   publicationDate
// )}. The book has ${hasMovieAdaptation ? '' : 'not'} been movie adaptation`
// console.log(summary)

// //ternary

// const pagesRange = pages > 1000 ? 'yes' : 'no'
// pagesRange

// //short circuit

// console.log(true && 'some string')
// console.log(false && 'some string')

// console.log(0 && 'oi')
// console.log('Gui' && false)

// console.log(true || 'oi')
// console.log(false || 'oi')

// //Optional Chaining

// function getTotalReviewCount(book) {
//   const goodreads = book.reviews?.goodreads?.reviewsCount ?? 0
//   const biblio = book.reviews?.librarything?.reviewsCount ?? 0

//   return goodreads + biblio
// }

// console.log(getTotalReviewCount(book))

//Map method

/*

const books = getBooks()

const x = [1, 2, 3, 4]
const test = x.map((el) => el * 2)
x
test

const titles = books.map((el) => el.title)
titles

function getTotalReviewCount(book) {
  const goodreads = book.reviews.goodreads?.reviewsCount ?? 0
  const librarything = book.reviews.librarything?.reviewsCount ?? 0

  return goodreads + librarything
}

const essentialData = books.map((el) => ({
  title: el.title,
  author: el.author,
  reviewsCount: getTotalReviewCount(el),
}))

essentialData

//filter --> essas funcoes são chamadas para cada elemento da matriz

const longBooks = books
  .filter((el) => el.pages > 500)
  .filter((el) => el.hasMovieAdaptation) // retorna um novo array
longBooks

const adventureBooks = books
  .filter((el) => el.genres.includes('adventure'))
  .map((el) => el.title)
adventureBooks

//Reduce -- mais importante
//"Reduzir" toda a matriz a um único valor
//(function, somatorio (valor inicial))
const pagesAllBooks = books.reduce((acc, el) => acc + el.pages, 0)
pagesAllBooks

// Sort --> altera o array original, para nao alterar usar truque do slice

const arr = [3, 7, 1, 9, 8]
const sorted = arr.slice().sort((a, b) => a - b)
sorted
arr

const sortedPages = books.slice().sort((a, b) => a.pages - b.pages)
sortedPages

// const d = [1, 2, 5, 7, 6]

// const indicePar = d.filter((el, i) => i % 2 == 0)
// indicePar

// const sum = d.reduce((acc, el) => acc + el, 0)
// sum
// const mult = d.reduce((acc, el) => acc * el, 1)
// mult

// const b = ["banana", "apple", "peach"]
// b.sort()
// b

// Array Imutavel

//Add book object to array

const newBook = {
  id: 6,
  title: 'Harry Potter and the Chamber of secrets',
  author: 'J. K. Rowling',
}

const booksAfterAdd = [...books, newBook]
booksAfterAdd

//Delete book

const booksAfterDelete = booksAfterAdd.filter((el) => el.id !== 3) //toda vez que retorna um valor falso esse valor nao estara mais na matriz
booksAfterDelete

//Update book object  in the array

const booksAfterUpdate = booksAfterDelete.map((el) =>
  el.id === 1 ? { ...el, pages: 1210 } : el
)
booksAfterUpdate

*/

// fetch('https://jsonplaceholder.typicode.com/todos')
//   .then((res) => res.json())
//   .then((data) => console.log(data))

//console.log('Gui')

async function getTodos() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos')
  const data = await res.json()
  console.log(data)

  return data
}

const todo = getTodos()
console.log(todo, 'Antes')
console.log('Hello')

import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import BookDetail from './pages/BookDetail'
import ChapterDetail from './pages/ChapterDetail'
import CreateBook from './pages/CreateBook'
import EditBook from './pages/EditBook'
import CreateChapter from './pages/CreateChapter'
import EditChapter from './pages/EditChapter'
import { useState, useEffect } from 'react'
import { books as defaultBooks } from './data'

function App() {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem('books')
    if (savedBooks) {
      return JSON.parse(savedBooks)
    }
    return defaultBooks 
  })
  
  useEffect(() => {
    if (books.length > 0) {
      localStorage.setItem('books', JSON.stringify(books))
      console.log('books updated', books)
    }
  }, [books])

  return (
    <Routes>
      <Route path="/" element={<Home books={books} />} />
      <Route path="/books/create" element={<CreateBook books={books} setBooks={setBooks} />} />
      <Route path="/books/:id/edit" element={<EditBook books={books} setBooks={setBooks} />} />
      <Route path="/books/:id" element={<BookDetail books={books} />} />
      <Route path="/books/:id/chapters/:chapterId" element={<ChapterDetail books={books} />} />
      <Route path="/books/:id/chapters/:chapterId/edit" element={<EditChapter books={books} setBooks={setBooks}/>} />
      <Route path="/books/:id/chapters/create" element={<CreateChapter books={books} setBooks={setBooks} />} />
    </Routes>
  )
}

export default App
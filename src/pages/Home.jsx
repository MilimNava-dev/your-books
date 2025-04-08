import { Link } from 'react-router-dom'
import '../index.css'

function Home({books}) {
  return (
    <div className="page">
      <div className="container">
        <h1>My Books</h1>
        <main style={{display: 'flex', justifyContent: 'center', marginTop: '2rem'}}>
          <div className="book-grid">
            {books.map(book => (
              <Link to={`/books/${book.id}`} key={book.id} className="book-card">
                <div style={{ 
                  backgroundImage: book.cover ? `url(${book.cover})` : '',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center' 
                }} className="books-home-cover" />
                <div className="book-title-overlay">{book.title}</div>
              </Link>
            ))}
            <Link to={'/books/create'} key={'new-book'} className="book-card">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '3rem', color: 'white' }} className="books-home-cover"><i className="fa-solid fa-plus"></i></div>
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Home
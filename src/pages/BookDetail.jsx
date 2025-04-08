import { useParams, Link } from 'react-router-dom'
import '../index.css'

function BookDetail({books}) {
  const { id } = useParams()
  const book = books.find(b => b.id === id)

  if (!book) return <div className="container">Book not found</div>

  return (
    <div className="page">
      <div className="container">
        <section className="book-info">
          <div className="left-side">
            <div
              style={{
                height: '300px',
                width: '200px',
                backgroundColor: '#bbb',
                borderRadius: '10px',
                marginBottom: '2rem',
                backgroundImage: book.cover ? `url(${book.cover})` : '',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </div>
          <div className="right-side" style={{ maxWidth: '60%' }}>
            <h1 style={{ fontSize: '2rem'}} className="book-title-view">{book.title}</h1>
            {book.summary && <p className="book-title-view"><span style={{ fontWeight: 'bold' }}>Summary:</span> {book.summary}</p>}
            {book.genre && <p><span style={{ fontWeight: 'bold' }}>Genre:</span> {book.genre}</p>}
            {book.lastModified && <p><span style={{ fontWeight: 'bold' }}>Last updated:</span> {book.lastModified}</p>}
            <Link to={`/books/${book.id}/edit`}><button className="blue-button">Edit Book Info</button></Link>
          </div>
        </section>
        
        <div className='chapter-details'>
          <h2>Chapters</h2>
          <Link to={`/books/${book.id}/chapters/create`}><button className="blue-button"><i className="fa-solid fa-plus"></i></button></Link>
        </div>
        
        {book.chapters && book.chapters[0] ? (
          <ul className="chapter-list">
            {book.chapters.map((ch) => (
              <li key={ch.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Link to={`/books/${book.id}/chapters/${ch.id}`}>
                    {ch.title}
                  </Link>
                  <Link to={`/books/${book.id}/chapters/${ch.id}/edit`}>
                    <button className="blue-button"><i className="fa-solid fa-pen-to-square"></i></button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ marginBottom: '3rem', fontStyle: 'italic' }}>No chapters yet</p>
        )}
        <Link to="/"><p style={{ marginTop: '3rem'}}>← Back to Home</p></Link>
      </div>
    </div>
  )
}

export default BookDetail
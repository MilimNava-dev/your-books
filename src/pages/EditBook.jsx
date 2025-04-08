import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../index.css'

function EditBook({ books, setBooks }) {
    const { id } = useParams()
    const book = books.find(b => b.id === id)

    if (!book) return <div className="container">Book not found</div>

    const [title, setTitle] = useState(book.title)
    const [summary, setSummary] = useState(book.summary || '')
    const [genre, setGenre] = useState(book.genre || '')
    const [cover, setCover] = useState(book.cover || null)

    const navigate = useNavigate()

    const handleCoverUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
            setCover(reader.result)
        }
        reader.readAsDataURL(file)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!title) return alert('Title is required!')

        const newBook = {
            id: book.id,
            title,
            summary,
            genre,
            cover,
            lastModified: new Date().toLocaleDateString(),
            chapters: [...book.chapters]
        }

        setBooks([...books.filter(b => b.id !== id), newBook])
        navigate(`/books/${id}`)
    }

    function deleteBook() {
        const updatedBooks = books.filter(b => b.id !== id)
        setBooks(updatedBooks)
        navigate('/')
    }

    const labelStyle = {
        fontWeight: 'bold',
        fontSize: '1.15rem',
    }

    return (
        <div className="page">
            <div className="container">
                <h1>Edit Book Info</h1>
                <form style={{ display: 'flex', width: '100%', gap: '2rem', marginTop: '3rem' }} onSubmit={handleSubmit}>
                    <div className="left-side" style={{width: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <div>
                            <label style={labelStyle}>Cover Image </label>
                            <button type="button" className='blue-button' onClick={() => document.getElementById('upfile').click()}>Upload</button>
                            <input id="upfile" style={{ display: 'none' }} type="file" accept="image/*" onChange={handleCoverUpload} />
                        </div>

                        {cover && (
                            <div style={{ margin: '1rem 0' }}>
                                <img src={cover} alt="Preview" style={{ width: '200px', borderRadius: '10px' }} />
                            </div>
                        )}
                    </div>
                    <div className="right-side" style={{width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                        <div>
                            <label style={labelStyle}>Title</label><br />
                            <input
                                type="text"
                                value={title}
                                maxLength={50}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                style={{ width: '50%', padding: '0.5rem', marginTop: '0.5rem' }}
                            />
                        </div>

                        <div>
                            <label style={labelStyle}>Summary <span style={{fontStyle: 'italic', fontWeight: 'normal'}}>(optional)</span></label><br />
                            <textarea
                                value={summary}
                                maxLength={300}
                                onChange={(e) => setSummary(e.target.value)}
                                rows="5"
                                style={{ width: '100%', resize: 'none', marginTop: '0.5rem' }}
                            />
                        </div>

                        <div>
                            <label style={labelStyle}>Genre <span style={{fontStyle: 'italic', fontWeight: 'normal'}}>(optional)</span></label><br />
                            <input
                                type="text"
                                value={genre}
                                maxLength={30}
                                onChange={(e) => setGenre(e.target.value)}
                                style={{ width: '30%', padding: '0.5rem', marginTop: '0.5rem' }}
                            />
                        </div>

                        <div style={{ display: 'flex' }}>
                            <button className='blue-button' type="submit" style={{margin: '1rem auto 0'}}>Edit Book Info</button>
                            <button className='red-button' onClick={() => {deleteBook()}} style={{margin: '1rem auto 0'}}>Delete Book</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditBook
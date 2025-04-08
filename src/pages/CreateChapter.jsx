import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import '../index.css'

function CreateChapter({books, setBooks}) {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    const navigate = useNavigate()

    const { id } = useParams()
    const book = books.find(b => b.id === id)

    if (!book) return <div className="container">Book not found</div>
    

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!title) return alert('Title is required!')

        const newChapter = {
            id: crypto.randomUUID(),
            title: title,
            text: text,
        }

        book.chapters.push(newChapter)
        setBooks([book, ...books.filter(b => b.id !== id)])
        navigate(`/books/${id}`)
    }

    const labelStyle = {
        fontWeight: 'bold',
        fontSize: '1.15rem',
    }

    return (
        <div className="page">
            <div className="container" style={{minHeight: '100%'}}>
                <h1>Add Chapter</h1>
                <form style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '2rem', marginTop: '3rem' }} onSubmit={handleSubmit}>
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
                            <label style={labelStyle}>Text</label><br />
                            <textarea
                                value={text}
                                required
                                onChange={(e) => setText(e.target.value)}
                                onInput={(e) => {
                                    e.target.style.height = 'auto'; 
                                    e.target.style.height = e.target.scrollHeight + 40 + 'px'; 
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Tab') {
                                      e.preventDefault()
                                
                                      const textarea = e.target
                                      const start = textarea.selectionStart
                                      const end = textarea.selectionEnd
                                
                                      const newValue = text.substring(0, start) + '    ' + text.substring(end) // 4 espacios
                                      setText(newValue)
                                
                                      setTimeout(() => {
                                        textarea.selectionStart = textarea.selectionEnd = start + 4
                                      }, 0)
                                    }
                                  }}
                                style={{ width: '100%', minHeight: '350px', resize: 'none', marginTop: '0.5rem', overflow: 'hidden' }}
                            />
                        </div>
                        <button className='blue-button' type="submit" style={{margin: '1rem auto 0'}}>Add Chapter</button>
                </form>
            </div>
        </div>
    )
}

export default CreateChapter
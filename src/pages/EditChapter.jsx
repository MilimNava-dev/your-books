import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import '../index.css'

function CreateChapter({books, setBooks}) {
    
    const { id, chapterId } = useParams()
    const book = books.find(b => b.id === id)
    const chapter = book?.chapters.find(c => c.id === chapterId)

    const [title, setTitle] = useState(chapter?.title || '')
    const [text, setText] = useState(chapter?.text || '')

    const navigate = useNavigate()


    if (!book) return <div className="container">Book not found</div>
    

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!title) return alert('Title is required!')
    
        const newChapter = {
            id: chapterId,
            title: title,
            text: text,
        }
    
        const updatedBooks = books.map(b => {
            if (b.id !== id) return b
            return {
                ...b,
                chapters: b.chapters.map(c =>
                    c.id === chapterId ? newChapter : c
                )
            }
        })
    
        setBooks(updatedBooks)
        navigate(`/books/${id}`)
    }

    function deleteChapter() {
        const updatedBooks = books.map(b => {
            if (b.id !== id) return b
            return {
                ...b,
                chapters: b.chapters.filter(c => c.id !== chapterId)
            }
        })
    
        setBooks(updatedBooks)
        navigate(`/books/${id}`)
    }

    const labelStyle = {
        fontWeight: 'bold',
        fontSize: '1.15rem',
    }

    return (
        <div className="page">
            <div className="container" style={{minHeight: '100%'}}>
                <h1>Update Chapter</h1>
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
                                onFocus={(e) => {
                                    e.target.style.height = 'auto'; 
                                    e.target.style.height = e.target.scrollHeight + 40 + 'px'; 
                                }}
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
                        <div style={{ display: 'flex' }}>
                            <button className='blue-button' type="submit" style={{margin: '1rem auto 0'}}>Update Chapter</button>
                            <button className='red-button' onClick={() => {deleteChapter()}} style={{margin: '1rem auto 0'}}>Delete Chapter</button>
                        </div>
                </form>
            </div>
        </div>
    )
}

export default CreateChapter
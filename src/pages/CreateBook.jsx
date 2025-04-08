import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../index.css'

function CreateBook({ books, setBooks }) {
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [genre, setGenre] = useState('')
  const [cover, setCover] = useState(null)

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
      id: crypto.randomUUID(),
      title,
      summary,
      genre,
      cover,
      lastModified: new Date().toLocaleDateString(),
      chapters: []
    }

    setBooks([newBook, ...books])
    navigate(`/books/${newBook.id}`)
  }

  const labelStyle = {
    fontWeight: 'bold',
    fontSize: '1.15rem',
  }

  return (
    <div className="page">
        <div className="container">
            <h1>Create New Book</h1>
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

                    <button className='blue-button' type="submit" style={{margin: '1rem auto 0'}}>Create Book</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default CreateBook
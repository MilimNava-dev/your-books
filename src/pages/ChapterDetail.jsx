import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import '../index.css'

function ChapterDetail({books}) {
  const { id, chapterId } = useParams()
  const pageRef = useRef(null)
  const [scrollPercent, setScrollPercent] = useState(0)


  const book = books.find(b => b.id === id)
  const chapter = book?.chapters.find(c => c.id === chapterId)

  useEffect(() => {
    document.querySelector('.page').scrollTo(0, 0)
  }, [chapterId])

  useEffect(() => {
    const handleScroll = () => {
      if (!pageRef.current) return
      const el = pageRef.current
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      const percent = total > 0 ? (scrolled / total) * 100 : 0
      setScrollPercent(percent)
    }

    const el = pageRef.current
    if (el) el.addEventListener('scroll', handleScroll)
    return () => el?.removeEventListener('scroll', handleScroll)
  }, [])

  if (!book || !chapter) return <div className="container">Chapter not found</div>

  const currentIndex = book.chapters.findIndex(c => c.id === chapterId)
  const nextChapter = book.chapters[currentIndex + 1]


  return (
    <div className="page" style={
      { maxHeight: '100vh',
        overflowY: 'auto',
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        paddingTop: '125px'
      }} ref={pageRef}>
      <div className="container">
        <header>
          <h1>{chapter.title}</h1>

          <div className="progress-bar">
            <div className="progress-bar-inner" style={{ width: `${scrollPercent}%` }} />
          </div>
        </header>

        <div
          style={{
            padding: '1rem',
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
            marginBottom: '1rem',
          }}
        >
          <div>{
            chapter.text.split('\n').map((line, index) => (
            <p key={index} style={{ marginBottom: '0.5rem', whiteSpace: 'pre-wrap'}}>{line}</p>
          ))}</div>
        </div>

        {nextChapter && (
          <Link to={`/books/${book.id}/chapters/${nextChapter.id}`}>
            → Next Chapter: {nextChapter.title}
          </Link>
        )}

        <br />
        <Link to={`/books/${book.id}`}>← Back to book</Link>
      </div>
    </div>
  )
}

export default ChapterDetail
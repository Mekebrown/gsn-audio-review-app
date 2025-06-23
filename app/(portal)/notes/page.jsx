'use client';

import { useState, useEffect } from 'react';

import { allNotes } from "@/app/lib/notes_placeholders";

// /notes - msg, notes (note copy, media title/link, created date)
// CSS-in-JS Styles
const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '20px',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2rem',
  },
  notesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  accordion: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },
  accordionHeader: {
    padding: '10px',
    backgroundColor: '#f9f9f9',
    cursor: 'pointer',
  },
  noteTitle: {
    margin: '0',
    fontSize: '1.2rem',
  },
  noteMeta: {
    margin: '5px 0',
    fontSize: '0.9rem',
    color: '#555',
  },
  mediaTrack: {
    margin: '0',
    fontSize: '0.9rem',
    color: '#777',
  },
  accordionContent: {
    padding: '10px',
    backgroundColor: '#fff',
    borderTop: '1px solid #ccc',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
  },
  pageButton: {
    padding: '10px 15px',
    fontSize: '1rem',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  pageButtonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
  pageInfo: {
    fontSize: '1rem',
  },
};

function Accordion({ note }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={styles.accordion}>
      <div style={styles.accordionHeader} onClick={toggleAccordion}>
        <h3 style={styles.noteTitle}>{note.title}</h3>
        <p style={styles.noteMeta}>
          By {note.users_permissions_user.id} | {new Date(note.updatedAt || note.createdAt).toLocaleDateString()}
        </p>
      </div>
      {isOpen && (
        <div style={styles.accordionContent}>
          <p>{note.body}</p>
        </div>
      )}
    </div>
  );
}

export default function AllNotesPage() {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    } else {
      console.error('Invalid page number');
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);

      try {
        const {data, meta} = await allNotes();

        if (Array.isArray(data)) {
          const totalPageCount = meta.pagination?.pageCount || 1;

          setNotes(data);
          setTotalPages(totalPageCount);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [currentPage]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Audio File Review Notes</h1>
      {loading ? (
        <p style={styles.loading}>Loading notes...</p>
      ) : (
        <div style={styles.notesContainer}>
          {notes.map((note) => (
            <Accordion key={note.id} note={note} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={styles.pagination}>
          <button
            style={styles.pageButton}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span style={styles.pageInfo}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            style={styles.pageButton}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

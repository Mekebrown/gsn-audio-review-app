'use client';

import { useState, useEffect } from 'react';
import axios from "axios";

import { getSingleNoteAPIPath } from "@/app/lib/general_variables";
import notesExample from "@/app/lib/notes_placeholders";

// CSS-in-JS Styles
const styles: { [key: string]: React.CSSProperties } = {
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

// Define types for the note and audio track
interface MediaTrack {
  id: number;
  media_title: string;
}

interface Note {
  id: number;
  note_title: string;
  note_author: string;
  note_body: string;
  note_media_info: MediaTrack;
  note_created_at: string;
  note_updated_at?: string;
}

interface AccordionProps {
  note: Note;
}

function Accordion({ note }: AccordionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={styles.accordion}>
      <div style={styles.accordionHeader} onClick={toggleAccordion}>
        <h3 style={styles.noteTitle}>{note.note_title}</h3>
        <p style={styles.noteMeta}>
          By {note.note_author} | {new Date(note.note_updated_at || note.note_created_at).toLocaleDateString()}
        </p>
        <p style={styles.mediaTrack}>
          Audio: {note.note_media_info.id} - {note.note_media_info.media_title.split(' ').slice(0, 3).join(' ')}...
        </p>
      </div>
      {isOpen && (
        <div style={styles.accordionContent}>
          <p>{note.note_body}</p>
        </div>
      )}
    </div>
  );
}

export default function AllNotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const NOTES_PER_PAGE = 6;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    } else {
      console.error('Invalid page number');
    }
  };

  // Fetch notes from Strapi API
  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/notes?_limit=${NOTES_PER_PAGE}&_start=${
            (currentPage - 1) * NOTES_PER_PAGE
          }`
        );
        const data: Note[] = await response.json();
        const totalCount = response.headers.get('X-Total-Count');
        setNotes(data);
        setTotalPages(Math.ceil(Number(totalCount) / NOTES_PER_PAGE));
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
    </div>
  );
}

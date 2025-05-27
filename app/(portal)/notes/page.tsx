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

interface Note {
  noteId: number;
  userId: number;
  noteBody: string;
  noteTitle: string;
  mediaId: number;
  createdAt: string;
  updatedAt?: string;
  noteDatetime: string;
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
        <h3 style={styles.noteTitle}>{note.noteTitle}</h3>
        <p style={styles.noteMeta}>
          By {note.userId} | {new Date(note.updatedAt || note.createdAt).toLocaleDateString()}
        </p>
      </div>
      {isOpen && (
        <div style={styles.accordionContent}>
          <p>{note.noteBody}</p>
        </div>
      )}
    </div>
  );
}

// /notes - msg, notes (note copy, media title/link, created date)
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

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);

      try {
        // const response = await fetch(
        //   `${process.env.NEXT_PUBLIC_STRAPI_URL}/notes?_limit=${NOTES_PER_PAGE}&_start=${
        //     (currentPage - 1) * NOTES_PER_PAGE
        //   }`
        // );
        // Make dummy data for the response. Integrate the Note[] interface in the dummy data.
        const response = {
          status: 200,
          json: async () => notesExample,
          headers: {
            get: (header: string) => {
              if (header === 'X-Total-Count') {
                return String(notesExample.length); // Simulating total count
              }
              return null;
            },
          },
        }
        const data = await response.json();
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
            <Accordion key={note.noteId} note={note} />
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

'use client';

import { useState, useEffect } from 'react';

import { allNotes } from "@/app/lib/notes_placeholders";

// /notes - All notes to be displayed 
// msg, notes (note copy, media title/link, created date)
function Accordion({ note }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div 
    // className={notesAccordion}
    >
      <div 
      // className={notesAccordionHeader}
      onClick={toggleAccordion}>
        <h3 
        // className={notesTitle}
        >{note.title}</h3>
        <p 
        // className={notesMeta}
        >
          By {note.users_permissions_user.id} | {new Date(note.updatedAt || note.createdAt).toLocaleDateString()}
        </p>
      </div>
      {isOpen && (
        <div> {/* <div className={notesAccordionContent}> */}
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
    <div>
      <h1 
      // className={notesHeading}
      >Audio File Review Notes</h1>
      {loading ? (
        <p 
        // className={notesLoading}
        >Loading notes...</p>
      ) : (
        <div 
        // className={notesContainer}
        >
          {notes.map((note) => (
            <Accordion key={note.id} note={note} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div> {/* <div className={notesPagination}> */}
          <button
            // className={notesPageButton}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span 
          // className={notesPageInfo}
          >
            Page {currentPage} of {totalPages}
          </span>

          <button
            // className={notesPageButton}
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

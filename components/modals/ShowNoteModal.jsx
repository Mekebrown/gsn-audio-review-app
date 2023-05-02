import React from 'react';
import Modal from './Modal';

const ShowNoteModal = ({ note, onClose }) => {
  return (
    <Modal onClose={onClose}>
      <h1>{note.title}</h1>
      <p>{note.body}</p>
    </Modal>
  );
}

export default ShowNoteModal;

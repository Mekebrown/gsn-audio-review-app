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

const CreateNewNoteModal = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <h1>Create New Note</h1>
      <p>Form goes here</p>
    </Modal>
  );
};

export default ShowNoteModal;

export { CreateNewNoteModal };

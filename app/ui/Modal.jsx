/**
 * @description Component for the modal shown 
 * for various features
 *
 * @component
 * 
 * @example <Modal onClose={onClose} children={children} />
 * 
 * @param {function} onClose
 * @param {Object} children
 * 
 * @returns {JSX.Element}
 */
export default function Modal({ onClose, children }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                {children}
            </div>
        </div>
    );
};

/**
 * S/E 
 * 
 * @returns {JSX.Element} <DisclaimerToast />
 */
export default function DisclaimerToast() {
    return <div>
        <p>A form with text and checkboxes</p>
        <input type="checkbox" name="agreed" id="agreed" />
        Agreed
        <input type="checkbox" name="disagreed" id="disagreed" />Disagreed
    </div>;
};

/**
 * S/E 
 * 
 * @param {string} message 
 * 
 * @returns {JSX.Element} <GeneralToast message=message />
 */
export const GeneralToast = ({ message }) => {
    if (message) {
        return <div title="toastAlert">
            {message}
        </div>; 
    } else {
        return null;
    }
};

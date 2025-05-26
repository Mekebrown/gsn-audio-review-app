import "@/styles/ui/toast.css";

/**
 * @returns {JSX.Element}
 */
export default function DisclaimerToast({ show = "hideToast" }) {
    const classes = `disclaimerToast ` + show;

    return <div className={classes}>
        <div className="disclaimerToastText">
            <p>An overlay with text and buttons</p>
        </div>

        <div className="disclaimerToastChoices">
            <button type="button" name="agree" id="agree">Agree</button>

            <button type="button" name="disagree" id="disagree" >Disagree</button>
        </div>
    </div>;
};

/**
 * @param {string} message 
 * 
 * @returns {JSX.Element}
 */
export const GeneralToast = ({ message }) => {
    if (message) {
        return <div title="toastAlert" className="generalToast">
            {message}
        </div>; 
    } else {
        return null;
    }
};

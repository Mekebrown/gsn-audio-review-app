"use client";

import "@/styles/ui/toast.css";

/**
 * S/E 
 * 
 * @returns {JSX.Element} <DisclaimerToast />
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
 * S/E 
 * 
 * @param {string} message 
 * 
 * @returns {JSX.Element} <GeneralToast message=message />
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

"use client";

import { useState } from "react";

import { contactAPIPath, GSNLogo } from "@/app/lib/general_variables";
import { GeneralToast } from "@/app/ui/Toast";
import "@/styles/pages/contact.module.css";

export default function Page() {
    const [formInfo, setFormInfo] = useState({});
    const [toastMessage, setToastMessage] = useState(""); // import { ToastContainer, toast } from "react-toastify";

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const info = e.target;

            // Sanitize info

            // Validate info

            // Package info with user (visitor? Client?)
            const formData = new FormData();

            for (let ind of info) {
                if (ind in ["name", "email", "subject"]) {
                    formData.append(ind, ind.value);
                } else if (ind === "subjectDropdown") {
                    formData.append("subject_cat", ind.subjectDropdown);
                } else if (ind === "contactMsg") {
                    formData.append("message", ind.contactMsg);
                }
            }

            // Send the info and retrieve response
            const response = await fetch(contactAPIPath, {
                method: 'POST',
                body: formData
            });

            if (response.blob() !== undefined || !response.ok) {
                // Reroute user to the homepage
                setToastMessage("Success!");

                const resJSON = JSON.parse(response);
                const { data } = resJSON;

                console.log(data);
            } else {
                // ANYTHING GOES WRONG? Show in Toast: setToastMessage("Nope");
                setToastMessage("Sorry, your information did not go through. Please try again.");
            }
        } catch (error) {
            setFormInfo({});

            setToastMessage("Error");
        }
    };

    return <section>
        {toastMessage && <GeneralToast message={toastMessage} />}

        <GSNLogo /> &nbsp; GSN

        <h2>Contact</h2>
        Where to find us: <br />
        Map <br />

        Social media logos <br />

        <form action="post" onSubmit={handleSubmit}>
            <input type="text" name="name" id="name" placeholder="Your Name III" />

            <input type="email" name="email" id="email" placeholder="email@email.com" />

            <select name="subjectDropdown" id="subjectDropdown">
                <option value="Sales"></option>
                <option value="Pricing"></option>
                <option value="Technical"></option>
                <option value="Referral"></option>
                <option value="Partnership"></option>
                <option value="Creative"></option>
                <option value="Other"></option>
            </select>
            <input type="text" name="subject" id="subject" placeholder="A quick title summarizing your message" />

            <textarea name="contactMsg" id="contactMsg"></textarea>

            <button type="submit">Send Message</button><button type="reset">Clear All</button>
        </form>
    </section>;
};

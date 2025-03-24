"use client";

import { useState } from "react";

import { contactAPIPath, GSNLogo } from "@/app/lib/general_variables";
import { GeneralToast } from "@/app/ui/Toast";
import "@/styles/pages/contact.module.css";

export default function Page() {
    const [formInfo, setFormInfo] = useState({
        name: "",
        email: "",
        subjectDropdown: "",
        subject: "",
        contactMsg: "",
    });

    const updateFormInfo = (e) => {
        const { name, value } = e.target;
        setFormInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const [toastMessage, setToastMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            for (const key in formInfo) {
                formData.append(key, formInfo[key]);
            }

            const response = await fetch(contactAPIPath, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setToastMessage("Success!");
                setFormInfo({
                    name: "",
                    email: "",
                    subjectDropdown: "",
                    subject: "",
                    contactMsg: "",
                });
            } else {
                setToastMessage("Sorry, your information did not go through. Please try again.");
            }
        } catch (error) {
            setFormInfo({
                name: "",
                email: "",
                subjectDropdown: "",
                subject: "",
                contactMsg: "",
            });
            setToastMessage("Error:" + error);
        }
    };

    return (
        <section>
            {toastMessage && <GeneralToast message={toastMessage} />}

            <GSNLogo /> &nbsp; GSN

            <h2>Contact</h2>
            Where to find us: <br />
            Map <br />

            Social media logos <br />

            <form action="post" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your Name III"
                    value={formInfo.name}
                    onChange={updateFormInfo}
                />

                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email@email.com"
                    value={formInfo.email}
                    onChange={updateFormInfo}
                />

                <select
                    name="subjectDropdown"
                    id="subjectDropdown"
                    value={formInfo.subjectDropdown}
                    onChange={updateFormInfo}
                >
                    <option value="">Select a category</option>
                    <option value="Sales">Sales</option>
                    <option value="Pricing">Pricing</option>
                    <option value="Technical">Technical</option>
                    <option value="Referral">Referral</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Creative">Creative</option>
                    <option value="Other">Other</option>
                </select>

                <input
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder="A quick title summarizing your message"
                    value={formInfo.subject}
                    onChange={updateFormInfo}
                />

                <textarea
                    name="contactMsg"
                    id="contactMsg"
                    placeholder="Your message"
                    value={formInfo.contactMsg}
                    onChange={updateFormInfo}
                ></textarea>

                <button type="submit">Send Message</button>
                <button type="reset" onClick={() => setFormInfo({
                    name: "",
                    email: "",
                    subjectDropdown: "",
                    subject: "",
                    contactMsg: "",
                })}>
                    Clear All
                </button>
            </form>
        </section>
    );
};

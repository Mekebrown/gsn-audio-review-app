"use client";

import { useState, useRef } from "react";
import axios from 'axios';

import { contactAPIPath, GSNLogo } from "@/app/lib/general_variables";

import "@/styles/pages/contact.module.css";

export default function ContactPage() {
    const toastRef = useRef(null);
    const [errors, setErrors] = useState([]);
    const [successMsg, setSuccessMsg] = useState('');
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

    const validate = () => {
        const errs = [];
        if (!formInfo.name) errs.push('Name is required.');
        if (!/\S+@\S+\.\S+/.test(formInfo.email)) errs.push('Valid email is required.');
        if (!formInfo.subjectDropdown) errs.push('Please select a subject category.');
        if (!formInfo.subject) errs.push('Subject is required.');
        if (!formInfo.contactMsg) errs.push('Message body cannot be empty.');

        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors([]);
        setSuccessMsg('');

        const errs = validate();

        if (errs.length > 0) {
            setErrors(errs);
            showToast();

            return;
        }

        try {
            const formData = new FormData();

            for (const key in formInfo) {
                formData.append(key, formInfo[key]);
            }

            const response = await axios.post(contactAPIPath, {
                ...formData
            });

            if (response.status === 200) {
                setSuccessMsg('Message sent successfully!');
                setFormInfo({
                    name: "",
                    email: "",
                    subjectDropdown: "",
                    subject: "",
                    contactMsg: "",
                });
            } else {
                setErrors(['Failed to send message. Please try again later.']);
                showToast();
            }
        } catch (error) {
            setErrors(['Failed to submit. Please try again later.']);
            setFormInfo({
                name: "",
                email: "",
                subjectDropdown: "",
                subject: "",
                contactMsg: "",
            });
            showToast();
        }
    };

    const handleReset = () => {
        setFormData({
        name: '',
        email: '',
        subjectDropdown: '',
        subject: '',
        contactMsg: '',
        });
        setErrors([]);
        setSuccessMsg('');
    };

    const showToast = () => {
        if (!toastRef.current) return;
        toastRef.current.style.display = 'block';
        toastRef.current.style.opacity = '1';

        setTimeout(() => {
            toastRef.current.style.opacity = '0';

            setTimeout(() => {
                if (toastRef.current) toastRef.current.style.display = 'none';
            }, 1000);
        }, 3000);
    };

    return (
        <section>
            <GSNLogo /> &nbsp; GSN

            <h2>Contact</h2>
            Where to find us: <br />
            Map <br />

            Social media logos <br />

            {successMsg && <div>{successMsg}</div>}

            <form action="post" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your Name"
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
                <button type="reset" onClick={handleReset}>
                    Clear All
                </button>
            </form>

            <div ref={toastRef}>
                {errors.map((err, i) => (
                    <div key={i}>{err}</div>
                ))}
            </div>
        </section>
    );
};

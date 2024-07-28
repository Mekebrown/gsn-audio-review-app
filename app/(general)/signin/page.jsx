"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';

import { send_signin_info } from "@/app/lib/db-related/query_strings";
import { GeneralToast } from "@/app/ui/Toast";
import { GSNLogo } from "@/app/lib/general_variables";
import "@/styles/pages/signin.module.css";

export default function Page() {
    const [signinType, setSigninType] = useState("user");
    const [toastMessage, setToastMessage] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData(e.target);
            let response;

            if (signinType === "user") {
                // Send form info to /api/signin
                response = await send_signin_info(formData);
            } else if (signinType === "visitor") {
                // Send form info to /api/contact
                response = await send_contact_info(formData);
            }

            const result = JSON.parse(response);

            if (result.ok) {
                setToastMessage("Sorry, your information did not go through. Please try again.");
            } else {
                const { cookie_value } = result.data;

                setCookie('gsn-sign-in-cookie', cookie_value);

                setToastMessage("Success!");

                setTimeout(() => { router.push('/media'); }, 1500);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSigninType("user");
            setToastMessage("An error occurred. Please try again.");
        }
    };

    const LeftBtn = () => {
        return signinType === "user" ? (
            <button type="button" title="choice" onClick={() => setSigninType("visitor")}>No Sign In?</button>
        ) : (<button type="button" title="choice" onClick={() => setSigninType("user")}>Sign In</button>
        );
    };

    const RightForm = () => {
        return signinType === "user" ? (
            <>
                <h2>Please use your registered email and given password.</h2>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="userEmail">Your email:</label>
                    <input type="email" id="userEmail" placeholder="Your email..." required />

                    <label htmlFor="userPassword">Your password:</label>
                    <input type="password" id="userPassword" required />

                    <input type="hidden" name="formType" value="user" />

                    <button type="submit" name="signinBtn" id="signinBtn">Sign In</button>
                    <button type="reset">Clear All</button>
                </form>
            </>
        ) : (
            <>
                    <h2>Do you need an invite? Please contact your GSN coordinator or submit your information for prompt assistance.</h2>

                <form onSubmit={handleSubmit}>
                        <label htmlFor="NoSigninUserName">Your name:
                            <input type="text" id="NoSigninUserName" placeholder="Your name..." required />
                        </label>

                        <label htmlFor="userEmail">Your email:
                            <input type="email" id="userEmail" placeholder="Your email..." required />
                        </label>

                        <input type="hidden" name="subjectDropdown" value="Sign In Issue" />

                        <input type="hidden" name="subject" value="Contact From Sign In Form" />

                        <input type="hidden" name="contactMsg" value="A Client Needs A Login" />

                        <input type="hidden" name="formType" value="visitor" />

                        <button
                            type="submit"
                            name="noSigninSubmitBtn" id="noSigninSubmitBtn"
                        >
                            Send Your Info Inquiry
                        </button>

                        <button type="reset">
                            Clear All
                        </button>
                </form>
            </>
        );
    };

    return (
        <section data-testid="section">
            <GeneralToast message={toastMessage} />

            <div className="twoCols signin noSignin">
                <div>
                    <h1>
                        <GSNLogo /> &nbsp; GSN
                    </h1>
                    <p>Best Audio Review Platform</p>
                    <LeftBtn />
                </div>
                <div className="sign-in-form-container">
                    <RightForm />
                </div>
            </div>
        </section>
    );
};

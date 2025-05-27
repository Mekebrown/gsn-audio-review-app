"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { getCookie, setCookie } from 'cookies-next';

import send_signin_info, { send_contact_info } from "@/app/lib/fetch_statements";
import { GeneralToast } from "@/app/ui/Toast";
import { GSNLogo, gsnSignInCookie } from "@/app/lib/general_variables";

import "@/styles/pages/signin.css";

export default function SignInPage() {
    const [loading, setLoading] = useState(true);
    const [signinType, setSigninType] = useState("user");
    const [toastMessage, setToastMessage] = useState("");

    const router = useRouter();

    useEffect(() => {
        const isCookieSet = getCookie(gsnSignInCookie);

        if (isCookieSet) {
            setTimeout(() => {
                router.replace('/media');
            }, 1000);
        } else {
            setLoading(false);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData(e.target);
            const identifier = formData.userEmail;
            const password = formData.userPassword;
            let response;

            if (signinType === "user") {
                response = await send_signin_info({
                    "signInEmail": identifier, 
                    "signInPassword": password
                });
            } else if (signinType === "visitor") {
                response = await send_contact_info(formData);
            }

            const result = JSON.parse(response);

            if (result.ok) {
                setToastMessage("Sorry, your information did not go through. Please try again.");
            } else {
                const { cookie_value } = result.data;

                setCookie(gsnSignInCookie, cookie_value);

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
        return signinType === "user" ? <button
            className="signInTypeBtn"
            type="button"
            title="choice"
            onClick={() => setSigninType("visitor")}
        >
            No Sign In?
        </button> : <button
            className="signInTypeBtn"
            type="button"
            title="choice"
            onClick={() => setSigninType("user")}
        >
            Sign In
        </button>;
    };

    const LeftSection = () => {
        return <div>
            <h1>
                <GSNLogo /> &nbsp; GSN
            </h1>

            <p className="signInDesc">Best Audio Review Platform</p>

            <LeftBtn />
            
            <TemporaryLoginBtn />
        </div>;
    };

    const TemporaryLoginBtn = () => {
        return <button
            className="signInTypeBtn"
            type="button"
            title="temporary login"
            onClick={() => {
                setSigninType("user");
                setCookie(gsnSignInCookie, "Meke");
                setToastMessage("Let's log you in");

                setTimeout(() => {
                    router.replace('/media');
                }, 3000);
            }}
        >
            Temporary Login
        </button>;
    }

    const RightSection = () => {
        return signinType === "user" ? <div className="signInFormContainer">
            <h2>Please use your registered email and given password.</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="userEmail">Your email:</label>
                <input type="email" id="userEmail" autoComplete="email" placeholder="Your email..." required />

                <label htmlFor="userPassword">Your password:</label>
                <input type="password" id="userPassword" autoComplete="current-password" required />

                <button className="signInSubmitBtn" type="submit" name="signinBtn" id="signinBtn">Sign In</button>
                <button className="signInResetBtn" type="reset">Clear All</button>
            </form>
        </div> : <div className="signInFormContainer">
            <h2>Do you need an invite? Please contact your GSN coordinator or submit your information for prompt assistance.</h2>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="noSigninUserName">Your name:
                        <input type="text" id="noSigninUserName" autoComplete="name" placeholder="Your name..." required />
                    </label>

                    <label htmlFor="userEmail">Your email:
                        <input type="email" id="userEmail" placeholder="Your email..." required />
                    </label>

                    <input type="hidden" name="subjectDropdown" value="Sign In Issue" />

                    <input type="hidden" name="subject" value="Contact From Sign In Form" />

                    <input type="hidden" name="message" value="A Client Needs A Login" />

                    <button type="submit" name="noSigninSubmitBtn" id="noSigninSubmitBtn">
                        Send Your Info Inquiry
                    </button>

                    <button type="reset">
                        Clear All
                    </button>
                </form>
        </div>;
    };
    
    if (loading) return null;
    
    return (
        <section className="signInPage" data-testid="section">
            <GeneralToast message={toastMessage} />

            <div className="twoCols signin noSignin">
                <LeftSection />

                <RightSection />
            </div>
        </section>
    );
};

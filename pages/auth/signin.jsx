import React, { useState } from 'react';
import { signIn, useSession, getCsrfToken } from "next-auth/react";

const SignIn = ({ csrfToken }) => {
    const [message, setMessage] = useState("Enter here");

    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <div>Loading...</div>;
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const entries = formData.entries();
        const data = Object.fromEntries(entries);

        const serverResponse = await signIn('credentials', { ...data });
        const response = await serverResponse.json();

        if (!response.ok || response === undefined) {
            setMessage("Error Signing In. Please try again.");
        }
    };
    
    return <div className="sign-in-form-container">
        <h1 className="sign-in-title">New Sign In</h1>

        {<p className="sign-in-form-container-message"> {message} </p>}

        <form
            name="normal_sign_in"
            className="sign-in-form"
            onSubmit={handleSubmit}
        >
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            
            <label htmlFor="email">Email &nbsp; 
                <input
                    type="email"
                    name="email"
                    placeholder="pretend@email.net"
                    required
                />
            </label>
            <br /><br />
            <label htmlFor="password">Password &nbsp; 
                <input
                    type="password"
                    name="password"
                    placeholder="********"
                    required
                />
            </label>
            <br /><br />
            <button
                type="submit"
                className="sign-in-form-submit"
            >
                Sign In
            </button>
        </form>
    </div>;
};

export default SignIn;

export async function getServerSideProps(context) {
    let csrfToken = await getCsrfToken(context) || "";

    return {
        props: {
            csrfToken,
        },
    };
};

import React, { useState } from 'react';
import { getCsrfToken, useSession } from "next-auth/react";

const SignIn = ({ csrfToken }) => {
    const [message, setMessage] = useState("ok");

    const { data, loading } = useSession();

    if (loading) {
        setMessage("loading");
    } else if (data && data.message === "Sign in error") {
        setMessage("Sorry, there was a sign in error. Please try again.");
    }
    
    return <div className="sign-in-form-container">
        {<p className="sign-in-form-container-message"> {message} </p>}
        <h1 className="sign-in-title">Enter here</h1>

        <form
            name="normal_sign_in"
            className="sign-in-form"
            method="post"
            action="/api/auth/callback/credentials"
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
    return {
      props: {
        csrfToken: await getCsrfToken(context),
      },
    }
};

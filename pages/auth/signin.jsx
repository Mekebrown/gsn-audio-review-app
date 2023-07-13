import React, { useState } from 'react';
import { signIn, useSession, getCsrfToken } from "next-auth/react";
import { useRouter } from 'next/router';

const SignIn = ({ csrfToken }) => {
    const router = useRouter();
    const [message, setMessage] = useState("Enter here");

    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <div>Loading...</div>;
    } else if (session) {
        router.push('/media');
        return null;
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
    
        const result = await signIn('credentials', { redirect: false, email, password });

        console.log({ result });
        if (!result.ok) {
            setMessage("Error Signing In. Please try again.");
        } else if (!result.error) {
          router.push('/media');
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
    let csrfToken = await getCsrfToken(context);

    csrfToken = csrfToken || "";

    return {
        props: {
            csrfToken,
        },
    };
};

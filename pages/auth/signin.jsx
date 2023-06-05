import React, { useState } from 'react';

const SignIn = () => {
    const [error, setError] = useState("ok");

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const { email, password } = event.target;

        const res = {
            code: 200,
            msg: "kitty"
        }; 

        if (res.code === 200) {
            window.location.href = "/media";
        } else {
            setError(res.msg);
        }
    };
    
    return <div className="sign-in-form-container">
        {<p className="sign-in-form-container-error"> {error} </p>}
        <h1 className="sign-in-title">Enter here</h1>

        <form
            name="normal_sign_in"
            className="sign-in-form"
            onSubmit={handleSubmit}
        >
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

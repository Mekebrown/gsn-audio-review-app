import React from 'react';

const Login = () => {
    const handleSubmit = async (values) => {
        console.log(values);

        const { email, password } = values;

        const res = {
            code: 200,
            msg: "k"
        }; //await handleLogin({ email, password });

        if (res.code === 200) {
            window.location.href = "/media";
        }
    };
    
    return <div className="login-form-container">
        <h1 className="login-title">Enter here</h1>

        <form
            name="normal_login"
            className="login-form"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                name="email"
                placeholder="pretend@email.net"
                required
            />

            <input
                type="password"
                name="password"
                placeholder="********"
                required
            />

            <button
                type="submit"
                className="login-form-submit"
            >
                Log In
            </button>
        </form>
    </div>;
};

export default Login;

import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { setToken } from '../../utils/auth';
import './login.scss';

const Login = () => {
    const handleSubmit = async (values) => {
        // const { username, password } = values;
        const res = {code: 200, msg: "k"};//await handleLogin({ username, password });

        if (res.code === 200) {
            setToken(res.data.token);

            message.success('Success');
        } else {
            message.error(res.msg);
        }
    };
    
    return <div className="login-form">
        <h1 className="login-title">Login</h1>

        <Form
            name="normal_login"
            className="login-form"
            onSubmit={handleSubmit}
        >
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Yup, required' }]}
            >
                <Input
                    placeholder="Okay"
                />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Required' }]}
            >
                <Input
                    type="password"
                    placeholder="Stuff"
                />
            </Form.Item>

            <Form.Item>
                <Button
                type="primary"
                htmlType="submit"
                className="login-form-submit"
                >
                    Log In!
                </Button>

                <div className="login-form-register">
                    <Link to="/auth/register">Register</Link>
                </div>
            </Form.Item>
        </Form>
    </div>;
};

export default Login;

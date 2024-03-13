import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { login } from '../service/allapi';

function Login() {
    const [adminName, setAdminName] = useState('');
    const [adminPass, setAdminPass] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ admin_name: adminName, admin_pass: adminPass });
            const data = response.data;
            if (data === 'success') {
              console.log('Login successful');
              navigate('/home')
            } else {
              setErrorMessage(data);
            }
          } catch (error) {
            console.error('An error occurred:', error);
            setErrorMessage('An error occurred. Please try again later.');
          }
    };

    return (
        <div className='container gap-5'>
            <Form onSubmit={handleSubmit} className='d-flex flex-column gap-4'>
                <Form.Group controlId="formAdminName">
                    <Form.Label>Admin Name:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter admin name"
                        value={adminName}
                        onChange={(e) => setAdminName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formAdminPassword">
                    <Form.Label>Admin Password:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter admin password"
                        value={adminPass}
                        onChange={(e) => setAdminPass(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    );
}

export default Login;

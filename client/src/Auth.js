import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const credentials = { "username": username, "password": password };

        props.login(credentials);
    };

    return (
        <>
            <Col style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: '100px' }}>
                <Row className="lg-3">
                    <h3>Sign In</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId='username'>
                            <Form.Label className="mb-3">Email</Form.Label>
                            <Form.Control type='email' value={username} onChange={ev => setUsername(ev.target.value)} required={true} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} required={true} minLength={6} />
                        </Form.Group>
                        <br></br>
                        <Button type="submit">Login</Button>
                    </Form>
                </Row>
            </Col>

        </>
    )
};

function LogoutButton(props) {
    return (
        <Row>
            <Col>
                <Button variant="outline-primary" onClick={props.logout}>Logout</Button>
            </Col>
        </Row>
    )
}

export { LoginForm, LogoutButton };
import React, { useState } from 'react';
import { Button, Container, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import logo from 'assets/img/logo-aspero.png';
import { useHistory } from 'react-router-dom';

const StyledForm = styled(Form)`
    padding-top: 40px;
    padding-bottom: 40px;
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
`;
const ContainerCenter = styled(Container)`
    height: 100%;
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-align: center;
    -ms-flex-pack: center;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    padding-top: 40px;
    padding-bottom: 40px;
`;
const LoginButton = styled(Button)`
    width: 100%;
`;

function LoginView() {
    const history = useHistory();

    const { loading, error } = { loading: false, error: false };
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    function handleChange(e) {
        const name = e.target.id;
        const { value } = e.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.warn(inputs);
        history.push('/private/documents');
    };

    return (
        <ContainerCenter className="text-center">
            <StyledForm onSubmit={handleSubmit}>
                <div className="card">
                    <article className="card-body">
                        <img
                            style={{ maxHeight: '100px' }}
                            className="img-fluid"
                            alt="..."
                            src={logo}
                        ></img>
                        <hr></hr>
                        <p className="text-success text-center">
                            Login to your account
                        </p>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="fa fa-user"></i>
                                    </span>
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Email"
                                    type="email"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="fa fa-lock"></i>
                                    </span>
                                </div>
                                <input
                                    id="password"
                                    className="form-control"
                                    placeholder="Password"
                                    type="password"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <LoginButton
                            variant="primary"
                            type="submit"
                            className="btn-fill"
                            disabled={loading}
                        >
                            {loading && (
                                <span
                                    className="spinner-border spinner-border-sm mr-2"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                            )}
                            Login{loading && '...'}
                        </LoginButton>
                        {typeof error === 'string' && (
                            <div className="mt-3">
                                <Alert key="danger" variant="danger">
                                    {error}
                                </Alert>
                            </div>
                        )}
                    </article>
                </div>
            </StyledForm>
        </ContainerCenter>
    );
}

export default LoginView;

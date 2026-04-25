import React, { useState, useEffect, useContext } from 'react';
import { TextField, Box, Button, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../context/DataProvider';

import Logo from './Logo';
import './logo.css';

/* 🌈 FULL SCREEN BACKGROUND */
const Container = styled(Box)`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    background: linear-gradient(-45deg, #1e3c72, #2a5298, #6a11cb, #2575fc);
    background-size: 400% 400%;
    animation: gradientBG 10s ease infinite;

    @keyframes gradientBG {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
`;

/* 🧊 GLASS CARD */
const Component = styled(Box)`
    width: 380px;
    padding: 30px;
    border-radius: 15px;

    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);

    box-shadow: 0 8px 32px rgba(0,0,0,0.3);

    display: flex;
    flex-direction: column;
    align-items: center;
`;

/* INPUT */
const InputField = styled(TextField)`
    width: 100%;
    margin-top: 20px;
    background: white;
    border-radius: 5px;
`;

/* LOGIN BUTTON */
const LoginButton = styled(Button)`
    width: 100%;
    margin-top: 25px;
    padding: 12px;

    background: #ff6f61;
    color: white;
    font-weight: bold;
    border-radius: 8px;

    transition: 0.3s ease;

    &:hover {
        background: #ff3d2e;
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    }
`;

/* SIGNUP BUTTON */
const SignupButton = styled(Button)`
    width: 100%;
    margin-top: 10px;
    padding: 12px;

    background: transparent;
    color: white;
    border: 2px solid white;
    font-weight: bold;
    border-radius: 8px;

    transition: 0.3s ease;

    &:hover {
        background: white;
        color: #2575fc;
        transform: translateY(-2px);
    }
`;

/* TEXT */
const Text = styled(Typography)`
    color: white;
    font-size: 13px;
    margin-top: 10px;
`;

const Error = styled(Typography)`
    font-size: 12px;
    color: #ff4d4d;
    margin-top: 10px;
    font-weight: bold;
`;

const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};

const Login = ({ isUserAuthenticated }) => {

    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState('');
    const [account, toggleAccount] = useState('login');

    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);

    useEffect(() => {
        showError(false);
    }, [login]);

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    };

    const loginUser = async () => {
        let response = await API.userLogin(login);

        if (response.isSuccess) {
            showError('');

            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);

            setAccount({
                name: response.data.name,
                username: response.data.username
            });

            isUserAuthenticated(true);
            setLogin(loginInitialValues);
            navigate('/');
        } else {
            showError('Invalid credentials');
        }
    };

    const signupUser = async () => {
        let response = await API.userSignup(signup);

        if (response.isSuccess) {
            showError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
        } else {
            showError('Signup failed');
        }
    };

    return (
        <Container>

            <Component>

                {/* LOGO */}
                <Logo />

                <Typography
                    style={{
                        color: "white",
                        marginTop: 10,
                        fontWeight: "bold"
                    }}
                >
                    FAHAD BLOG
                </Typography>

                {account === 'login' ? (
                    <>
                        <InputField
                            label="Username"
                            variant="outlined"
                            name="username"
                            onChange={onValueChange}
                        />

                        <InputField
                            label="Password"
                            type="password"
                            variant="outlined"
                            name="password"
                            onChange={onValueChange}
                        />

                        {error && <Error>{error}</Error>}

                        <LoginButton onClick={loginUser}>
                            Login
                        </LoginButton>

                        <Text>OR</Text>

                        <SignupButton onClick={() => toggleAccount('signup')}>
                            Create Account
                        </SignupButton>
                    </>
                ) : (
                    <>
                        <InputField
                            label="Name"
                            name="name"
                            onChange={onInputChange}
                        />

                        <InputField
                            label="Username"
                            name="username"
                            onChange={onInputChange}
                        />

                        <InputField
                            label="Password"
                            type="password"
                            name="password"
                            onChange={onInputChange}
                        />

                        <SignupButton onClick={signupUser}>
                            Signup
                        </SignupButton>

                        <Text>OR</Text>

                        <LoginButton onClick={() => toggleAccount('login')}>
                            Already have account
                        </LoginButton>
                    </>
                )}

            </Component>

        </Container>
    );
};

export default Login;
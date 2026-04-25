import React from 'react';
import { AppBar, Toolbar, styled, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// 🌈 HEADER CONTAINER (glass + blur)
const Component = styled(AppBar)`
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(10px);
    color: #111;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

// 🧭 TOOLBAR WRAPPER
const Container = styled(Toolbar)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
`;

// 🟣 LOGO
const Logo = styled(Typography)`
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 2px;
    cursor: pointer;
    color: #1e3c72;
`;

// 🔗 NAV LINKS
const NavLinks = styled(Box)`
    display: flex;
    gap: 25px;

    & a {
        text-decoration: none;
        color: #333;
        font-weight: 500;
        position: relative;
        transition: 0.3s;
    }

    & a:hover {
        color: #1e3c72;
        transform: translateY(-2px);
    }

    & a::after {
        content: '';
        position: absolute;
        width: 0%;
        height: 2px;
        left: 0;
        bottom: -4px;
        background: #1e3c72;
        transition: 0.3s;
    }

    & a:hover::after {
        width: 100%;
    }
`;

// 🔴 LOGOUT BUTTON STYLE
const Logout = styled(Link)`
    padding: 6px 14px;
    background: linear-gradient(135deg, #ff4d4d, #ff0000);
    color: white !important;
    border-radius: 20px;
    font-weight: bold;
    text-decoration: none;
    transition: 0.3s;

    &:hover {
        transform: scale(1.05);
        opacity: 0.9;
    }
`;

export default function Header() {
    return (
        <Component position="sticky">

            <Container>

                {/* LOGO */}
                <Logo>FAHAD BLOG</Logo>

                {/* NAV LINKS */}
                <NavLinks>
                    <Link to="/">HOME</Link>
                    <Link to="/about">ABOUT</Link>
                    <Link to="/contact">CONTACT</Link>
                </NavLinks>

                {/* LOGOUT */}
                <Logout to="/login">LOGOUT</Logout>

            </Container>

        </Component>
    );
}
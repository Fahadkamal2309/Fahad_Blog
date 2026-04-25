import React from 'react';
import { Box, Typography, styled } from '@mui/material';

const Container = styled(Box)`
    min-height: 100vh;
    background: linear-gradient(135deg, #1e3c72, #2a5298);
    padding: 50px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Card = styled(Box)`
    max-width: 900px;
    width: 100%;
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(12px);
    border-radius: 15px;
    padding: 40px;
    color: white;
    box-shadow: 0 8px 30px rgba(0,0,0,0.3);
`;

const Title = styled(Typography)`
    font-size: 45px;
    font-weight: bold;
    text-align: center;
`;

const Subtitle = styled(Typography)`
    font-size: 18px;
    margin-top: 10px;
    text-align: center;
    opacity: 0.9;
`;

const Section = styled(Box)`
    margin-top: 30px;
`;

const About = () => {
    return (
        <Container>

            <Card>

                {/* TITLE */}
                <Title>About FAHAD BLOG</Title>

                <Subtitle>
                    A modern blogging platform built with MERN Stack
                </Subtitle>

                {/* INTRO */}
                <Section>
                    <Typography>
                        FAHAD BLOG is a full-stack web application where users can
                        create, share, and explore blogs in different categories like
                        Tech, Music, Fashion, and Sports.
                    </Typography>
                </Section>

                {/* FEATURES */}
                <Section>
                    <Typography variant="h5" fontWeight="bold">
                        Features
                    </Typography>

                    <ul>
                        <li>Create and publish blogs</li>
                        <li>Category-based filtering</li>
                        <li>Image upload support</li>
                        <li>Comment system</li>
                        <li>Modern responsive UI</li>
                    </ul>
                </Section>

                {/* DEVELOPER */}
                <Section>
                    <Typography variant="h5" fontWeight="bold">
                        Developer
                    </Typography>

                    <Typography>
                        Built by FAHAD using MERN Stack (MongoDB, Express, React, Node.js).
                        Focused on clean UI, performance, and scalability.
                    </Typography>
                </Section>

            </Card>

        </Container>
    );
};

export default About;
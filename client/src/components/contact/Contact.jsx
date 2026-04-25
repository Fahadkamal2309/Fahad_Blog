import React from 'react';
import { Box, Typography, styled, Link } from '@mui/material';

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

const Contact = () => {
    return (
        <Container>

            <Card>

                {/* TITLE */}
                <Title>Contact Me</Title>

                <Subtitle>
                    Let’s connect and build something amazing 🚀
                </Subtitle>

                {/* CONTACT INFO */}
                <Section>
                    <Typography>
                        📧 <b>Email:</b> 8112fahadkamal@gmail.com
                    </Typography>

                    <Typography>
                        📞 <b>Phone:</b> 8112943484
                    </Typography>
                </Section>

                {/* LINKS */}
                <Section>
                    <Typography variant="h5" fontWeight="bold">
                        Social Profiles
                    </Typography>

                    <Typography>
                        🔗 LinkedIn:{' '}
                        <Link
                            href="https://www.linkedin.com/in/mohammadfahadkamal/"
                            target="_blank"
                            color="inherit"
                        >
                            linkedin.com/in/mohammadfahadkamal
                        </Link>
                    </Typography>

                    <Typography>
                        💻 GitHub:{' '}
                        <Link
                            href="https://github.com/Fahadkamal2309"
                            target="_blank"
                            color="inherit"
                        >
                            github.com/Fahadkamal2309
                        </Link>
                    </Typography>

                    <Typography>
                        🧠 LeetCode:{' '}
                        <Link
                            href="https://leetcode.com/u/fahadkamal/"
                            target="_blank"
                            color="inherit"
                        >
                            leetcode.com/u/fahadkamal
                        </Link>
                    </Typography>
                </Section>

                {/* NOTE */}
                <Section>
                    <Typography>
                        I am always open to opportunities, collaborations, and freelance projects.
                        Feel free to reach out!
                    </Typography>
                </Section>

            </Card>

        </Container>
    );
};

export default Contact;
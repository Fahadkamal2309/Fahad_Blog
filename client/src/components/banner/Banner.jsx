import { styled, Box, Typography } from '@mui/material';

const Hero = styled(Box)`
    width: 100%;
    height: 55vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    color: white;
    text-align: center;

    background: linear-gradient(
        rgba(0,0,0,0.6),
        rgba(0,0,0,0.6)
    ),
    url("https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg");

    background-size: cover;
    background-position: center;
`;

const Title = styled(Typography)`
    font-size: 70px;
    font-weight: bold;

    @media (max-width: 600px) {
        font-size: 40px;
    }
`;

const Subtitle = styled(Typography)`
    font-size: 18px;
    margin-top: 10px;
    opacity: 0.9;
`;

const Banner = () => {
    return (
        <Hero>
            <Title>FAHAD BLOG</Title>
            <Subtitle>Write • Share • Inspire</Subtitle>
        </Hero>
    );
};

export default Banner;
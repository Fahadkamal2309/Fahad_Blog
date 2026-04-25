import { Box, styled } from '@mui/material';
import Banner from '../banner/Banner';
import Categories from './Categories';
import Posts from './post/Posts';

const Wrapper = styled(Box)`
    min-height: 100vh;
    background: linear-gradient(135deg, #1e3c72, #2a5298);
`;

const Layout = styled(Box)`
    display: flex;
    gap: 20px;
    padding: 30px 60px;
    align-items: flex-start;

    @media (max-width: 900px) {
        flex-direction: column;
        padding: 15px;
    }
`;

// Glass sidebar
const Sidebar = styled(Box)`
    width: 260px;
    position: sticky;
    top: 90px;

    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(12px);
    border-radius: 12px;
    padding: 15px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.2);
`;

// Glass content
const Content = styled(Box)`
    flex: 1;

    background: rgba(255,255,255,0.10);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.2);
`;

const Home = () => {
    return (
        <Wrapper>

            {/* Banner stays on top */}
            <Banner />

            <Layout>

                {/* LEFT SIDEBAR */}
                <Sidebar>
                    <Categories />
                </Sidebar>

                {/* POSTS AREA */}
                <Content>
                    <Posts />
                </Content>

            </Layout>

        </Wrapper>
    );
};

export default Home;
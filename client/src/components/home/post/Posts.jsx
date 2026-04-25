import { useEffect, useState } from 'react';
import { Box, Typography ,styled} from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { API } from '../../../service/api';
import Post from './Post';
const Container = styled(Box)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
`;
const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getAllPosts({ category: category });

            if (response.isSuccess) {
                setPosts(response.data);
            }
        };
        fetchData();
    }, [category]);

    return (
        <Container
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2
            }}
        >
            {posts?.length > 0 ? (
                posts.map(post => (
                    <Box
                        key={post._id}
                        sx={{
                             mb: 2 
                        }}
                    >
                        <Link
                            to={`/details/${post._id}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <Post post={post} />
                        </Link>
                    </Box>
                ))
            ) : (
                <Typography sx={{ m: 3 }}>
                    No posts available
                </Typography>
            )}
        </Container>
    );
};

export default Posts;
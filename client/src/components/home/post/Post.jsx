import { styled, Box, Typography } from '@mui/material';

const Container = styled(Box)`
    width: 100%;
    border: 1px solid #d3cede;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    margin-top: 10px;
    background: #fff;
`;

const Image = styled('img')({
    width: '100%',
    height: 220,
    objectFit: 'cover'
});

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Heading = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
`;

const Details = styled(Typography)`
    font-size: 14px;
    word-break: break-word;
`;

const Post = ({ post }) => {
    const url = post.picture || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085';

    const addEllipsis = (str = '', limit) =>
        str.length > limit ? str.substring(0, limit) + '...' : str;

    return (
        <Container>
            <Image src={url} alt="post" />

            <Box sx={{ padding: 1 }} style={{ flex: 1}}>
                <Text>{post.categories}</Text>
                <Heading>{addEllipsis(post.title, 20)}</Heading>
                <Text>Author: {post.username}</Text>
                <Details>{addEllipsis(post.description, 100)}</Details>
            </Box>
        </Container>
    );
};

export default Post;
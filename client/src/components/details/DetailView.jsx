import { useState, useEffect, useContext } from 'react';
import { Box, Typography, styled, TextField, Button } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../context/DataProvider';

// 🌈 WRAPPER
const Wrapper = styled(Box)`
    min-height: 100vh;
    background: linear-gradient(135deg, #1e3c72, #2a5298);
    display: flex;
    justify-content: center;
    padding: 40px 15px;
`;

// 🟣 CONTAINER
const Container = styled(Box)`
    width: 100%;
    max-width: 900px;
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(12px);
    border-radius: 15px;
    padding: 30px;
    color: white;
    box-shadow: 0 8px 30px rgba(0,0,0,0.3);
`;

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
    borderRadius: '10px'
});

const IconBox = styled(Box)`
    float: right;
    display: flex;
    gap: 10px;
    margin-top: 10px;
`;

const EditIcon = styled(Edit)`
    padding: 5px;
    border: 1px solid white;
    border-radius: 8px;
    cursor: pointer;
    color: white;
`;

const DeleteIcon = styled(Delete)`
    padding: 5px;
    border: 1px solid white;
    border-radius: 8px;
    cursor: pointer;
    color: #ff4d4d;
`;

const Heading = styled(Typography)`
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    margin: 30px 0 10px;
`;

const CommentBox = styled(Box)`
    margin-top: 40px;
`;

const SingleComment = styled(Box)`
    background: rgba(255,255,255,0.2);
    padding: 10px;
    border-radius: 8px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const DetailView = () => {

    const defaultImage =
        'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?auto=format&fit=crop&w=1000&q=80';

    const [post, setPost] = useState(null);
    const [comment, setComment] = useState('');

    const { account } = useContext(DataContext);
    const navigate = useNavigate();
    const { id } = useParams();

    // FETCH POST
    useEffect(() => {
        const fetchData = async () => {
            const response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data.post || response.data);
            }
        };
        fetchData();
    }, [id]);

    // DELETE POST
    const deleteBlog = async () => {
        await API.deletePost(post._id);
        navigate('/');
    };

    // ADD COMMENT
    const addComment = async () => {

        if (!comment.trim()) return;

        const payload = {
            username: account.username,
            text: comment
        };

        const response = await API.comment(payload, post._id);

        if (response.isSuccess) {
            setPost(prev => ({
                ...prev,
                comments: response.data.comments
            }));
            setComment('');
        }
    };

    // ❌ DELETE COMMENT
    const deleteComment = async (commentIndex) => {

        const response = await API.deleteComment(post._id, commentIndex);

        if (response.isSuccess) {
            setPost(response.data);
        }
    };

    if (!post) {
        return (
            <Wrapper>
                <Container>Loading...</Container>
            </Wrapper>
        );
    }

    return (
        <Wrapper>

            <Container>

                {/* IMAGE */}
                <Image src={post?.picture || defaultImage} />

                {/* EDIT / DELETE POST */}
                {
                    account?.username === post?.username && (
                        <IconBox>
                            <Link to={`/update/${post._id}`}>
                                <EditIcon />
                            </Link>

                            <DeleteIcon onClick={deleteBlog} />
                        </IconBox>
                    )
                }

                {/* TITLE */}
                <Heading>{post?.title}</Heading>

                {/* AUTHOR */}
                <Typography>
                    Author: <b>{post?.username}</b>
                </Typography>

                {/* DESCRIPTION */}
                <Typography sx={{ fontSize: '18px', mt: 2 }}>
                    {post?.description}
                </Typography>

                {/* ================= COMMENTS ================= */}
                <CommentBox>

                    <Typography variant="h6">Comments</Typography>

                    {/* INPUT */}
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                        <TextField
                            fullWidth
                            placeholder="Write a comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            sx={{
                                background: 'rgba(255,255,255,0.9)',
                                borderRadius: 1
                            }}
                        />

                        <Button
                            variant="contained"
                            onClick={addComment}
                            sx={{ background: '#00c6ff' }}
                        >
                            Post
                        </Button>
                    </Box>

                    {/* SHOW COMMENTS */}
                    {
                        post.comments?.length > 0 ? (
                            post.comments.map((c, index) => (
                                <SingleComment key={index}>

                                    <Box>
                                        <Typography fontWeight="bold">
                                            {c.username}
                                        </Typography>

                                        <Typography>
                                            {c.text}
                                        </Typography>
                                        <Typography
                        sx={{ fontSize: '12px', opacity: 0.7, mt: 0.5 }}
                    >
                        {c.createdDate
                            ? new Date(c.createdDate).toLocaleString()
                            : ''}
                    </Typography>
                                    </Box>

                                    {/* DELETE COMMENT */}
                                    {
                                        account?.username === c.username && (
                                            <DeleteIcon
                                                onClick={() => deleteComment(index)}
                                            />
                                        )
                                    }

                                </SingleComment>
                            ))
                        ) : (
                            <Typography sx={{ mt: 2, opacity: 0.7 }}>
                                No comments yet
                            </Typography>
                        )
                    }

                </CommentBox>

            </Container>

        </Wrapper>
    );
};

export default DetailView;
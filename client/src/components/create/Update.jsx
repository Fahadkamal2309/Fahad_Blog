import React, { useState, useEffect, useContext } from 'react';
import { styled, Box, TextareaAutosize, Button, InputBase } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../context/DataProvider';

// 🔵 FULL BACKGROUND
const Wrapper = styled(Box)`
    min-height: 100vh;
    background: linear-gradient(135deg, #1e3c72, #2a5298);
    display: flex;
    justify-content: center;
    padding: 40px 15px;
`;

// 🟣 GLASS CONTAINER
const Container = styled(Box)`
    width: 100%;
    max-width: 900px;
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(12px);
    border-radius: 15px;
    padding: 25px;
    color: white;
    box-shadow: 0 8px 30px rgba(0,0,0,0.3);
`;

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
    borderRadius: '10px'
});

// INPUT FIELD
const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 15px;
    font-size: 20px;
    color: white;
    border-bottom: 1px solid rgba(255,255,255,0.5);
`;

// TEXT AREA
const Textarea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 30px;
    font-size: 18px;
    padding: 10px;
    border-radius: 8px;
    outline: none;
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    category: '',
    createdDate: new Date()
};

const Update = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState(null);
    const { account } = useContext(DataContext);

    const url = post.picture
        ? post.picture
        : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b';

    // FETCH POST
    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        };
        fetchData();
    }, [id]);

    // IMAGE UPLOAD
    useEffect(() => {
        const uploadFile = async () => {
            if (!file) return;

            const data = new FormData();
            data.append("file", file);

            try {
                const response = await API.uploadFile(data);

                if (response?.isSuccess) {
                    setPost(prev => ({
                        ...prev,
                        picture: response.data
                    }));
                }
            } catch (error) {
                console.log(error);
            }
        };

        uploadFile();
    }, [file]);

    // SET USER + CATEGORY
    useEffect(() => {
        setPost(prev => ({
            ...prev,
            category: location.search?.split('=')[1] || 'All',
            username: account?.username
        }));
    }, [location.search, account]);

    // UPDATE POST
    const updateBlogPost = async () => {
        const response = await API.updatePost(post, id);

        if (response?.isSuccess) {
            navigate(`/details/${id}`);
        }
    };

    const handleChange = (e) => {
        setPost(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <Wrapper>

            <Container>

                {/* IMAGE */}
                <Image src={url} alt="post" />

                {/* TOP INPUTS */}
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px"
                }}>

                    <label htmlFor="fileInput">
                        <Add fontSize="large" style={{ color: "white", cursor: "pointer" }} />
                    </label>

                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={(e) => setFile(e.target.files[0])}
                    />

                    <InputTextField
                        name="title"
                        placeholder="Update Title"
                        value={post.title}
                        onChange={handleChange}
                    />

                    <InputTextField
                        name="category"
                        placeholder="Category"
                        value={post.category}
                        onChange={handleChange}
                    />

                    <Button
                        variant="contained"
                        onClick={updateBlogPost}
                        sx={{
                            background: "#00c6ff",
                            ml: 2
                        }}
                    >
                        Update
                    </Button>

                </Box>

                {/* DESCRIPTION */}
                <Textarea
                    minRows={6}
                    placeholder="Update your story..."
                    name="description"
                    value={post.description}
                    onChange={handleChange}
                />

            </Container>

        </Wrapper>
    );
};

export default Update;
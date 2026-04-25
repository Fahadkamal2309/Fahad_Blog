import React, { useState, useEffect, useContext } from 'react';
import {
    styled,
    Box,
    TextareaAutosize,
    Button,
    InputBase,
    FormControl,
    Select,
    MenuItem,
    Typography
} from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../context/DataProvider';
import { categories } from '../../constants/data';

// 🔵 FULL PAGE BACKGROUND
const Wrapper = styled(Box)`
    min-height: 100vh;
    background: linear-gradient(135deg, #1e3c72, #2a5298);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

// 🟣 GLASS CONTAINER
const Container = styled(Box)`
    width: 100%;
    max-width: 950px;
    background: rgba(255,255,255,0.12);
    backdrop-filter: blur(14px);
    border-radius: 18px;
    padding: 30px;
    color: white;
    box-shadow: 0 10px 40px rgba(0,0,0,0.35);
`;

const Image = styled('img')({
    width: '100%',
    height: '45vh',
    objectFit: 'cover',
    borderRadius: '12px',
    marginBottom: '15px'
});

const InputTextField = styled(InputBase)`
    flex: 1;
    font-size: 20px;
    color: white;
    padding: 5px;
    border-bottom: 1px solid rgba(255,255,255,0.5);
`;

const Textarea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 25px;
    font-size: 17px;
    padding: 12px;
    border-radius: 10px;
    outline: none;
    resize: vertical;
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    category: '',
    createdDate: new Date()
};
const categoryImages = {
    "Technology": "https://images.unsplash.com/photo-1518770660439-4636190af475",
    "Web Development": "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    "Programming": "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d",
    "AI & Machine Learning": "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    "Cyber Security": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    "Data Science": "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    "Mobile Apps": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
    "UI/UX Design": "https://images.unsplash.com/photo-1559028012-481c04fa702d",
    "Career & Jobs": "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    "Life Style": "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
    "Health & Fitness": "https://images.unsplash.com/photo-1554284126-aa88f22d8b74",
    "Travel": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "Education": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    "Finance": "https://images.unsplash.com/photo-1565514020179-026b92b2d3c5",
    "Entertainment": "https://images.unsplash.com/photo-1497032205916-ac775f0649ae"
};


const CreatePost = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState(null);
    const { account } = useContext(DataContext);

    const url =
    post.picture && post.picture !== "undefined"
        ? post.picture
        : categoryImages[post.category] ||
          "https://images.unsplash.com/photo-1499750310107-5fef28a66643";

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
            category: location.search?.split('=')[1] || '',
            username: account?.username
        }));
    }, [location.search, account]);

    // SAVE POST
    const savePost = async () => {
        if (!post.title || !post.description) {
            alert("Title and Description are required");
            return;
        }

        if (!post.category) {
            alert("Please select a category");
            return;
        }

        const response = await API.createPost(post);

        if (response?.isSuccess) {
            navigate('/');
        } else {
            console.log(response);
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

                <Typography variant="h5" mb={2}>
                    Create New Post
                </Typography>

                <Image
    src={url}
    alt="post"
    onError={(e) => {
        e.target.src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643";
    }}
/>

                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    flexWrap: "wrap"
                }}>

                    {/* IMAGE UPLOAD */}
                    <label htmlFor="fileInput">
                        <Add fontSize="large" style={{ cursor: "pointer" }} />
                    </label>

                    <input
                        type="file"
                        id="fileInput"
                        hidden
                        onChange={(e) => setFile(e.target.files[0])}
                    />

                    {/* TITLE */}
                    <InputTextField
                        name="title"
                        placeholder="Title"
                        onChange={handleChange}
                    />

                    {/* CATEGORY */}
                    <FormControl sx={{ minWidth: 180 }}>
                        <Select
                            name="category"
                            value={post.category}
                            onChange={handleChange}
                            displayEmpty
                            sx={{
                                color: "white",
                                borderBottom: "1px solid rgba(255,255,255,0.5)"
                            }}
                        >
                            <MenuItem disabled value="">
                                Select Category
                            </MenuItem>

                            {categories.map((cat) => (
                                <MenuItem key={cat.id} value={cat.type}>
                                    {cat.type}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* BUTTON */}
                    <Button
                        variant="contained"
                        onClick={savePost}
                        sx={{
                            background: "#00c6ff",
                            height: "40px"
                        }}
                    >
                        Publish
                    </Button>

                </Box>

                <Textarea
                    minRows={6}
                    placeholder="Tell your story..."
                    name="description"
                    onChange={handleChange}
                />

            </Container>
        </Wrapper>
    );
};

export default CreatePost;
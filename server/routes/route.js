import express from 'express';

import upload from '../utils/upload.js';
import { SignupUser,LoginUser } from '../controller/user-controller.js';
import { uploadImage,getImage } from '../controller/image-controller.js';
import { createPost,getAllPosts,getPost,updatePost,deletePost,addComment,deleteComment} from '../controller/post-contoller.js';
import { authenticateToken } from '../controller/jwt-controller.js';
import { get } from 'mongoose';
const router = express.Router();

router.post('/signup', SignupUser);
router.post('/login',LoginUser);
router.post('/upload', upload.single('file'), uploadImage);

// ✅ for fetching image
router.get('/file/:filename', getImage);
router.post('/create',authenticateToken,createPost);
router.delete('/delete/:id', authenticateToken, deletePost);
router.get('/posts',authenticateToken,getAllPosts);
router.get('/post/:id',authenticateToken,getPost);
router.put('/update/:id', authenticateToken, updatePost);
router.post('/comment/:id', authenticateToken, addComment);
router.delete('/comment/:id/:commentId', authenticateToken, deleteComment);



export default router;
import express from 'express';
import 'dotenv/config';
import { createPost } from './posts/createPost.js';
import { getAllPosts, getPost, getUserPosts } from './posts/getPosts.js';
import { updateReactions } from './reactions/updateReactions.js';
import { createUser } from './user/createUser.js';
import { getUser } from './user/getUser.js';
import { top5Posts, worst5Posts } from './analysis/analysis.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User
app.post('/user/create', createUser);
app.get('/user/:id', getUser);

// Posts
app.post('/posts/create', createPost);
app.get('/posts/all', getAllPosts);
app.get('/posts/user/:id', getUserPosts);
app.get('/post/:id', getPost);

// Reactions
app.put('/reaction/:postId', updateReactions);

// Analysis
app.get('/analysis/top5', top5Posts);
app.get('/analysis/worst5', worst5Posts);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

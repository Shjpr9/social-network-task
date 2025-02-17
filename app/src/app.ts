import express from 'express';
import 'dotenv/config';
import { createPost } from './posts/createPost';
import { getAllPosts, getPost, getUserPosts } from './posts/getPosts';
import { updateReactions } from './reactions/updateReactions';
import { createUser } from './user/createUser';
import { getUser } from './user/getUser';

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

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

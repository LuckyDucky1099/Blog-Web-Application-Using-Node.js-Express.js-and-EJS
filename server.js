//  MiniBlog - server.js

const express = require('express');   
const path = require('path');        
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//  "Database"

let posts = [
  {
    id: 1,
    title: 'Welcome to MiniBlog!',
    author: 'Admin',
    category: 'Tech',
    content: 'This is a sample post to show you how the blog looks. Feel free to edit or delete it, or create your own post using the form above!',
    createdAt: new Date(),
  },
  {
    id: 2,
    title: 'Five Tips for a Healthier Lifestyle',
    author: 'Jamie Health',
    category: 'Lifestyle',
    content: 'Drink more water, sleep at least 7 hours, take walking breaks, eat more greens, and practice gratitude daily. Small habits add up!',
    createdAt: new Date(),
  },
];

let nextId = 3;

const CATEGORIES = ['Tech', 'Lifestyle', 'Education', 'Travel', 'Food', 'Other'];

//  Routes

app.get('/', (req, res) => {
  const selectedCategory = req.query.category || 'All';

  let postsToShow = posts;
  if (selectedCategory !== 'All') {
    postsToShow = posts.filter((post) => post.category === selectedCategory);
  }

  res.render('index', {
    title: 'MiniBlog',
    posts: postsToShow,
    categories: CATEGORIES,
    activeCategory: selectedCategory,
  });
});

app.get('/posts/new', (req, res) => {
  res.render('new', { title: 'New Post', categories: CATEGORIES });
});

app.post('/posts', (req, res) => {
  const author = req.body.author;
  const title = req.body.title;
  const content = req.body.content;
  const category = req.body.category;

  if (!author || !title || !content) {
    return res.render('new', {
      title: 'New Post',
      categories: CATEGORIES,
      error: 'Please fill in your name, a title, and some content.',
    });
  }

  const newPost = {
    id: nextId,
    author: author,
    title: title,
    content: content,
    category: category || 'Other',
    createdAt: new Date(),
  };
  nextId = nextId + 1;

  posts.push(newPost);

  res.redirect('/');
});

app.get('/posts/:id', (req, res) => {
  const postId = Number(req.params.id);
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return res.status(404).render('404', { title: 'Post Not Found' });
  }

  res.render('show', { title: post.title, post: post });
});

app.get('/posts/:id/edit', (req, res) => {
  const postId = Number(req.params.id);
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return res.status(404).render('404', { title: 'Post Not Found' });
  }

  res.render('edit', { title: 'Edit Post', post: post, categories: CATEGORIES });
});


app.post('/posts/:id/edit', (req, res) => {
  const postId = Number(req.params.id);
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return res.status(404).render('404', { title: 'Post Not Found' });
  }

  const author = req.body.author;
  const title = req.body.title;
  const content = req.body.content;
  const category = req.body.category;

  if (!author || !title || !content) {
    return res.render('edit', {
      title: 'Edit Post',
      post: { ...post, author, title, content, category },
      categories: CATEGORIES,
      error: 'Please fill in your name, a title, and some content.',
    });
  }

  post.author = author;
  post.title = title;
  post.content = content;
  post.category = category || 'Other';

  res.redirect('/');
});

app.post('/posts/:id/delete', (req, res) => {
  const postId = Number(req.params.id);

  posts = posts.filter((post) => post.id !== postId);

  res.redirect('/');
});

app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});


app.listen(PORT, () => {
  console.log('MiniBlog server running at http://localhost:' + PORT);
});

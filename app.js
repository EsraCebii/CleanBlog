const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const path = require('path');
const ejs = require('ejs');

const Post = require('./models/Post');
const postController = require('./controllers/postController');
const pageController = require('./controllers/pageController');

const app = express();

// connect DB
mongoose.connect('mongodb://localhost/blog-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Template Engine
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(methodOverride('_method', {
  methods: ['POST','GET']
}));


//ROUTES
app.get('/', postController.getAllPosts);
app.get('/posts/:id', postController.getPost);
app.post('/posts', postController.createPost);
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id', postController.deletePost);

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/posts/edit/:id', pageController.getEditPage);



const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});

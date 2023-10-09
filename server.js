// Imports
const express = require('express');
const path = require('path');

const app = express();

const login = false;

// Middleware function to user

app.use('/user', (req, res, next) => {
  if(login) next();
  else  res.send('<h1>You need to login first</h1>');
});

// Middleware function to patch to endpoints

app.use((req, res, next) => {
  res.show = (name) => {
    res.sendFile(path.join(__dirname, `/views/${name}`));
  };
  next();
});

// Middleware to files in public folder

app.use(express.static(path.join(__dirname, '/public')));

// Endpoints to pages

app.get('/', (req, res) => {
  res.show('index.html');
});

app.get('/home', (req, res) => {
  res.show('index.html');
});

app.get('/about', (req, res) => {
  res.show('about.html');
});

// Middleware for no endpoint
app.use((req, res) => {
  res.status(404).show('not_found.html');
})

app.listen(3000, () => {
  console.log('Server is running on port: 3000');
});
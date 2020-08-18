const express = require('express');

const app = express();

app.use(express.json());

app.get('/projects', (req, res) => {
  console.log(req.query);

  return res.json([
    'Project 1',
    'Project 2',
    'Project 3'
  ]);
});

app.post('/projects', (req, res) => {
  const {title, owned} = req.body;
  console.log(title, owned);  

  return res.json([
    'Project 1',
    'Project 2',
    'Project 3',
    'Project 4'
  ]);
});

app.put('/projects/:id', (req, res) => {
  console.log(req.params);

  return res.json([
    'Project 5',
    'Project 2',
    'Project 3',
    'Project 4'
  ]);
});

app.delete('/projects/:id', (req, res) => {
  console.log(req.params);

  return res.json([
    'Project 2',
    'Project 3',
    'Project 4'
  ]);
});

app.listen(3333, () => console.log('Back-end started!'));
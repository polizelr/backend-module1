const { uuid, isUuid } = require('uuidv4');
const express = require('express');

const app = express();

app.use(express.json());

const projects = [];

function logRequests (req, res, next) {
  const { method, url} = req;

  const label = `[${method.toUpperCase()}] ${url}`

  console.log(label);

  return next();
}

function validateProjectId (req, res, next) {
  const {id} = req.params;

  if(!isUuid(id)) {
    return res.status(400).json({error: "Invalid project ID."});
  }

  return next();
}

app.use(logRequests);

app.use('/projects/:id', validateProjectId);

app.get('/projects', (req, res) => {

  const { title } = req.query;

  const results = title ? 
    projects.filter(project => project.title.includes(title)) :
    projects

  return res.json(results);
});

app.post('/projects', (req, res) => {
  const {title, owner} = req.body;

  const project = {id: uuid(), title, owner};

  projects.push(project);
  
  return res.json(project);
});

app.put('/projects/:id', (req, res) => {
  const { id } = req.params;

  const {title, owner} = req.body;

  const index = projects.findIndex(project => project.id == id);

  if(index < 0){
    return res.status(400).json({error: 'Project not found.'});
  }

  const project = {
    id,
    title,
    owner,
  };
  
  projects[index] = project;

  return res.json(project);
});

app.delete('/projects/:id', (req, res) => {
  const {id} = req.params;

  const index = projects.findIndex(project => project.id == id);

  if(index < 0){
    return res.status(400).json({message: 'Project not found.'});
  }

  projects.splice(index, 1);

  //no content response
  return res.status(204).send();
});

app.listen(3333, () => console.log('Back-end started!'));
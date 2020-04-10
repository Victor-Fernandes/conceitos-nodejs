const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  return res.json(repositories)
});

app.post("/repositories", (req, res) => {
  const {title, url, techs} = req.body;

  const repository = {
    id: uuid(),
    title, 
    url, 
    techs,
    likes: 0,
  }

  repositories.push(repository);

  return res.json(repository);
});

app.put("/repositories/:id", (req, res) => {
  const {id} = req.params;
  const {title, url, techs} = req.body;

  const findRepository = repositories.findIndex(repository =>
      repository.id === id
    );

  if(findRepository < 0) {
    return res.status(400).json({error: 'Repository does not exist!'})
  }

  repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[findRepository].likes,
  }

  repositories[findRepository] = repository;

  return res.json(repository)

});

app.delete("/repositories/:id", (req, res) => {
  const {id} = req.params;

  const findRepository = repositories.findIndex(repository =>
      repository.id === id
    );

  if(findRepository >= 0) {
    repositories.splice(findRepository, 1);
  }else {
    return res.status(400).json({error: 'Repository does not exist!'})
  }

  return res.status(204).send();
});

app.post("/repositories/:id/like", (req, res) => {
  const {id} = req.params;

  const findRepository = repositories.find(repository =>
      repository.id === id
    );
  
  if(!findRepository) {
    return res.status(400).json({error: 'Repository does not exist!'})
  }

  findRepository.likes +=1;

  return res.json(findRepository)
});

module.exports = app;

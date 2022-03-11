const express = require("express");
const routes = express.Router();

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("data/ecoalDB");
const verify=require('./connectionRouter').verify; // middleware function to protect routes

module.exports = routes;

routes
  .get("/", (req, res) => {
    res.json("Hello world!!");
  })

  .get("/articles", (req, res) => {

    db.all(`select * from article`, (err, rows) => res.json(rows));

  })

  .get('/search/:title', (req, res) => {
    let request = req.params.title;
    db.all(`select * from article WHERE title LIKE "%${request}%"`, (err, rows) => {
      res.json(rows)
    });

  })

  .post("/articles/new", verify,(req, res) => {
    req.files.thumbnail.mv(`./thumbnail/${req.files.thumbnail.name}`);
    req.files.media.mv(`./media/${req.files.media.name}`);

    let query = `insert into article (title, content, thumbnailURL, mediaType, mediaURL, leadStory)  values ('${req.body.title}', '${req.body.content}', '${req.files.thumbnail.name}', '${req.files.media.mimetype}', '${req.files.media.name}', NULL)`;

    db.run(query);
  })

  .delete("/articles/delete/:id", verify,(req, res) => {
    db.run(`delete from article where id=${req.params.id}`);
  })

  .get('/user/register/:name', (req, res) => {
    let request = req.params.name;
    db.all(`select * from users WHERE name LIKE "%${request}%"`, (err, rows) => {
      res.json(rows)
    });
  })

  .post('/user/register', (req, res) => {
    let name = req.body.name;
    let password = req.body.password;
    db.all(`insert into users(name, password) values('${name}', '${password}')`);
  })

  .get('/user/login/:name/:password', (req, res) => {
    let name = req.params.name;
    let password = req.params.password;
    db.all(`select * from users where name = '${name}' AND password = '${password}'`, (err,rows) => {
      console.log(err);
      res.json(rows)
    });
  })

  .get('/articles/lead', (req, res) => {
    db.all("select * from article where leadStory = 1", (err, rows) => {
      console.log(err);
      res.json(rows);
    });
    
  })

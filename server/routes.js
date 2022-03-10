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

  .get("/search/:title", (req, res) => {
    let request = req.params.title;
    db.all(
      `select * from article WHERE title LIKE "%${request}%"`,
      (err, rows) => {
        res.json(rows);
      }
    );
  })

  .post("/articles/new", (req, res) => {
    if (req.files.media) {
      req.files.thumbnail.mv(`./thumbnail/${req.files.thumbnail.name}`);
      req.files.media.mv(`./media/${req.files.media.name}`);
      db.run(
        `insert into article (title, content, thumbnailURL, mediaType, mediaURL, leadStory)  values ('${req.body.title}', '${req.body.content}', '${req.files.thumbnail.name}', '${req.files.media.mimetype}', '${req.files.media.name}', ${req.body.leadStory})`
      );
    } else {
      req.files.thumbnail.mv(`./thumbnail/${req.files.thumbnail.name}`);
      db.run(
        `insert into article (title, content, thumbnailURL, leadStory)  values ('${req.body.title}', '${req.body.content}', '${req.files.thumbnail.name}', ${req.body.leadStory})`
      );
    }
  })

  .delete("/articles/delete/:id", verify,(req, res) => {
    db.run(`delete from article where id=${req.params.id}`);
  })


  .get("/article/:id", (req, res) => {
    db.all(`select * from article where id=${req.params.id}`, (err, rows) =>
      res.json(rows)
    );
  })

  .get("/leadarticles", (req, res) => {
    db.all(`select * from article where leadStory=1`, (err, rows) =>
      res.json(rows)
    );
  })

  .put("/editarticle/:id", (req, res) => {
    if (!req.files) {
      db.run(
        `update article set title='${req.body.title}', content='${req.body.content}' where id=${req.params.id}`
      );
    } else {
      if (req.files.thumbnail && !req.files.media) {
        req.files.thumbnail.mv(`./thumbnail/${req.files.thumbnail.name}`);
        db.run(
          `update article set title='${req.body.title}', content='${req.body.content}', thumbnailURL='${req.files.thumbnail.name}' where id=${req.params.id}`
        );
      } else if (!req.files.thumbnail && req.files.media) {
        req.files.media.mv(`./media/${req.files.media.name}`);
        db.run(
          `update article set title='${req.body.title}', content='${req.body.content}', mediaURL='${req.files.media.name}' where id=${req.params.id}`
        );
      } else {
        req.files.thumbnail.mv(`./thumbnail/${req.files.thumbnail.name}`);
        req.files.media.mv(`./media/${req.files.media.name}`);
        db.run(
          `update article set title='${req.body.title}', content='${req.body.content}', mediaURL='${req.files.media.name}', thumbnailURL='${req.files.thumbnail.name}' where id=${req.params.id}`
        );
      }
    }
  })

  .get("/tags", (req, res) => {
    db.all(`select * from tag`, (err, rows) => res.json(rows));
  })

  .post("/tags", (req, res) => {
    db.run(`INSERT INTO tag (name) values ('${req.body.name}')`);
  })

  .post("/articletags/:id", (req, res) => {
    for (let i = 0; i < req.body.tags.length; i++) {
      db.all(
        `select id from tag where name='${req.body.tags[i]}'`,
        (err, row) => {
          db.run(
            `INSERT INTO article_tag (idArticle, idTag) values (${req.params.id},${row[0].id})`
          );
        }
      );
    }
  });

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


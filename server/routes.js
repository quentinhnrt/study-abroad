const express = require("express");
const routes = express.Router();

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("data/ecoalDB");

module.exports = routes;

routes
  .get("/", (req, res) => {
    res.json("Hello world!!");
  })

  .get("/articles", (req, res) => {
    console.log(req.query.title);
    if (req.query.title != "") {
      db.all(`select * from article WHERE title LIKE %${req.query.title}%`, (err, rows) => res.json(rows));
    } else {
      db.all(`select * from article`, (err, rows) => res.json(rows));
    }
  })

  .post("/articles/new", (req, res) => {
    req.files.thumbnail.mv(`./media/${req.files.thumbnail.name}`);

    let query = `insert into article (title, content, thumbnailURL, mediaType, mediaURL, leadStory)  values ('${req.body.title}', '${req.body.content}', '${req.files.thumbnail.name}', '${req.files.thumbnail.mimetype}', '${req.files.thumbnail.name}', NULL)`;

    db.run(query);
  });

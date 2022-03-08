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
    db.all("select * from article", (err, rows) => res.json(rows));
  })

  .post("/articles/new", (req, res) => {
    req.files.thumbnail.mv(`./thumbnail/${req.files.thumbnail.name}`);
    req.files.media.mv(`./media/${req.files.media.name}`);

    let query = `insert into article (title, content, thumbnailURL, mediaType, mediaURL, leadStory)  values ('${req.body.title}', '${req.body.content}', '${req.files.thumbnail.name}', '${req.files.media.mimetype}', '${req.files.media.name}', NULL)`;

    db.run(query);
  })

  .delete("/articles/delete/:id", (req, res) => {
    db.run(`delete from article where id=${req.params.id}`);
  });

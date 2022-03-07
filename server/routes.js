const express = require("express");
const routes = express.Router();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data/ecoalDB');

module.exports = routes;

routes
    .get("/", (req, res) => {
        res.json("Hello world!!");
    })

    .get("/articles", (req,res) => {
            db.all(
                     "select * from article",
                     (err, rows) => res.json(rows)
          );

    })

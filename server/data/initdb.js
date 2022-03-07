

const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database('./data/ecoalDB', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE
, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the ecoal database.');
    }
});


let query = [
"PRAGMA foreign_keys = ON",
"DROP TABLE IF EXISTS article",
"DROP TABLE IF EXISTS tag",
"DROP TABLE IF EXISTS article_tag",
"CREATE TABLE article (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, content TEXT NOT NULL, thumbnailURL TEXT, mediaType TEXT, mediaURL TEXT, leadStory INTEGER)",
"CREATE TABLE tag (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)",
"CREATE TABLE article_tag (id INTEGER PRIMARY KEY AUTOINCREMENT, idArticle INTEGER REFERENCES article(id), idTag INTEGER REFERENCES tag(id))",
"INSERT INTO article (title, content, thumbnailURL, mediaType, mediaURL) values ('Welcome to ecoal22', '<h1>Hello from ecoal</h1><p>Nice to see you in <strong>Lens</strong>. Enjoy !</p>', 'ecoal.jpg', 'image', 'ecoal.jpg')",
"INSERT INTO tag (name) values ('ecoal22')",
"INSERT INTO tag (name) values ('reactJS')",
"INSERT INTO article_tag (idArticle, idTag) values (1,1)",
"INSERT INTO article_tag (idArticle, idTag) values (1,2)"
]


db.serialize( () => {

query.forEach(item => {
  db.run(item, err =>  {
    if (err)
      return console.error(err.message)
    console.log(item + ` done`)
  })
})

})

db.close(err => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Close the database connection.');
});

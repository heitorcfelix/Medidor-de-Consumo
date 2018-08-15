var http = require('http');
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({ extended: false }));

var valor_atual;


let db = new sqlite3.Database('database.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
    console.error(err.message);
    }
});

let sql = `SELECT id id,
           valor_medido valor_medido
           FROM medidor_de_consumo
           ORDER BY id DESC;`

db.get(sql, [], (err, row) => {
    valor_atual = row.valor_medido;
}); 

db.close((err) => {
    if (err) {
    console.error(err.message);
    }
});

app.get("/", (req, res) => { res.render("index", { name: valor_atual}); });
app.listen(8080, () => { console.log("Server online on http://localhost:8080"); });
var http = require('http');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({ extended: false }));

var valor_atual;

var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Medidor_de_Consumo");
    var mysort = { _id: -1 };
    dbo.collection("Medidor_de_Consumo").find().sort(mysort).toArray(function(err, result) {
        if (err) throw err;
        valor_atual = result[0].valor_medido;
        db.close();
    });
});

app.get("/", (req, res) => { res.render("index", { name: valor_atual}); });
app.listen(8080, () => { console.log("Server online on http://localhost:8080"); });
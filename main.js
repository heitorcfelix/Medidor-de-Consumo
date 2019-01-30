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
var consumo_diario;
var soma_consumo;
var preco_kwh;

var d = new Date();
var data_atual = d.getDate() + "/" + d.getMonth() + 1 + "/" + d.getFullYear()

if (d.getDate() < 10) {
	data_atual = 0 + data_atual
}

let db = new sqlite3.Database('database.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
    	console.error(err.message);
    }
});

let sql = `SELECT id id,
           valor_medido valor_medido
           FROM medidor_de_consumo
           WHERE data = ?
           ORDER BY id DESC;`

db.all(sql, [data_atual], (err, rows) => {
	if (rows.length < 1) {
		valor_atual = "Sem medidas"
		consumo_diario = "Sem medidas"
	} else {
	    valor_atual = (rows[0].valor_medido / 1000).toFixed(4) + " kW";

	    let soma_sql = `SELECT sum(valor_medido)
				FROM medidor_de_consumo
				WHERE data = ?;`

		db.get(soma_sql, [data_atual], (err, row) => {
			soma_consumo = Number(row['sum(valor_medido)']);
			consumo_diario = ((soma_consumo / 3600) / 1000).toFixed(4) + " kWh";
		});
	}
});

db.close((err) => {
    if (err) {
    console.error(err.message);
    }
});

app.get("/", (req, res) => {
	if (req.query.preco == undefined) {
		preco_kwh = "Insira o valor do kWh"
	} else {
		preco_kwh = "R$ " + (req.query.preco * consumo_diario.substring(0, consumo_diario.length - 4)).toFixed(2);
	}
	res.render("index", { atual: valor_atual, diario: consumo_diario, preco: preco_kwh });
});

app.listen(8080, () => { console.log("Server online on http://localhost:8080"); });
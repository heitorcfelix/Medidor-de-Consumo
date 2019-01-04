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
var hora_primeira_medicao;
var hora_ultima_medicao;
var consumo_diario;
var media_consumo;
var tempo_consumo;

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
		   hora hora,
           valor_medido valor_medido
           FROM medidor_de_consumo
           WHERE data = ?
           ORDER BY id DESC;`

db.all(sql, [data_atual], (err, rows) => {
	if (rows.length < 1) {
		valor_atual = "Sem medidas"
		consumo_diario = "Sem medidas"
	} else {
	    valor_atual = rows[0].valor_medido;
	    hora_primeira_medicao = rows[rows.length - 1].hora;
	    hora_ultima_medicao = rows[0].hora;

	    tempo_consumo  = Number(hora_ultima_medicao.substr(0,2)) + Number(hora_ultima_medicao.substr(3,2))/60
	    			- Number(hora_primeira_medicao.substr(0,2)) - Number(hora_primeira_medicao.substr(3,2))/60;


	    let media_sql = `SELECT avg(valor_medido)
				FROM medidor_de_consumo
				WHERE data = ?;`

		db.get(media_sql, [data_atual], (err, row) => {
			media_consumo = Number(row['avg(valor_medido)']);
			consumo_diario = (media_consumo * tempo_consumo).toFixed(2) + " kWh";
		});
	}
});

db.close((err) => {
    if (err) {
    console.error(err.message);
    }
});

app.get("/", (req, res) => { res.render("index", { atual: valor_atual, diario: consumo_diario }); });
app.listen(8080, () => { console.log("Server online on http://localhost:8080"); });
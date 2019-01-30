#!/usr/bin/python

import sqlite3
from time import strftime, localtime, sleep
from serial import Serial

def conectar(db_file):
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except Exception as e:
        print(e)
    return None

def inserirValor(valor):
    database = "database.db"
    conn = conectar(database)
    with conn:
        hora = strftime("%H:%M:%S", localtime())
        data = strftime("%d/%m/%Y", localtime())
        medida = (hora, data, valor)

        sql = ''' INSERT INTO medidor_de_consumo(hora,data,valor_medido)
                VALUES(?,?,?) '''
        cur = conn.cursor()
        cur.execute(sql, medida)

ser = Serial('/dev/ttyACM0', 9600, 8, 'N', 1, timeout=5)
print("Iniciando leitura...")
while True:
    output = ser.readline()
    print("Valor lido:" + output.decode("utf-8")[:-1])
    if output != '':
        inserirValor(output)
        sleep(1)

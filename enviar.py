#!/usr/bin/python

import serial
from time import strftime, localtime

def conectar(db_file):
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except Error as e:
        print(e)

    return None

def inserir_medida(conn, medida):
    sql = ''' INSERT INTO medidor_de_consumo(hora,data,valor_medido)
                VALUES(?,?,?) '''
    cur = conn.cursor()
    cur.execute(sql, medida)
    return cur.lastrowid

def main(valor):
    database = "database.db"
 
    conn = conectar(database)
    with conn:
        hora = strftime("%H:%M:%S", localtime())
        data = strftime("%d-%m-%Y", localtime())
        medida = (hora, data, valor)
        inserir_medida(conn, medida)

ser = serial.Serial('/dev/ttyUSB0', 9600, 8, 'N', 1, timeout=5)
while True:
    output = ser.readline()
    if output != '':
        main(output)
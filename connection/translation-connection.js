//CREO LA CONEXION A LA BASE DE DATOS
'use strict';

import * as mysql from 'mysql';

import * as conf from './db-conf.json'
  
const dbOptions = {
		host: conf.mysql.host,
		user: conf.mysql.user,
		password: conf.mysql.password,
		port: conf.mysql.port,
		database: conf.mysql.db
	},
	  myConn = mysql.createConnection(dbOptions)
	  myConn.connect((err) => {
		return (err) ? console.log(`Error al Conectarse a MySQL: ${err.stack}`) : console.log(`Conexion establecida con MySQL N°: ${myConn.threadId}`)
	// stack: en que archivo
	})

export default myConn;

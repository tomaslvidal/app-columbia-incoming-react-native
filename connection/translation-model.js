import conn from './translation-connection';

export default class TranslationModel {

	getAll(callback) {
		conn.query('SELECT * FROM clientes', callback);
	}

	getOne(data, callback) {
		conn.query('SELECT * FROM clientes WHERE id = ?', data, callback)
	}

	save(data, callback){
		conn.query('SELECT * FROM clientes WHERE id = ?', data.id, (err, rows)=>{
			console.log(rows.length)

			if(err)
			{
				return err
			}
			else
			{
				if(rows.length>=1){
					return conn.query('UPDATE clientes SET ? WHERE id = ?', [data, data.id], callback);
				}
				else{
					return conn.query('INSERT INTO clientes SET ?', data, callback);
				}
			}
		})
	}

	delete(data, callback){
		conn.query('DELETE FROM clientes where id = ?', data, callback)
	}

}

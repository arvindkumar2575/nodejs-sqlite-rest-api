const sqlite3 = require('sqlite3');
const db_file = 'db/tbl_osn.db'


const getSingle = (t_name, where = null) => {
	return new Promise((resolve,reject)=>{
		let sql = ``
		if (where == null) {
			sql = sql + `SELECT * FROM ${t_name} ORDER BY id DESC`
		} else {
			sql = sql + `SELECT * FROM ${t_name} WHERE ${where} ORDER BY id DESC`
		}
		const db = new sqlite3.Database(db_file);
		db.get(sql, (err, row) => {
			if (err) {
				reject(err.message)
			}
			db.close()
			resolve(row)
		});
	})
};


const insertAll = (t_name, arr = {}) => {
	return new Promise((resolve, reject) => {
		let names = Object.keys(arr).map(e => e).join(',')
		let placeholders = Object.values(arr).map(e => '?').join(',')
		let sql = `INSERT INTO ${t_name}(${names}) VALUES (${placeholders})`
		const db = new sqlite3.Database(db_file);
		db.run(sql, ...Object.values(arr), (err) => {
			if (err) {
				reject(err.message)
			}
			db.close()
			resolve(`Rows inserted ${this.changes}`)
		});
	})
};

const selectAll = (t_name) => {
	return new Promise((resolve, reject) => {
		let sql = `SELECT * FROM ${t_name}`
		const db = new sqlite3.Database(db_file);
		db.all(sql, (err, rows) => {
			if (err) {
				reject(err.message)
			}
			db.close()
			resolve(rows)
		});
	})
};

module.exports = { selectAll,getSingle,insertAll }
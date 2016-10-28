var mysql = require('mysql');
function OptPool(){
	this.flag = true;
	this.pool = mysql.createPool({
		host: 'localhost',
		user: 'root',
		password: '123321',
		database: 'example',
		port: '3306'
	});
	this.getPool = function(){
		if(this.flag){
			this.pool.on('connection',function(connection){
				connection.query('set session auto_increment_increment')
				this.flag = false
			})
		}
		return this.pool;
	}
}
module.exports = OptPool;
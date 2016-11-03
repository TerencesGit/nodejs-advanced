var OptPool = require('./models/mysqlPoolOpt');
var optPool = new OptPool();
var pool = optPool.getPool();
//从连接池获取连接
module.exports = {
	//插入
	insert: function(name, passwd){
		pool.getConnection(function(err, conn){
			var sql = 'insert into user (username,password) value(?,?)';
			var params = [name, passwd];
			conn.query(sql, params, function(err){
				if(err){
					console.log(err.message);
					return;
				}
				console.log('insert success!')
				conn.release();
			})
		})	
	},
	//删除
	delete: function(userid){
		pool.getConnection(function(err, conn){
			var userSql = 'delete from user where id = (?)';
			var param =[userid];
			conn.query(userSql, param, function(err){
				if(err) {
					console.log(err.message)
					return;
				} 
				console.log('delete success!')
				conn.release()
			})
		})
	},
	//修改
	update: function(name, userid){
		pool.getConnection(function(err, conn){
			var sql = 'update user set username = (?) where id = (?)';
			var params = [name , userid]
			conn.query(sql, params, function(err){
				if(err) {
					console.log(err.message) 
					return;
				}
				console.log('update success!')
			})
			conn.release()
		})
	},
	//查询全部
	selectAll: function(user, recall){
		pool.getConnection(function(err, conn){
			conn.query('select * from user', function(err, user){
				if(err) {
					console.log(err.message) 
					return;
				}
				recall(user)
			})
			conn.release()
		})
	},
	findById: function(userid, recall){
		pool.getConnection(function(err, conn){
			var sql = 'select * from user where id = (?)';
			var param =[userid];
			conn.query(sql,param,function(err,user){
					if(err) {
						console.log(err.message) 
						return;
					}
					recall(user);
			})
		})
	},
	findByName: function(name, recall){
		pool.getConnection(function(err, conn){
			var sql = 'select * from user where username = (?)';
			var param =[name];
			conn.query(sql,param,function(err,user){
					if(err) {
						console.log(err.message) 
						return;
					}
					recall(user);
			})
		})
	},
	findUser: function(name, passwd, recall){
		pool.getConnection(function(err, conn){
			var sql = 'select * from user where username = (?) and password = (?)';
			var params =[name, passwd];
			conn.query(sql, params, function(err,user){
					if(err) {
						console.log(err.message) 
						return;
					}
					recall(user);
			})
		})
	}
}
/*
pool.getConnection(function(err, conn){
	插入
	var userSql = 'insert into student value(?,?,?)';
	var params = [8, 'jack','math'];
	conn.query(userSql,params,function(err){
		if(err){
			console.log(err.message);
			return;
		}
		console.log('insert success!')
		conn.release();
	});
	删除
	var delSql = 'delete from student where id = (?)';
	var params = [3];
	conn.query(delSql,params,function(err){
			if(err){
				console.log(err.message);
				return;
			}
			console.log('delete success!')
	});
	修改
	var updateSql = 'update student set name = (?) where id = (?)';
	params = ['tom', 2];
	conn.query(updateSql,params,function(err){
		if(err){
				console.log(err.message);
				return;
			}
			console.log('update success!')
	})
	查询
	conn.query('select * from student',function(err,result){
		if(err){
			console.log(err.message);
			return;
		}
		for(var i = 0; i<result.length; i++){
			console.log(result[i].id+'--'+result[i].name+'--'+result[i].course)
		}
		conn.release();
	});
})*/
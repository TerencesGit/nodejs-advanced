var OptPool = require('./models/mysqlPoolOpt');

var optPool = new OptPool();
var pool = optPool.getPool();
//从连接池获取连接
pool.getConnection(function(err, conn){
	//插入
	// var userSql = 'insert into student value(?,?,?)';
	// var params = [8, 'jack','math'];
	// conn.query(userSql,params,function(err){
	// 	if(err){
	// 		console.log(err.message);
	// 		return;
	// 	}
	// 	console.log('insert success!')
	// 	conn.release();
	// });
	//删除
	var delSql = 'delete from student where id = (?)';
	var params = [3];
	conn.query(delSql,params,function(err){
			if(err){
				console.log(err.message);
				return;
			}
			console.log('delete success!')
	});
	//修改
	var updateSql = 'update student set name = (?) where id = (?)';
	params = ['tom', 2];
	conn.query(updateSql,params,function(err){
		if(err){
				console.log(err.message);
				return;
			}
			console.log('update success!')
	})
	//查询
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
})
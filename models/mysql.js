var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123321',
	database: 'example',
	port: '3306'
})
//创建一个连接
connection.connect(function(err){
	if(err){
		console.log(err)
		return;
	}
	console.log('mysql connect cuccess!')
})
//插入数据
// var userSql = 'insert into student values(?,?)';
// var param = ['tom','english'];
// connection.query(userSql,param,function(err, result){
// 	if(err){
// 		console.log(err)
// 		return;
// 	}
// 	console.log('insert success!')
// })
//查询
connection.query('select * from student',function(err, result){
	if(err){
		console.log(err)
		return;
	}
	for(var i = 0;i<result.length;i++){
		console.log(result[i].id+'--'+result[i].name+'--'+result[i].course)
	}
})
//关闭连接
connection.end(function(err){
	if(err){
		console.log(err.toString())
		return;
	}
	console.log('connect close!')
})
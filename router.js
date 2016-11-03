var rf = require('./models/readfile');
var wf = require('./models/writefile');
var url = require('url');
var querystring = require('querystring');
var mysql = require('./mysqlPool');
function getRecall(req, res){
	res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
	function recall(data){
		res.write(data)
		res.end()
	}
	return recall;
}
module.exports = {
	'': function(req, res){
		recall = getRecall(req, res);
		rf.readfile('./views/index.html',recall)
	},
	logins: function(req, res){
		//get方式
		/*var user = url.parse(req.url,true).query;
		if(user.name != undefined){
			console.log(user.name)
		}
		if(user.password != undefined){
			console.log(user.password)
		}*/
		//post方式
		var post = '';
		req.on('data', function(chunk){
			post += chunk
		})
		req.on('end', function(){
			post = querystring.parse(post)
			//recall = getRecall(req, res);
			var arr = ['name','password']
			function recall(data){
				dataStr = data.toString()
				for(var i = 0;i<arr.length;i++){
					var reg = new RegExp('{'+arr[i]+'}','g');
					dataStr = dataStr.replace(reg, post[arr[i]])
				}
				res.write(dataStr)
				res.end()
			}
		  rf.readfile('./views/login.html',recall)
		})
		// recall = getRecall(req, res);
		// rf.readfile('./views/login.html',recall)
	},
	login: function(req, res){
		recall = getRecall(req, res);
		rf.readfile('./views/login.html',recall)
	},
	register: function(req, res){
		recall = getRecall(req, res);
		rf.readfile('./views/register.html',recall)
	},
	Register: function(req, res){
		var post = '';
		req.on('data', function(chunk){
			post += chunk
		})
		req.on('end', function(){
			post = querystring.parse(post)
			var name = post.username;
			var passwd = post.password;
			mysql.findByName(name, function(user){
				if(user.length){
					console.log('用户名已存在！')
					recall = getRecall(req, res);
		  		rf.readfile('./views/register.html',recall)
				}else{
					mysql.insert(name, passwd)
					console.log('注册成功！')
					recall = getRecall(req, res);
		  		rf.readfile('./views/login.html',recall)
				}
			})
		})
	},
	Login: function(req, res){
		var post = '';
		req.on('data', function(chunk){
			post += chunk
		})
		req.on('end', function(){
			post = querystring.parse(post)
			var name = post.username;
			var passwd = post.password;
			mysql.findUser(name, passwd, function(user){
				if(user.length){
					console.log('登录成功！')
					recall = getRecall(req, res);
		  		rf.readfile('./views/index.html',recall)
				}else{
					console.log('登录失败！')
					recall = getRecall(req, res);
		  		rf.readfile('./views/login.html',recall)
				}
			})
		})
	},
	selectAll: function(req, res){
		mysql.selectAll('user',function(user){
			for(var i = 0; i<user.length;i++){
		  	console.log(user[i].id+'---'+user[i].username+'---'+user[i].password)
			}
		});
		recall = getRecall(req, res);
		rf.readfile('./views/login.html',recall)
	},
	rfs: function(req, res){
		res.write(rf.readfileSync('./views/login.html'))
		res.end('OK')
	},
	rf: function(req, res){
		function recall(data){
			res.write(data)
			res.end('OK')
		}
		rf.readfile('./views/login.html',recall)
	},
	wf: function(req, res){
		function recall (data){
			res.write(data)
			res.end('OK')
		}
		wf.writefile('./views/file.txt','写入文件内容',recall)
	},
	wfs: function(req, res){
		wf.writefileSync('./views/file.txt','同步写入文件内容')
	},
	showImg: function(req, res){
		res.writeHead(200, {'Content-Type': 'image/jpeg'})
		rf.readImg('./public/images/dasheng.jpg', res)
	},
	error: function(req, res, err){
		res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
		res.write(err.toString())
		res.end('error')
	},
	exception: function(flag){
		if(flag == 0){
			throw '例外情况'
		}
		return 'success'
	}
}
var rf = require('./models/readfile');
var wf = require('./models/writefile');
var url = require('url');
function getRecall(req, res){
	res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
	function recall(data){
		res.write(data)
		res.end()
	}
	return recall;
}
module.exports = {
	login: function(req, res){
		var user = url.parse(req.url,true).query;
		if(user.name != undefined){
			console.log(user.name)
		}
		if(user.password != undefined){
			console.log(user.password)
		}
		recall = getRecall(req, res);
		rf.readfile('./views/login.html',recall)
	},
	register: function(req, res){
		recall = getRecall(req, res);
		rf.readfile('./views/register.html',recall)
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
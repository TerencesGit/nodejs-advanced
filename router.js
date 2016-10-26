var rf = require('./models/readfile');
var wf = require('./models/writefile');
module.exports = {
	login: function(req,res){
		function recall(data){
			res.write(data)
			res.end('OK')
		}
		rf.readfile('./views/login.html',recall)
	},
	register: function(req, res){
		function recall(data){
			res.write(data)
			res.end('OK')
		}
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
	}
}
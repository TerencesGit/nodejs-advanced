var rf = require('./readfile')
module.exports = {
	login: function(req,res){
		function recall(data){
			res.write(data)
			res.end('OK')
		}
		rf.readfile('./views/login.html',recall)
	},
	register: function(req,res){
		function recall(data){
			res.write(data)
			res.end('OK')
		}
		rf.readfile('./views/register.html',recall)
	},
	rfs: function(req,res){
		res.write(rf.readfileSync('./views/index.html'))
		res.end('OK')
	},
	rf: function(req,res){
		function recall(data){
			res.write(data)
			res.end('OK')
		}
		rf.readfile('./views/index.html',recall)
	}
}
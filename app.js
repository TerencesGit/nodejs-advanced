var http = require('http');
var url = require('url');
var router = require('./router');
http.createServer(function(req, res){
	if(req.url !== '/favicon.ico'){//清除二次访问
		var pathname = url.parse(req.url).pathname;
		pathname = pathname.replace(/\//,'');
		router[pathname](req, res);
	}
}).listen(3000)
console.log('Server running at post 3000')
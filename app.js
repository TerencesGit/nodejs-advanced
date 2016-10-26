var http = require('http');
var url = require('url');
var router = require('./router');
http.createServer(function(req, res){
	//res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
	res.writeHead(200, {'Content-Type': 'image/jpg'})
	if(req.url !== '/favicon.ico'){
		var pathname = url.parse(req.url).pathname;
		pathname = pathname.replace(/\//,'');
		router[pathname](req, res)
	}
}).listen(3000)
console.log('Server running at post 3000')
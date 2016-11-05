var http = require('http');
var parseUrl = require('url').parse;
var data = require('./models/data');
var connect = require('connect');
var app = connect();

function getNews(id){
	return data[id] || '文章不存在!'
}
app.use(function(req,res,next){
	res.send = function send(html){
		res.writeHead(200, {
			'Content-Type': 'text/html;charset=utf-8'
		})
		res.end(html)
	}
	next()
})
app.use(function(req,res,next){
	var info = parseUrl(req.url, true);
	req.pathname = info.pathname;
	req.query = info.query;
	next()
})
app.use(function(req,res,next){
		if(req.pathname == '/'){
			res.send(
				'<ul>'+
					'<li><a href="/item?cat=1&id=1">第一篇</a></li>'+
					'<li><a href="/item?cat=1&id=2">第二篇</a></li>'+
					'<li><a href="/item?cat=1&id=3">第三篇</a></li>'+
					'<li><a href="/item?cat=1&id=4">第四篇</a></li>'+
					'<li><a href="/item?cat=1&id=5">第五篇</a></li>'+
					'<li><a href="/item?cat=1&id=6">第六篇</a></li>'+
					'<li><a href="/help">帮助</a></li>'+
				'</ul>'
			)
  	}else{
			next()
  	}
})
app.use(function(req,res,next){
	if(req.pathname == '/item' && req.query.cat == '1'){
		res.send(getNews(req.query.id))
	}else{
		next()
	}
})
app.use(function(req,res,next){
	if(req.pathname == '/help'){
		res.send('这里是帮助。')
	}else{
		next()
	}
})
app.use(function(req,res,next){
	res.send('<h1>页面找不到！</h1>')
})
var server = http.createServer(app)
server.listen(3000)
console.log('server running at post 3000')
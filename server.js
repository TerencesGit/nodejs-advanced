var http = require('http');
var parseUrl = require('url').parse;
var data = require('./models/data');

http.createServer(function(req, res){
	function send(html){
		res.writeHead(200, {
			'Content-Type': 'text/html;charset=utf-8'
		})
		res.end(html)
	}
	function getNews(id){
		return data[id] || '文章不存在!'
	}
	var info = parseUrl(req.url, true);
	console.log(info)
	if(info.pathname == '/'){
		send(
			'<ul>'+
				'<li><a href="/item?cat=1&id=1">第一篇</a></li>'+
				'<li><a href="/item?cat=1&id=2">第二篇</a></li>'+
				'<li><a href="/item?cat=1&id=3">第三篇</a></li>'+
				'<li><a href="/item?cat=1&id=4">第四篇</a></li>'+
				'<li><a href="/item?cat=1&id=5">第五篇</a></li>'+
				'<li><a href="/item?cat=1&id=6">第六篇</a></li>'+
			'</ul>'
		)
  }else if(info.pathname == '/item' && info.query.cat == '1'){
		send(getNews(info.query.id))
	}else{
		send('<h1>页面找不到！</h1>')
	}
	// console.log(req.method)
	// console.log(req.url)
	// console.log(req.headers)
}).listen(3000)
console.log('server running at post 3000')
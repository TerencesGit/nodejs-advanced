var http = require('http');
var parseUrl = require('url').parse;
var data = require('./models/data');
var express = require('express');
var app = express();

function getNews(id){
	return data[id] || '文章不存在!'
}
app.get('/',function(req,res,next){
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
})
app.get('/item', function(req,res,next){
	res.send(getNews(req.query.id))
})
app.get('/help',function(req,res){
	res.send('<h1>这里是帮助。</h1>')
})
var server = http.createServer(app)
server.listen(3000)
console.log('server running at post 3000')
var async = require('async');
function exec(){
	//series 串行无关联
	//parallel 并行无关联
	async.parallel({
		fun1: function(done){
			var i = 0;
			setInterval(function(){
				i++;
				console.log('function1执行'+i+'次')
				if(i == 3){
					clearInterval(this)
					done(null, 'fun1执行完毕')
				}
			},1000)	
		},
		fun2: function(done){
			var i = 0;
			setInterval(function(){
				i++;
				console.log('function2执行'+i+'次')
				if(i == 3){
					clearInterval(this)
					done(null, 'fun2执行完毕')
				}
			},1000)
		}
	},function(err, result){
		console.log(err)
		console.log(result)
	})
}
exec()
// waterfall 串行有关联(瀑布流模式)
function waterfallExec(){
	async.waterfall([
		function(done){
			var i = 0;
			setInterval(function(){
				i++;
				console.log('function1执行'+i+'次')
				if(i == 3){
					clearInterval(this)
					done(null, 'fun1执行完毕')
				}
			},1000)	
		},
		function(preValue,done){
			var i = 0;
			setInterval(function(){
				i++;
				console.log('function2执行'+i+'次')
				if(i == 3){
					clearInterval(this)
					done(null, preValue+',fun2执行完毕')
				}
			},1000)
		}
	],function(err, result){
		console.log(err)
		console.log(result)
	})
}
//waterfallExec()
console.log('主进程执行')
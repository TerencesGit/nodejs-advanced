var fs = require('fs');
module.exports = {
	readfile: function(path,recall){
		var data = fs.readFile(path, function(err, data){
			if(err){
				console.log(err)
				recall('文件不存在！')
			}else{
				recall(data)
			}
		})
	},
	readImg: function(path, res){
		fs.readFile(path, 'binary', function(err, filedata){
			if(err){
				console.log(err)
				recall('文件不存在！')
				return;
			}else{
				res.write(filedata,'binary')
				res.end()
			}
		})
	},
	readfileSync: function(path){
		var data = fs.readFileSync(path,'utf-8');
		return data;
	}
}
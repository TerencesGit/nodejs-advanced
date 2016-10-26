var fs = require('fs');
module.exports = {
	readfileSync: function(path){
		var data = fs.readFileSync(path,'utf-8');
		return data;
	},
	readfile: function(path,recall){
		var data = fs.readFile(path, function(err, data){
			if(err){
				console.log(err)
			}else{
				recall(data)
			}
		})
	}
}
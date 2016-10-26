var fs = require('fs');
module.exports = {
	writefile: function(path, data, recall){
		fs.writeFile(path, data, function(err){
			if(err){
				throw err;
			}else{
				recall('文件写入成功')
			}
		})
	},
	writefileSync: function(path, data){
		fs.writeFileSync(path, data);
		console.log('同步写入文件')
	}
}
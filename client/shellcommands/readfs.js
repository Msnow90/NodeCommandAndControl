const fs = require('fs');

module.exports = function(args, cb) {

	const dir = args[0].toString();
	
	fs.readdir(dir, (err, data) => {
		if (err) cb(err);
		else cb(data);
	})
}
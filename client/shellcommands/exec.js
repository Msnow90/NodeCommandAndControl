// *** Will run specified commands into the command line *** //

const { exec } = require('child_process');

module.exports = function(args, cb) {

	exec(args.join(' '), (err, stdout, stderr) => {

		if (err) return cb(err);
		if (stderr) return cb(stderr);
		return cb(stdout);
	})
}
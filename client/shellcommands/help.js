module.exports = function(args, cb) {

	const output = [
		'-h or help : Lists all commands',
		'-r *directory* or readfs *directory* : Lists all directory contents'
	]
	
	cb(output.join('\n'))
}
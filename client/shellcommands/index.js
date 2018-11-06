// Import all shell commands here


const help = require('./help');
const readfs = require('./readfs');
const exec = require('./exec');


module.exports = {
	help,
	'-h' : help,
	readfs,
	'-r': readfs,
	exec,
	'-e': exec
}
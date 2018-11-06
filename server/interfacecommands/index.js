const list = require('./list');
const help = require('./help');
const connect = require('./connect');
const logs = require('./logs');

module.exports = {
	help,
	'-h': help,
	list,
	'-l': list,
	connect,
	'-c': connect,
	logs,
	'-L': logs
}
const net = require("net");
//const shell = require("./shell");
const shellCommands = require('./shellcommands/index');

const client = net.createConnection({port: 8080, host: '127.0.0.1'}, () => {

	client.write('testingAuth');

	client.on('connect', data => {
	})

	client.on('data', data => {

		const string = data.toString();
		const cmd = string.split(" ")[0];
		const args = string.split(" ").slice(1);


		if (shellCommands[cmd]) shellCommands[cmd](args, cb)

		function cb(output) {
			client.write(output.toString());
		}

	})

	client.on('error', err => {
	}) 

	client.on('end', () => {
	})
})
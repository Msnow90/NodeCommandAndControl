const readline = require('readline');

const commands = require('./interfacecommands/index');
const connectedCommands = require('./connectedcommands/index');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: `Nodeshell $:`
})

rl.on('line', (cmds) => {

	const cmdArr = cmds.split(' ');
	const cmd = cmdArr[0];
	const args = cmdArr.slice(1);
	
	console.log('');
	
	if (global.connectTo !== "" && connectedCommands[cmd]) connectedCommands[cmd](args, rl);
	else if (commands[cmd]) commands[cmd]([...args], rl);

	else console.log('Command not found. Type -h or "help" (without quotes) to list available commands.')

	console.log('');

	rl.prompt();
	
})

rl.prompt();

module.exports = rl;

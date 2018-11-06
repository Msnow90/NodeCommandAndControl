const readline = require('readline');

const commands = require('./shellcommands/index');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: 'Nodeshell $:'
})

rl.on('line', (data) => {
	// if they type nothing just reprompt
	if (data === '') return rl.prompt();

	console.log('\n')

	// split input into words, this gives us commands separated from arguments
	const words = data.split(' ');
	const command = words[0]
	const args = words.slice(1);

	if (commands[command]) commands[command](args, cb);

	else {
		console.log('Invalid command...\n');
		rl.prompt();
	}

	function cb(output) {
		if (output) console.log(output);
		console.log('\n')
		rl.prompt();
	}
})

console.log('\n\n\n***********************************************\n')
console.log('      ********** Nodeshell 1.0 **********\n')
console.log('***********************************************\n')
console.log('Type "help" for commands...\n\n')

rl.prompt();

module.exports = rl;
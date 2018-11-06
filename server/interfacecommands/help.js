module.exports = function() {

	const allCommands = [
		'-h or help : lists all available commands',
		'-l or list : lists all ip addresses connected to the server',
		'-c <slot number> or connect <slot number> : connect to the designated ip address at the specified slot number',
		'-L *args* or logs *args*, Use -l for log history and -m for msg history : Shows log files'
	]

	console.log(allCommands.join('\n'));
}
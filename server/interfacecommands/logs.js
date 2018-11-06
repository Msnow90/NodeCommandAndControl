module.exports = function(args) {

	const arg = args[0];

	switch(arg) {
		case "-l":
			return global.logs.forEach(console.log);
		case "-m":
			return global.expiredMsgLogs.forEach(console.log);
		default:
			return console.log('Not valid log type.');
	}
}
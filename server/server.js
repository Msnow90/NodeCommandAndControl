const net = require('net');
const interface = require('./interface');
const fs = require('fs');



// *** Start of tracking for sockets, logs and error msgs *** // 


global.sockets = []; // holds all sockets, we will use to index who we are talking to

global.socketMsgCache = []; // this msgCache will be indexed in order of our socket connections first msg is auth msg if proper client

global.ipTable = []; // contains a list of ip addresses by socket indexes

global.logs = []; // keeps track of log files, accessed through our interface

global.expiredMsgLogs = []; // holds all msg logs from disconnected sockets



const authMsg = 'testingAuth'; // need to secure this more

const fileData = fs.createReadStream('./clienttest.exe');



const server = net.Server(socket => { // our server that catches initial client connections

	// *** Save the socket information *** // 
	console.log('A client has connected!')

	sockets.push(socket);

	const ipInfo = socket.localAddress.replace('::ffff:', '');

	ipTable.push({slotNumber: sockets.length, ip: ipInfo});




	// *** Collect data send from client and handle appropriately *** // 


	socket.on('data', data => {


		

		var sockIndex = sockets.indexOf(socket);// find proper slot by socket for messages



		if (!socketMsgCache[sockIndex]) socketMsgCache[sockIndex] = []; // create a message log for according socket



		socketMsgCache[sockIndex].push(data.toString()); // logs the "auth message". This is to verify client is a bot program for this server


		
		if (isSocketAuthorized(socketMsgCache[sockIndex][0])) { // if true continue with proper logic, else kick client


			if (data.toString() !== 'testingAuth') console.log(data.toString()); // hardcoded secret pass for now

			if (data.toString() === 'commence download')
			{
				console.log('uploading content...')
				fileData.pipe(socket);
			}

			const promptAdjustment = (global.connectTo) ? `Nodeshell @${global.connectTo.ip}:` : 'Nodeshell $:';
			interface.setPrompt(promptAdjustment);
			interface.prompt();
		}

		else {
			var err = 'Not authorized to communicate on this channel.'
			handleSocketEnd(err, socket);
		}
	})


	// *** Fired when client has disconnected *** //

	socket.on('end', () => {
		handleSocketEnd(null, socket);
	})



	// *** Fired when client has error *** // 

	socket.on('error', err => {
		handleSocketEnd(err, socket);
	})
})


server.listen(8080)


// our middleware to check if socket is authorized
function isSocketAuthorized(data) {
	return data === authMsg;
}


function handleErrorOrMessage(err, socket) {

	const i = sockets.indexOf(socket);
	const ip = ipTable[i].ip;

	logs.push(`IP: ${ip} @ ${new Date().getTime()} : ${err}`)
}


function handleSocketEnd(err, socket) {

	const i = sockets.indexOf(socket);

	const ip = ipTable[i].ip;

	logMessageHistory(ip, socketMsgCache[i]);

	handleErrorOrMessage(err || 'Socket has disconnected.', socket);

	sockets.splice(i, 1);
	socketMsgCache.splice(i, 1);
	ipTable.splice(i, 1);

	socket.destroy();
}

function logMessageHistory(ip, msgs) {
	expiredMsgLogs.push(`IP: ${ip} Logs: ${msgs}`)
}
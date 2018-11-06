//let interface = fork('interface.js');

let interface = exec('start cmd.exe /k "node interface.js"');

process.stdout.pipe(interface.stdin);

process.stdout.write('fuck you!!!')
// for (a in interface) {
// 	console.log(a);
// }

// console.log(interface.eventNames());
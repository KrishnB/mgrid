#!/bin/env node

var terminator = function(sig){
  if (typeof sig === "string") {
     console.log('%s: Received %s - terminating sample app ...',
                 Date(Date.now()), sig);
     process.exit(1);
  }
  console.log('%s: Node server stopped.', Date(Date.now()) );
};

process.on('exit', function() { terminator(); });
  // Removed 'SIGPIPE' from the list - bugz 852598.
  ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
   'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
  ].forEach(function(element, index, array) {
      process.on(element, function() { terminator(element); });
});

var http = require('http'),
    app = require('./app').app;

var ipaddress = process.env.OPENSHIFT_INTERNAL_IP || process.env.OPENSHIFT_NODEJS_IP;
var port = process.env.OPENSHIFT_INTERNAL_PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000;

var server = http.createServer(app);

models.Device.update({status: 'disconnected'});

GLOBAL.sio = require('socket.io').listen(server);
GLOBAL.scheduleInterval=null;
require('./socket')

if (typeof ipaddress === "undefined") {
	server.listen(port,function(){
	  console.log('Express server listening on port ' + port);
	});
}else{
	server.listen(port,ipaddress, function(){
	  console.log('Express server listening on port ' + port);
	});
}

setInterval(function(){
  request_for_scenario(sio.sockets.clients().length - 1);
}, 1000*60*60);

function request_for_scenario(index){
  if (index < 0){
    return;
  }
 sio.sockets.clients()[index].get("deviceId",function (err, value) {
    if(err == null && value){
      sio.sockets.clients()[index].emit('get_scenarios'); 
    }else{
      request_for_scenario(index-1);
    }
  });
}

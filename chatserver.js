var port = process.env.PORT || 8080;
var http = require('http'),
	url = require('url'),
	path = require('path'),
	fs = require('fs');

var server = http.createServer(function(req,res){
	if (req.url === '/'){
		req.url = 'index.html';
	}
	var x = url.parse(req.url, true);
	var fullpath = path.resolve(__dirname, '.' + x.pathname);
	
	if (fs.existsSync(fullpath)){
		var ext = path.extname(fullpath).toLowerCase();
		if (ext.match('html')){
			res.writeHead(200, {'Content-type':'type/html'});
			var strm = fs.createReadStream(fullpath);
			strm.pipe(res);
		} else if (ext.match(/\.(png|jpg|jpeg|gif|css|js|json)$/) && x.pathname != '/chatserver.js'){
			var strm = fs.createReadStream(fullpath);
			strm.pipe(res);
		} else {
			res.writeHead(404, {'Content-type': 'text/plain'});
			res.end('404 Not Found');
		}	
	} else {
		res.writeHead(404, {'Content-type': 'text/plain'});
		res.end('404 Not Found');
	}
}).listen(port);
/*
console.log('start server');

var io = require('socket.io').listen(server);

var hash = {};

io.sockets.on('connection',function(socket){
	
	socket.on('enter',function(name){
		var msg = name + '　さんが入室しました';
		hash[socket.id] = name;
		io.sockets.emit('toAll',{value: msg})
	})
	
	socket.on('toAll',function(data){
		io.sockets.emit('toAll',{value: data.value});
	})
	
	socket.on('exit',function(){
		var msg = hash[socket.id] + 'さんが退出しました';
		delete hash[socket.id];
		io.sockets.emit('publish',{value: msg});
	})
});
*/

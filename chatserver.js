var port = process.env.PORT || 8080,
	http = require('http'),
	url = require('url'),
	path = require('path'),
	fs = require('fs');

var server = http.createServer(function(req,res){
	if (req.url ==='/'){
		req.url = '/index.html';
	}
	var x = url.parse(req.url,true);
	var fullpath = path.resolve(__dirname,'.'+x.pathname);
	if (fs.existsSync(fullpath)){
		var ext = path.extname(fullpath).toLowerCase();
		if(ext.match('html')){
			res.writeHead(200,{'Content-type':'text/html'});
			var strm = fs.createReadStream(fullpath);
			strm.pipe(res);
		} else if (ext.match(/\.(png|jpg|jpeg|gif||css|js)$/) && x.pathname != 'chatserver.js'){
			var strm = fs.createReadStream(fullpath);
			strm.pipe(res);
		} else {
			res.writeHead(404,{'Content-type':'text/plain'});
			res.end('404 not found');
		}
	} else {
			res.writeHead(404,{'Content-type':'text/plain'});
			res.end('404 not found');		
	}
}).listen(port);
console.log('start server');

var io = require('socket.io').listen(server);

var hash = {};
var userArray = [];
var userIdArray = [];

io.sockets.on('connection',function(socket){
	
	socket.on('enter',function(data){
		var msg = data.value + 'さんが入室しました';
		hash[sockeat.id] = data.value;
		userArray.push(data.value);
		userIdArray.push(socket.id);
		io.sockets.emit('toAll',{value: msg, person: '　'});
		io.sockets.emit('enter',{value: data.value,userList: userArray,userId: userIdArray});
	})
	
	socket.on('toAll',function(data){
		if(data.value.length <= 210){
			io.sockets.emit('toAll',{value: data.value,person: data.person});
		}
	})
	
	socket.on('disconnect',function(){
		var msg = hash[socket.id] + 'さんが退出しました';
		io.sockets.emit('toAll', {value:msg,person:'　'});
		delete hash[socket.id];
		var searchNum = userIdArray.indexOf(socket.id);
		userIdArray.splice(searchNum, 1);
		userArray.splice(searchNum, 1);
		io.sockets.emit('disconnect',{userList: userArray,userId: userIdArray});
	})
	
});

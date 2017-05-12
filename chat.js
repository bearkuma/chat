window.onload = function(){
	var socketio = io.connect('http://localhost:8080');
	
	socketio.on('enter', function(name){});
	socketio.on('toAll', function(data){
			addMsg(data.value);
	});
	socketio.on('exit', function(){});	
	
	function toAllMsg(){
		var msgInput = document.getElementById('msgInput');
		var msg = myName + '　：　'　+ msgInput.value;
		socketio.emit('toAll', {value: msg});
		msgInput.value = '';
	}
	
	function addMsg(msg){
		var domNew = document.createElement('div');
		domNew.innerHTML = msg + '(' + new Date().toLocaleDateString() + ')';
		var contents = document.getElementById('contents');
		contents.prepend(domNew);
	}
	console.log(localStorage.getItem('chatter'));
	var myName = localStorage.getItem('chatter')
	start(myName);
	
	function start (name){
		socketio.emit('enter', name);
	}
	
	var send = document.getElementById('send');
		send.onclick = function(){
			toAllMsg();
		}
	
}

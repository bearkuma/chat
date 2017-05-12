window.onload = function(){
	var socketio = io.connect();
	
	socketio.on('enter', function(data){
		var domMemIn = document.createElement('div');
		domMemIn.innerHTML = data.value;
		var member = document.getElementById('member');
		member.prepend(domMemIn);
	});
	socketio.on('toAll', function(data){
			addMsg(data.value);
	});
	socketio.on('disconnect', function(){});	
	
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
	msgInput.onkeydown = function(e){
			if(msgInput.value != ''){
				if(e.key === 'Enter'){
					toAllMsg();
				}
			}
		}
	
}

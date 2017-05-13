window.onload = function(){
	var socketio = io.connect();
	function esc(s) {
  	return s.replace(/\&/g, "&amp;")
          	.replace(/</g, "&lt;")
          	.replace(/>/g, "&gt;")
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
	}
	socketio.on('enter', function(data){
		var userList = data.userList;
		var userId = data.userId;
		var member = document.getElementById('member');
		member.innerHTML = '';
		for(var i = 0; i < userList.length; i++){
			var domMemIn = document.createElement('div');
				domMemIn.innerHTML = esc(data.userList[i]);
				domMemIn.id = userId[i];
			member.prepend(domMemIn);
		}
		member.style.color = '#FF5';
	});
	socketio.on('toAll', function(data){
		addMsg(data.value);
	});
	socketio.on('disconnect', function(data){	
		var userList = data.userList;
		var userId = data.userId;
		var member = document.getElementById('member');
		member.innerHTML = '';
		for(var i = 0; i < userList.length; i++){
			var domMemOut = document.createElement('div');
				domMemOut.innerHTML = esc(data.userList[i]);
				domMemOut.id = userId[i];
			member.prepend(domMemOut);
		}
		member.style.color = '#FF5';
	});
	function toAllMsg(){
		var msgInput = document.getElementById('msgInput');
		var msg = myName + '　：　'　+ msgInput.value;
		socketio.emit('toAll', {value: msg});
		msgInput.value = '';
	}
	
	function addMsg(msg){
		var domNew = document.createElement('div');
		domNew.innerHTML = esc(msg);
		var contents = document.getElementById('contents');
		contents.prepend(domNew);
	}
	var myName = localStorage.getItem('chatter')
	start(myName);
	
	function start (name){
		socketio.emit('enter', name);
	}
	
	var send = document.getElementById('send');
		send.onclick = function(){
			if(msgInput.value != ''){
				toAllMsg();
			}
		}
	msgInput.onkeydown = function(e){
			if(msgInput.value != ''){
				if(e.key === 'Enter'){
					toAllMsg();
				}
			}
		}
	
}

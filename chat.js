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
			addMsg(data.person,data.value);
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
		var person = myName;
		var msg =msgInput.value;
		socketio.emit('toAll', {value: msg,person: person});
		msgInput.value = '';
	}
	
	function addMsg(per,msg){
		var domNew1 = document.createElement('div');
		domNew1.innerHTML = esc(per);
		domNew1.classList.add('domNew1');
		var domNew2 = document.createElement('div');
		domNew2.innerHTML = esc(msg);
		domNew2.classList.add('domNew2');
		var contents = document.getElementById('contents');
		contents.prepend(domNew2);
		contents.prepend(domNew1);
		if(esc(per) != '　'){
			domNew1.style.borderRight = '1px solid #000';
			domNew1.style.borderRadius = '100px';
		}
	}
	var myName = localStorage.getItem('chatter');
	start(myName);
	
	function start (name){
		socketio.emit('enter', {value :name});
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
					var now = 210 - msgInput.value.length;
					if(now >= 0){
						toAllMsg();
						textLength.textContent = '残り' + now + '文字';
					}
				}
			}
		}
		var now = 210 - msgInput.value.length;
		msgInput.onkeyup = function(e){
			var now = 210 - msgInput.value.length;
			if(now < 0){
				var nowSubstring = String(now).substring(1);
				textLength.classList.add('lengthOver');
				textLength.textContent = nowSubstring + '文字オーバー';
				send.disabled = true;
			} else {
				textLength.classList.remove('lengthOver');
				textLength.textContent = '残り' + now + '文字';
				send.disabled = false;
			}
		}
		
	var back = document.getElementById('back');
	
	back.onclick =function(){
		window.location.href = 'index.html';
	}
	
	var textLength = document.createElement('span');
	textLength.setAttribute('id','text-length');
	textLength.textContent = '残り210文字';
	var bottom = document.getElementById('bottom');
	bottom.append(textLength);	
}

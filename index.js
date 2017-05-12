window.onload = function(){
	var enter = document.getElementById('enter');

	enter.onclick = function(){
		var name = document.getElementById('name');
		if ( name.value === ''){
			var guestNum = Math.floor(Math.random()*10000);
			var guestName = 'ゲスト' + guestNum;
			localStorage.setItem('chatter',guestName);
		} else {
			localStorage.setItem('chatter',name.value);
		}
		window.location.href= "chat.html"		
	}
}

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
		if(name.value.length > 10){
			alert('名前は10文字以下にして下さい');
		} else {
		window.location.href= "chat.html"
		}
	}
}

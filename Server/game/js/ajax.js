//create XMLHttpRequest Object
var request = null;
request = creatRequestObj();
if (request == null){
	//無法取得XMLHttpRequest物件時發出警告
	alert("Error creating request object!");
}
function getSynchronize(){
	var ajax_data = new Object();
	ajax_data.RoomID = parent.VARIABLE.USER.RoomID;
	ajax_data.ActorID = parent.VARIABLE.USER.ActorID;
	var url = "../Server/game/php/getSynchronize.php?data="+JSON.stringify(ajax_data);
	request.open("GET", url, true);//開啟連線，選擇連線方式GET,POST
	/*global getSynchronize_res 實作於gameArea.html */
	request.onreadystatechange = getSynchronize_res//狀態完成時所要執行的函式
	request.send(null);//送出
}
function sendGameCommand(data){
	console.log(data);
	var url = "../Server/game/php/gameCommand.php?data="+data;
	request.open("GET", url, true);//開啟連線，選擇連線方式GET,POST
	request.send(null);//送出
}
function creatRequestObj(){
	var request = null;
	try {
		//IE7,or non-IE browser
		request = new XMLHttpRequest();
	} catch (trymicrosoft) {
		try {
		//IE browser
		request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (othermicrosoft) {
			try {
			//other IE browser
				request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (failed) {
				//not support
				request = null;
			}
		}
	}
	return request;
}

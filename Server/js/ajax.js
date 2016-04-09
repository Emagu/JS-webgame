//create XMLHttpRequest Object
var request = null;
request = creatRequestObj();
if (request == null){
	//無法取得XMLHttpRequest物件時發出警告
	alert("Error creating request object!");
}
function checkSave(){
	var url = "../Server/checkSave.php";
	request.open("GET", url, true);//開啟連線，選擇連線方式GET,POST
	/*global checkSave_res 實作於ajax_res.* */
	request.onreadystatechange = checkSave_res//狀態完成時所要執行的函式
	request.send(null);//送出
}
function register(data) {
	var url = "../Server/member/php/register.php?data="+data;
	request.open("GET", url, true);//開啟連線，選擇連線方式GET,POST
	/*global register_res 實作於ajax_res.* */
	request.onreadystatechange = register_res//狀態完成時所要執行的函式
	request.send(null);//送出
}
function login(data) {
	var url = "../Server/member/php/login.php?data="+data;
	request.open("GET", url, true);//開啟連線，選擇連線方式GET,POST
	/*global login_res 實作於ajax_res.* */
	request.onreadystatechange = login_res//狀態完成時所要執行的函式
	request.send(null);//送出
}
function checkActorConfig(name) {
	var url = "../Server/actor/php/checkActorConfig.php?name="+name;
	request.open("GET", url, true);//開啟連線，選擇連線方式GET,POST
	/*global NewActorView 宣告於index */
	request.onreadystatechange = NewActorView.CheckActorName//狀態完成時所要執行的函式
	request.send(null);//送出
}
function newActor(name,userID) {
	var url = "../Server/actor/php/newActor.php?name="+name+"&id="+userID;
	request.open("GET", url, true);//開啟連線，選擇連線方式GET,POST
	/*global newActor_res 實作於ajax_res.* */
	request.onreadystatechange = newActor_res//狀態完成時所要執行的函式
	request.send(null);//送出
}
function getActor(actorID) {
	var url = "../Server/actor/php/getActor.php?id="+actorID;
	request.open("GET", url, true);//開啟連線，選擇連線方式GET,POST
	/*global getActor_res 實作於ajax_res.* */
	request.onreadystatechange = getActor_res//狀態完成時所要執行的函式
	request.send(null);//送出
}
function checkRoomName(name) {
	var url = "../Server/room/php/checkRoomName.php?name="+name;
	request.open("GET", url, true);//開啟連線，選擇連線方式GET,POST
	/*global VARIABLE 宣告於index */
	request.onreadystatechange = VARIABLE.View.CreateRoom.checkRoomNameRes//狀態完成時所要執行的函式
	request.send(null);//送出
}
function createRoom(data) {
	var url = "../Server/room/php/createRoom.php?data="+data;
	request.open("GET", url, true);//開啟連線，選擇連線方式GET,POST
	/*global createRoom_res 實作於ajax_res */
	request.onreadystatechange = createRoom_res//狀態完成時所要執行的函式
	request.send(null);//送出
}
function getRoomList(){
	var url = "../Server/room/php/getRoomList.php";
	request.open("GET", url, true);//開啟連線，選擇連線方式GET,POST
	/*global getRoomList_res 實作於ajax_res */
	request.onreadystatechange = getRoomList_res//狀態完成時所要執行的函式
	request.send(null);//送出
}
function getRoomData(roomID,actorID){
    var url = "../Server/room/php/getRoomData.php?roomID="+roomID+"&actorID="+actorID;
	request.open("GET", url, true);//開啟連線，選擇連線方式GET,POST
	/*global getRoomData_res 實作於ajax_res */
	request.onreadystatechange = getRoomData_res//狀態完成時所要執行的函式
	request.send(null);//送出
}
function addRoom(data){
	var url = "../Server/room/php/addRoom.php?data="+data;
	request.open("GET", url, true);//開啟連線，選擇連線方式GET,POST
	/*global addRoom_res 實作於ajax_res */
	request.onreadystatechange = addRoom_res//狀態完成時所要執行的函式
	request.send(null);//送出
}
function quitRoom(data){
	var url = "../Server/room/php/quitRoom.php?data="+data;
	request.open("GET", url, true);//開啟連線，選擇連線方式GET,POST
	/*global quitRoom_res 實作於ajax_res */
	request.onreadystatechange = quitRoom_res//狀態完成時所要執行的函式
	request.send(null);//送出
}
function sendGameCommand(data){
	console.log(data);
	var url = "../Server/game/php/gameCommand.php?data="+data;
	request.open("GET", url, true);//開啟連線，選擇連線方式GET,POST
	request.send(null);//送出
}
function getSynchronize(){
	var url = "../Server/game/php/getSynchronize.php";
	request.open("GET", url, true);//開啟連線，選擇連線方式GET,POST
	/*global Synchronize_res 實作於gameArea.html */
	request.onreadystatechange = Synchronize_res//狀態完成時所要執行的函式
	request.send(null);//送出
}
function gameStart_command(roomID){
	var url = "../Server/room/php/gameStart.php?roomID="+roomID;
	/*global gameStart_command_res 實作於ajax_res */
	request.onreadystatechange = gameStart_command_res//狀態完成時所要執行的函式
	request.open("GET", url, true);//開啟連線，選擇連線方式GET,POST
	request.send(null);//送出
}
function gameStart(roomID){
	var url = "../Server/game/php/gameStart.php?roomID="+roomID;
	request.open("GET", url, true);//開啟連線，選擇連線方式GET,POST
	/*global gameStart_res 實作於ajax_res */
	request.onreadystatechange = gameStart_res//狀態完成時所要執行的函式
	request.send(null);//送出
}
function RoomStatus(ActorID,Status){
	var url = "../Server/room/php/RoomStatus.php?ActorID="+ActorID+"&Status="+Status;
	/*global RoomStatus_res 實作於ajax_res */
	request.onreadystatechange = RoomStatus_res//狀態完成時所要執行的函式
	request.open("GET", url, true);//開啟連線，選擇連線方式GET,POST
	request.send(null);//送出
}
function changePos_Room(data){
	var url = "../Server/room/php/changePostion.php?data="+data;
	/*global changePos_Room_res 實作於ajax_res */
	request.onreadystatechange = changePos_Room_res//狀態完成時所要執行的函式
	request.open("GET", url, true);//開啟連線，選擇連線方式GET,POST
	request.send(null);//送出
}
function changeType_Room(data){
	var url = "../Server/room/php/changeType.php?data="+data;
	/*global changeType_Room_res 實作於ajax_res */
	request.onreadystatechange = changeType_Room_res//狀態完成時所要執行的函式
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

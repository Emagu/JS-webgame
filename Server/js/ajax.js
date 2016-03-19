//create XMLHttpRequest Object
var request = null;
request = creatRequestObj();
if (request == null){
	//無法取得XMLHttpRequest物件時發出警告
	alert("Error creating request object!");
}
function register(data) {
	var url = "../Server/member/php/register.php?name="+data.Name+"&mail="+data.Mail+"&pw="+data.PW+"&pw2="+data.PW2;
	request.open("GET", url, true);//開啟連線，選擇連線方式GET,POST
	/*global registerMember 實作於Client/lib/ajax_res.* */
	request.onreadystatechange = registerMember//狀態完成時所要執行的函式
	request.send(null);//送出
}
function login(data) {
	var url = "../Server/member/php/login.php?name="+data.Name+"&pw="+data.PW;
	request.open("GET", url, true);//開啟連線，選擇連線方式GET,POST
	/*global loginMember 實作於Client/lib/ajax_res.* */
	request.onreadystatechange = loginMember//狀態完成時所要執行的函式
	request.send(null);//送出
}
function checkActorConfig(name) {
	var url = "../Server/actor/php/checkActorConfig.php?name="+name;
	request.open("GET", url, true);//開啟連線，選擇連線方式GET,POST
	/*global NewActorView.CheckActorName 實作於Client/src/View/NewActor */
	request.onreadystatechange = NewActorView.CheckActorName//狀態完成時所要執行的函式
	request.send(null);//送出
}
function newActor(name,userID) {
	var url = "../Server/actor/php/newActor.php?name="+name+"&id="+userID;
	request.open("GET", url, true);//開啟連線，選擇連線方式GET,POST
	/*global NewActorRequest 實作於Client/lib/ajax_res.* */
	request.onreadystatechange = NewActorRequest//狀態完成時所要執行的函式
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
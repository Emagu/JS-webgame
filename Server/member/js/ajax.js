//create XMLHttpRequest Object
var request = null;
request = creatRequestObj();
if (request == null){
	//無法取得XMLHttpRequest物件時發出警告
	alert("Error creating request object!");
}
function register(name,mail,password,password2) {
	var url = "../php/login.php?name="+name+"&mail="+mail+"&pw="+password+"&pw2="+password2;
	request.open("GET", url, true);//開啟連線，選擇連線方式GET,POST
	/*global registerMember 實作於Client/index*/
	request.onreadystatechange = registerMember//狀態完成時所要執行的函式
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
function RegisterView(windowSize){
    
    //宣告變數
    //載體
    this.self = document.createElement("div");
    this.self.style.height = "600px";
    this.self.style.width = "800px";
    this.self.style.backgroundImage = "url('src/pic/registerpageimg/registerimg.png')";
    this.self.style.position = "absolute";
    
    var name = document.createElement("input");
	name.setAttribute("type", "text");
	name.style.backgroundColor = "transparent";
	name.style.color = "#FFFFFF";
	name.style.fontSize = "x-large";
	name.style.position = "absolute";
	name.style.top = "175";
	name.style.border = "0px";
	name.style.width = "330";
	name.style.height ="50";
	name.style.left = "330";
	
	var pwtxt = document.createElement("P");
	pwtxt.style.position = "absolute";
	pwtxt.style.top = "26%";
	pwtxt.style.width = "20%";
	pwtxt.style.left = "1%";
	pwtxt.appendChild(document.createTextNode("密碼:"));
	
	var pw = document.createElement("input");
	pw.setAttribute("type", "password");
	pw.style.position = "absolute";
	pw.style.color = "#FFFFFF";
	pw.style.backgroundColor = "transparent";
	pw.style.border = "0px";
	pw.style.fontSize = "x-large";
	pw.style.top = "245";
	pw.style.width = "330";
	pw.style.height =50;
	pw.style.left = 330;
	
	var pwtxt2 = document.createElement("P");
	pwtxt2.style.position = "absolute";
	pwtxt2.style.top = "39%";
	pwtxt2.style.width = "20%";
	
	pwtxt2.style.left = "1%";
	pwtxt2.appendChild(document.createTextNode("再次輸入密碼:"));
	
	var pw2 = document.createElement("input");
	pw2.setAttribute("type", "password");
	pw2.style.position = "absolute";
	pw2.style.color = "#FFFFFF";
	pw2.style.backgroundColor = "transparent";
	pw2.style.fontSize = "x-large";
	pw2.style.border = "0px";
	pw2.style.top = "315";
	pw2.style.width = "330";
	pw2.style.height=50;
	pw2.style.left = "330";
	
	var mailtxt = document.createElement("P");
	mailtxt.style.position = "absolute";
	mailtxt.style.top = "52%";
	mailtxt.style.width = "20%";
	mailtxt.style.left = "1%";
	mailtxt.appendChild(document.createTextNode("E-mail:"));
	
	var mail = document.createElement("input");
	mail.setAttribute("type", "email");
	mail.style.position = "absolute";
	mail.style.backgroundColor = "transparent";
	mail.style.border = "0px";
	mail.style.color = "#FFFFFF";
	mail.style.fontSize = "x-large";
	mail.style.top = "385";
	mail.style.width = "330";
	mail.style.height=50;
	mail.style.left = "330";
	
	var login = document.createElement("P");
	login.style.position = "absolute";
	login.style.top = "475";
	login.style.width = "250";
	login.style.left = "125";
	login.style.cursor = "pointer";
	login.appendChild(document.createTextNode("　"));
	//login.appendChild(document.createTextNode("前往登入!"));
	login.addEventListener("click",function(){
		/*global loginViewiInit 實作於 index*/
		loginViewiInit();
	});
	
	var commit = document.createElement("P");
	commit.style.position = "absolute";
	commit.style.top = "470";
	commit.style.width = "250";
	commit.style.left = "420";
	commit.style.cursor = "pointer";
	commit.appendChild(document.createTextNode("　"));
	//commit.appendChild(document.createTextNode("資料送出!"));
	commit.addEventListener("click",function(){		
		var data = new Object();
	   	data.Name = name.value;
	   	data.PW = pw.value;
	   	data.PW2 = pw2.value;
	   	data.Mail = mail.value;
	   	VARIABLE.Socket.emit("register",data);/*global VARIABLE in index*/
	});
	
	this.self.appendChild(pw);
	this.self.appendChild(pw2);
	this.self.appendChild(mail);
	this.self.appendChild(login);
	this.self.appendChild(name);
	this.self.appendChild(commit);
	//變數宣告完畢

	//宣告函式
    this.windowReSize = function(windowSize){//當視窗調整 調整版面
        this.self.style.left = (windowSize.W/ 2 - 400) + "px";
        this.self.style.top = (windowSize.H /2- 300) + "px";
    };
    //函式宣告完畢
    
    //初始化函式執行
    this.windowReSize(windowSize);
    //執行初始化函式完畢
}

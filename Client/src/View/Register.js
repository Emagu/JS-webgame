function RegisterView(windowSize){
    
    //宣告變數
    //載體
    this.self = document.createElement("div");
    this.self.style.height = windowSize.H * 0.2 + "px";
    this.self.style.backgroundColor = "#00FFFF";
    this.self.style.position = "absolute";
    this.self.style.textAlign = 'center';
    //輸入端口
	this.self.appendChild(document.createTextNode("----註冊----"));//標題
	//標籤
	var nametxt = document.createElement("P");
	nametxt.style.position = "absolute";
	nametxt.style.top = "13%";
	nametxt.style.width = "20%";
	nametxt.style.left = "1%";
	nametxt.appendChild(document.createTextNode("帳號:"));

	var name = document.createElement("input");
	name.setAttribute("type", "text");
	name.style.position = "absolute";
	name.style.top = "21%";
	name.style.width = "60%";
	name.style.left = "26%";
	
	var pwtxt = document.createElement("P");
	pwtxt.style.position = "absolute";
	pwtxt.style.top = "26%";
	pwtxt.style.width = "20%";
	pwtxt.style.left = "1%";
	pwtxt.appendChild(document.createTextNode("密碼:"));
	
	var pw = document.createElement("input");
	pw.setAttribute("type", "password");
	pw.style.position = "absolute";
	pw.style.top = "34%";
	pw.style.width = "60%";
	pw.style.left = "26%";
	
	var pwtxt2 = document.createElement("P");
	pwtxt2.style.position = "absolute";
	pwtxt2.style.top = "39%";
	pwtxt2.style.width = "20%";
	pwtxt2.style.left = "1%";
	pwtxt2.appendChild(document.createTextNode("再次輸入密碼:"));
	
	var pw2 = document.createElement("input");
	pw2.setAttribute("type", "password");
	pw2.style.position = "absolute";
	pw2.style.top = "47%";
	pw2.style.width = "60%";
	pw2.style.left = "26%";
	
	var mailtxt = document.createElement("P");
	mailtxt.style.position = "absolute";
	mailtxt.style.top = "52%";
	mailtxt.style.width = "20%";
	mailtxt.style.left = "1%";
	mailtxt.appendChild(document.createTextNode("E-mail:"));
	
	var mail = document.createElement("input");
	mail.setAttribute("type", "email");
	mail.style.position = "absolute";
	mail.style.top = "60%";
	mail.style.width = "60%";
	mail.style.left = "26%";
	
	var login = document.createElement("P");
	login.style.position = "absolute";
	login.style.top = "70%";
	login.style.width = "50%";
	login.style.left = "0%";
	login.style.cursor = "pointer";
	login.appendChild(document.createTextNode("前往登入!"));
	login.addEventListener("click",function(){
		/*global loginViewiInit 實作於 index*/
		loginViewiInit();
	});
	
	var commit = document.createElement("P");
	commit.style.position = "absolute";
	commit.style.top = "70%";
	commit.style.width = "50%";
	commit.style.left = "50%";
	commit.style.cursor = "pointer";
	commit.appendChild(document.createTextNode("資料送出!"));
	commit.addEventListener("click",function(){		
		var data = new Object();
	   	data.Name = name.value;
	   	data.PW = pw.value;
	   	data.PW2 = pw2.value;
	   	data.Mail = mail.value;
		register(JSON.stringify(data));/*global register 實作於 ajax.js*/
	});
	
	this.self.appendChild(pwtxt);
	this.self.appendChild(pw);
	this.self.appendChild(pwtxt2);
	this.self.appendChild(pw2);
	this.self.appendChild(mailtxt);
	this.self.appendChild(mail);
	this.self.appendChild(login);
	this.self.appendChild(name);
	this.self.appendChild(nametxt);
	this.self.appendChild(commit);
	//變數宣告完畢

	//宣告函式
    this.windowReSize = function(windowSize){//當視窗調整 調整版面
        this.self.style.width = windowSize.W * 0.6 + "px";
        //this.self.style.height = windowSize.H * 0.8 + "px";
        this.self.style.left = (windowSize.W / 2 - windowSize.W * 0.6 / 2) + "px";
        this.self.style.top = (windowSize.H / 2 - windowSize.H * 0.8 / 2) + "px";
    };
    //函式宣告完畢
    
    //初始化函式執行
    this.windowReSize(windowSize);
    //執行初始化函式完畢
}

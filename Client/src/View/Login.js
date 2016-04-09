function LoginView(windowSize){
    //宣告變數
    //載體
    this.self = document.createElement("div");
    //this.self.style.height = windowSize.H * 0.2 + "px";
    this.self.style.height ="600";
    this.self.style.width ="800";
    this.self.style.backgroundColor = "#000000";
    var loginimg = document.createElement("img");
	loginimg.setAttribute("src","/Client/src/pic/loginpageimg/loginimg.png");
    loginimg.setAttribute("width", "100%");
    loginimg.setAttribute("height", "100%");
    this.self.appendChild(loginimg);
    this.self.style.position = "absolute";
    this.self.style.textAlign = 'center';
    //輸入端口
	this.self.appendChild(document.createTextNode("----登入----"));//標題
	//標籤
	/*
	var usertxt = document.createElement("p");
	usertxt.style.position = "absolute";
	usertxt.style.top = "15%";
	usertxt.style.width = "20%";
	usertxt.style.left = "2%";
	usertxt.appendChild(document.createTextNode("帳號:"));
	*/
	var user = document.createElement("input");
	user.setAttribute("type", "text");
	//user.size = "12";
	console.log(user.size);
	user.style.fontSize = "x-large"; //http://www.w3schools.com/jsref/prop_style_fontsize.asp
	user.style.color = "#FFFFFF";
	user.style.backgroundColor = "transparent";
	user.style.border = "0px";
	user.style.position = "absolute";
	user.style.top = "225";
	user.style.width = "360";
	user.style.height="50";
	user.style.left = "330";
	/*
	var pwtxt = document.createElement("p");
	pwtxt.style.position = "absolute";
	pwtxt.style.top = "30%";
	pwtxt.style.width = "20%";
	pwtxt.style.left = "2%";
	//pwtxt.appendChild(document.createTextNode("密碼:"));
	*/
	var pw = document.createElement("input");
	//pw.size = "12";
	pw.setAttribute("type", "password");
	pw.style.backgroundColor = "transparent";
	pw.style.fontSize = "x-large";
	pw.style.color = "#FFFFFF";
	pw.style.border = "0px";
	pw.style.position = "absolute";
	pw.style.top = "300";
	pw.style.width = "360";
	pw.style.height="50";
	pw.style.left = "330";


	this.forgetPW = document.createElement("p");
	this.forgetPW.style.position = "absolute";
	this.forgetPW.style.width = "250";
	this.forgetPW.style.height="55";
	this.forgetPW.style.top = "390";
	this.forgetPW.style.left = "125";
	this.forgetPW.style.cursor = "pointer";
	this.forgetPW.appendChild(document.createTextNode("　"));
	//this.forgetPW.appendChild(document.createTextNode("註冊帳號"));
	
	var Reg = document.createElement("p");
	Reg.style.position = "absolute";
	Reg.style.top = "390";
	Reg.style.width = "250";
	Reg.style.height = "55";
	Reg.style.left = "115";
	Reg.style.cursor = "pointer";
	Reg.appendChild(document.createTextNode("　"));
	//Reg.appendChild(document.createTextNode("忘記密碼"));
	Reg.addEventListener("click",function(){
	   	/*global registerViewInit 實作於 index */
		registerViewInit();
	});
	        
	var commit = document.createElement("p");
	commit.style.position = "absolute";
	commit.style.top = "475";
	commit.style.width = "585";
	commit.style.height= "60" ;
	commit.style.left = "140";
	commit.style.cursor = "pointer";
	commit.appendChild(document.createTextNode("　"));
	//commit.appendChild(document.createTextNode("登入"));
	commit.addEventListener("click",function(){
      	var data = new Object();
    	data.Name = user.value;
		data.PW = pw.value;
		/*global ViewInit,VARIABLE in index.html*/
		ViewInit(VARIABLE.View.Block.self);
		login(JSON.stringify(data));	/*global login 實作於 ajax.js*/
	});
	
	//this.self.appendChild(usertxt);
	this.self.appendChild(user);
	//this.self.appendChild(pwtxt);
	this.self.appendChild(pw);
	this.self.appendChild(this.forgetPW);
    this.self.appendChild(commit);
    this.self.appendChild(Reg);
    //變數宣告完畢
    
    //宣告函式
    this.windowReSize = function(windowSize){//當視窗調整 調整版面
        //this.self.style.width = windowSize.W * 0.3 + "px";
        //this.self.style.height = windowSize.H * 0.8 + "px";
        //this.self.style.left = (windowSize.W / 2 - windowSize.W * 0.3 / 2) + "px";
        this.self.style.top = (windowSize.H / 2 - 300) + "px";
        this.self.style.left = (windowSize.W / 2 - 400) + "px";
        //this.self.style.top = (windowSize.H / 2 - windowSize.H * 0.8 / 2) + "px";
    }
    //函式宣告完畢
    
    //初始化函式執行
    this.windowReSize(windowSize);
    //執行初始化函式完畢
}
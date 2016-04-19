function LoginView(windowSize){
    //宣告變數
    //載體
    this.self = document.createElement("div");
    this.self.style.height ="600px";
    this.self.style.width ="800px";
    this.self.style.backgroundImage = "url('src/pic/loginpageimg/loginimg.png')";
    this.self.style.position = "absolute";
    //輸入端口
	//標籤
	var user = document.createElement("input");
	user.setAttribute("type", "text");
	user.style.fontSize = "x-large"; //http://www.w3schools.com/jsref/prop_style_fontsize.asp
	user.style.color = "#FFFFFF";
	user.style.backgroundColor = "transparent";
	user.style.border = "0px";
	user.style.position = "absolute";
	user.style.top = "225px";
	user.style.width = "360px";
	user.style.height="50px";
	user.style.left = "330px";
	
	var pw = document.createElement("input");
	pw.setAttribute("type", "password");
	pw.style.backgroundColor = "transparent";
	pw.style.fontSize = "x-large";
	pw.style.color = "#FFFFFF";
	pw.style.border = "0px";
	pw.style.position = "absolute";
	pw.style.top = "300px";
	pw.style.width = "360px";
	pw.style.height="50px";
	pw.style.left = "330px";

	this.forgetPW = document.createElement("p");
	this.forgetPW.style.position = "absolute";
	this.forgetPW.style.width = "250";
	this.forgetPW.style.height="55";
	this.forgetPW.style.top = "390";
	this.forgetPW.style.left = "125";
	this.forgetPW.style.cursor = "pointer";
	
	var Reg = document.createElement("p");
	Reg.style.position = "absolute";
	Reg.style.top = "390px";
	Reg.style.width = "250px";
	Reg.style.height = "55px";
	Reg.style.left = "115px";
	Reg.style.cursor = "pointer";
	Reg.addEventListener("click",function(){
	   	/*global registerViewInit 實作於 index */
		registerViewInit();
	});
	        
	var commit = document.createElement("p");
	commit.style.position = "absolute";
	commit.style.top = "475px";
	commit.style.width = "585px";
	commit.style.height= "60px";
	commit.style.left = "140px";
	commit.style.cursor = "pointer";
	commit.addEventListener("click",function(){
      	var data = new Object();
    	data.Name = user.value;
		data.PW = pw.value;
		/*global ViewInit,VARIABLE in index.html*/
		ViewInit(VARIABLE.View.Block.self);
		login(JSON.stringify(data));	/*global login 實作於 ajax.js*/
	});
	
	this.self.appendChild(user);
	this.self.appendChild(pw);
	this.self.appendChild(this.forgetPW);
    this.self.appendChild(commit);
    this.self.appendChild(Reg);
    //變數宣告完畢
    
    //宣告函式
    this.windowReSize = function(windowSize){//當視窗調整 調整版面
        this.self.style.top = (windowSize.H / 2 - 300) + "px";
        this.self.style.left = (windowSize.W / 2 - 400) + "px";
    }
    //函式宣告完畢
    
    //初始化函式執行
    this.windowReSize(windowSize);
    //執行初始化函式完畢
}
//右邊工具列
function LoginView(){
    var windowSize = new Object();
    windowSize.W = Option.windowSize.W;
    windowSize.H = Option.windowSize.H;
    
    //載體
    this.self = document.createElement("div");
    this.self.style.width = windowSize.W * 0.3 + "px";
    this.self.style.height = windowSize.H * 0.2 + "px";
    this.self.style.backgroundColor = "#00FFFF";
    this.self.style.position = "absolute";
    
    this.self.style.left = (windowSize.W / 2 - windowSize.W * 0.3 / 2) + "px";
    this.self.style.top = (windowSize.H / 2 - windowSize.H * 0.8 / 2) + "px";
    this.self.style.textAlign = 'center';
    //輸入端口
	this.self.appendChild(document.createTextNode("----登入----"));//標題
	    //標籤
	        var usertxt = document.createElement("P");
	        usertxt.style.position = "absolute";
	        usertxt.style.top = "15%";
	        usertxt.style.width = "20%";
	        usertxt.style.left = "2%";
	        usertxt.appendChild(document.createTextNode("帳號:"));
	        this.self.appendChild(usertxt);
	        
	        var user = document.createElement("input");
	        user.setAttribute("type", "text");
	        user.style.position = "absolute";
	        user.style.top = "23%";
	        user.style.width = "60%";
	        user.style.left = "22%";
	        this.self.appendChild(user);
	        
	        var pwtxt = document.createElement("P");
	        pwtxt.style.position = "absolute";
	        pwtxt.style.top = "30%";
	        pwtxt.style.width = "20%";
	        pwtxt.style.left = "2%";
	        pwtxt.appendChild(document.createTextNode("密碼:"));
	        this.self.appendChild(pwtxt);
	        
	        var pw = document.createElement("input");
	        pw.setAttribute("type", "password");
	        pw.style.position = "absolute";
	        pw.style.top = "38%";
	        pw.style.width = "60%";
	        pw.style.left = "22%";
	        this.self.appendChild(pw);
	        
	        this.forgetPW = document.createElement("P");
	        this.forgetPW.style.position = "absolute";
	        this.forgetPW.style.width = "50%";
	        this.forgetPW.style.top = "50%";
	        this.forgetPW.style.left = "0%";
	        this.forgetPW.style.cursor = "pointer";
	        this.forgetPW.appendChild(document.createTextNode("忘記密碼?"));
	        this.self.appendChild(this.forgetPW);
	        
	        var Reg = document.createElement("P");
	        Reg.style.position = "absolute";
	        Reg.style.top = "50%";
	        Reg.style.width = "50%";
	        Reg.style.left = "50%";
	        Reg.style.cursor = "pointer";
	        Reg.appendChild(document.createTextNode("立即註冊!"));
	        this.self.appendChild(Reg);
	        
	        var commit = document.createElement("P");
	        commit.style.position = "absolute";
	       	commit.style.top = "70%";
	        commit.style.width = "100%";
	        commit.style.left = "0%";
	       	commit.style.cursor = "pointer";
	        commit.appendChild(document.createTextNode("登入!"));
	        this.self.appendChild(commit);
	 
    commit.addEventListener("click",function(){
       	/*global login 實作於 ajax.js*/
       	var data = new Object();
    	data.Name = user.value;
    	data.PW = pw.value;
		login(JSON.stringify(data));
    });
    
    Reg.addEventListener("click",function(){
    	/*global registerViewInit 實作於 index */
		registerViewInit();
    });
}
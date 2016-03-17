//右邊工具列
function LoginView(windowSize){
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
	        var logintxt = document.createElement("P");
	        logintxt.style.position = "absolute";
	        logintxt.style.top = "15%";
	        logintxt.style.width = "20%";
	        logintxt.style.left = "2%";
	        logintxt.appendChild(document.createTextNode("帳號:"));
	        this.self.appendChild(logintxt);
	        
	        var login = document.createElement("input");
	        login.setAttribute("type", "text");
	        login.style.position = "absolute";
	        login.style.top = "23%";
	        login.style.width = "60%";
	        login.style.left = "22%";
	        this.self.appendChild(login);
	        
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
	        
	        this.Reg = document.createElement("P");
	        this.Reg.style.position = "absolute";
	        this.Reg.style.top = "50%";
	        this.Reg.style.width = "50%";
	        this.Reg.style.left = "50%";
	        this.Reg.style.cursor = "pointer";
	        this.Reg.appendChild(document.createTextNode("立即註冊!"));
	        this.self.appendChild(this.Reg);
	        
	        this.commit = document.createElement("P");
	        this.commit.style.position = "absolute";
	        this.commit.style.top = "70%";
	        this.commit.style.width = "100%";
	        this.commit.style.left = "0%";
	        this.commit.style.cursor = "pointer";
	        this.commit.appendChild(document.createTextNode("登入!"));
	        this.self.appendChild(this.commit);
	        
	    
    this.windowReSize = function(windowSize){//當視窗調整 調整版面
        console.log(this.self);
        this.self.style.width = windowSize.W * 0.3 + "px";
        //this.self.style.height = windowSize.H * 0.8 + "px";
        this.self.style.left = (windowSize.W / 2 - windowSize.W * 0.3 / 2) + "px";
        this.self.style.top = (windowSize.H / 2 - windowSize.H * 0.8 / 2) + "px";
        console.log(this.self);
    }
}
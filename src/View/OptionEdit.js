function OptionEditView(windowSize,Option){
    /*global OriginView */
    OriginView.call(this,windowSize,Option.getWindowSize());//繼承 
    
    //宣告變數
    var edited = false;
    var Resolution_Origin = Option.getWindowSet();
    
    this.self.style.backgroundColor = "#FFFFFF";
    this.self.style.textAlign = "center";
    
    var title = document.createElement("H1");
    title.style.width = "100%";
    title.style.height = "10%";
    title.style.backgroundColor = "#00AAAA";
    title.style.left = "0px";
    title.style.top = "0px";
    title.appendChild(document.createTextNode("遊戲設定"));
    
    var ResolutionLabel = document.createElement("P");
    ResolutionLabel.style.position = "absolute";
	ResolutionLabel.style.width = "60%";
	ResolutionLabel.style.top = "25%";
	ResolutionLabel.style.left = "20%";
	ResolutionLabel.appendChild(document.createTextNode("解析度"));
	
	var ResolutionMsg = document.createTextNode(Option.getWindowSize().W + " X " +Option.getWindowSize().H);
	
	var ResolutionDiv = document.createElement("div");
	ResolutionDiv.style.width = "300px";
    ResolutionDiv.style.height = "100px";
    ResolutionDiv.style.left = "50%";
    ResolutionDiv.style.top = "33%";
    ResolutionDiv.style.marginLeft = "-150px";
    ResolutionDiv.style.position = "absolute";
    
    var ResolutionAdd = document.createElement("input");
    ResolutionAdd.style.width = "30px";
    ResolutionAdd.setAttribute("type", "image");
    ResolutionAdd.setAttribute("src", "./src/pic/UI/Button/Triangle_R_R.png");
    ResolutionAdd.addEventListener("click",function(){
       Option.WindowSizeAdd(1);
       update_Resolution();
    });
	
	var ResolutionSub = document.createElement("input");
	ResolutionSub.style.width = "30px";
	ResolutionSub.setAttribute("type", "image");
    ResolutionSub.setAttribute("src", "./src/pic/UI/Button/Triangle_L_R.png");
    ResolutionSub.addEventListener("click",function(){
       Option.WindowSizeSub(1);
       update_Resolution();
    });
	
	ResolutionDiv.appendChild(ResolutionSub);
	ResolutionDiv.appendChild(ResolutionMsg);
	ResolutionDiv.appendChild(ResolutionAdd);
	
	var commit = document.createElement("P");
	commit.style.position = "absolute";
	commit.style.top = "90%";
    commit.style.width = "50%";
    commit.style.left = "0%";
    commit.style.cursor = "pointer";
    commit.style.textAlign = "center";
    commit.appendChild(document.createTextNode("儲存!"));
    commit.addEventListener("click",function() {
		/*global onWindowReSize,HallViewInit,ViewInit,VARIABLE in index*/
		onWindowReSize();
		ViewInit(VARIABLE.View.Block.self);
	    HallViewInit();
	});
	
	var cancel = document.createElement("p");
	cancel.style.position = "absolute";
	cancel.style.top = "90%";
	cancel.style.width = "50%";
	cancel.style.left = "50%";
	cancel.style.cursor = "pointer";
	cancel.appendChild(document.createTextNode("返回"));
	cancel.addEventListener("click",function(){		
	    //還原
	    Option.setWindowSize(Resolution_Origin);
		/*global HallViewInit,ViewInit,VARIABLE in index*/
		ViewInit(VARIABLE.View.Block.self);
	    HallViewInit();
	});
    
    this.self.appendChild(title);
    this.self.appendChild(ResolutionLabel);
    this.self.appendChild(ResolutionDiv);
    this.self.appendChild(commit);
    this.self.appendChild(cancel);
    
    
	//變數宣告完畢
	
	//宣告函式
	function update_Resolution(){
	    ResolutionDiv.removeChild(ResolutionDiv.childNodes[1]);
	    var ResolutionMsg = document.createTextNode(Option.getWindowSize().W + " X " +Option.getWindowSize().H);
	    ResolutionDiv.insertBefore(ResolutionMsg,ResolutionDiv.childNodes[1]);
	    if(!edited) {
	        
	    }
	    edited = true;
	    
	}
    //函式宣告完畢
    
    //初始化函式執行
    //執行初始化函式完畢
}

